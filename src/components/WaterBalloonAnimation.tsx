// WaterBalloonAnimation.tsx
import React, { useEffect, useRef, useState } from "react";

type Props = {
  triggerId?: string | number | null;
  active?: boolean;
  attackerSide: "left" | "right";
  damageText?: string;
  hit?: boolean;
  onDone?: () => void;
  durationMs?: number;
  leftHp?: number;
  rightHp?: number;
  maxHp?: number;
};

export default function WaterBalloonAnimation({
  triggerId = null,
  active = false,
  attackerSide,
  damageText = "-10",
  hit = true,
  onDone,
  durationMs = 1200,
  leftHp = 100,
  rightHp = 100,
  maxHp = 100,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  const [animParams, setAnimParams] = useState<{
    startLeftPx: number;
    txPx: number;
    show: boolean;
    splashLeftPx: number;
    splashTopPx: number;
    arcPx: number;
    splashImg: string;
    randomFactor: number; // Menyimpan faktor random untuk konsistensi
  } | null>(null);

  const [showBalloon, setShowBalloon] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [showDamage, setShowDamage] = useState(false);
  const [balloonKey, setBalloonKey] = useState(0);

  // State untuk emosi karakter
  const [leftEmotion, setLeftEmotion] = useState<"normal" | "happy" | "sad">(
    "normal"
  );
  const [rightEmotion, setRightEmotion] = useState<"normal" | "happy" | "sad">(
    "normal"
  );

  // State untuk gender karakter kiri
  const [gender, setGender] = useState<"man" | "woman">("man");

  const splashDurationMs = 420;

  // audio refs
  const splashAudioRef = useRef<HTMLAudioElement | null>(null);
  const missAudioRef = useRef<HTMLAudioElement | null>(null);

  // WebAudio refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const splashSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const missSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const splashGainRef = useRef<GainNode | null>(null);
  const missGainRef = useRef<GainNode | null>(null);

  // Ambil gender dari localStorage saat komponen mount
  useEffect(() => {
    const storedGender = localStorage.getItem("gender");
    if (storedGender === "man" || storedGender === "woman") {
      setGender(storedGender);
    } else {
      setGender("man"); // default
    }
  }, []);

  // Fungsi untuk mendapatkan splash image secara random
  const getRandomSplash = () => {
    const randomSplash = Math.floor(Math.random() * 3) + 1;
    return `./images/splash-${randomSplash}.webp`;
  };

  // Fungsi untuk menghasilkan faktor ketinggian random
  const getRandomHeightFactor = () => {
    // Menghasilkan angka random antara 0.25 hingga 0.45
    // Ini akan membuat ketinggian bervariasi antara 25% hingga 45% dari jarak horizontal
    return 0.25 + Math.random() * 0.2;
  };

  // Fungsi untuk memilih gambar karakter berdasarkan persentase HP dan emosi
  const pickCharacterImage = (
    character: "man" | "woman" | "bot",
    hp: number,
    max = 100,
    emotion: "normal" | "happy" | "sad" = "normal"
  ) => {
    const safeHp = Math.max(0, Math.min(hp, max));

    // Hitung persentase HP
    const hpPercentage = (safeHp / max) * 100;

    // Tentukan fase berdasarkan persentase HP
    let phase: string;
    if (safeHp === 0) {
      phase = "dead";
    } else if (hpPercentage <= 25) {
      phase = "4";
    } else if (hpPercentage <= 50) {
      phase = "3";
    } else if (hpPercentage <= 75) {
      phase = "2";
    } else {
      phase = "1";
    }

    // Jika ada emosi khusus, gunakan gambar dengan emosi
    if (emotion !== "normal") {
      return `./images/${character}-${phase}-${emotion}.webp`;
    }

    // Gambar normal berdasarkan HP
    return `./images/${character}-${phase}.webp`;
  };

  // Gunakan gender untuk karakter kiri, bot tetap untuk karakter kanan
  const leftCharacter = pickCharacterImage(gender, leftHp, maxHp, leftEmotion);
  const rightCharacter = pickCharacterImage(
    "bot",
    rightHp,
    maxHp,
    rightEmotion
  );
  const balloonImg = "./images/balloon.webp";

  // -------------------------
  // AUDIO SETUP + HELPERS
  // -------------------------
  useEffect(() => {
    // create html audio elements
    const splash = new Audio("sounds/splash.mp3");
    splash.preload = "auto";
    splash.volume = 1;

    const miss = new Audio("sounds/miss.mp3");
    miss.preload = "auto";
    miss.volume = 1;

    splashAudioRef.current = splash;
    missAudioRef.current = miss;

    // create AudioContext + Gain nodes and connect elements
    let audioCtx: AudioContext | null = null;
    try {
      audioCtx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      audioCtxRef.current = audioCtx;

      // splash nodes
      try {
        const sSource = audioCtx.createMediaElementSource(splash);
        const sGain = audioCtx.createGain();
        sGain.gain.value = 1.0;
        sSource.connect(sGain);
        sGain.connect(audioCtx.destination);
        splashSourceRef.current = sSource;
        splashGainRef.current = sGain;
      } catch (e) {
        splashSourceRef.current = null;
        splashGainRef.current = null;
      }

      // miss nodes
      try {
        const mSource = audioCtx.createMediaElementSource(miss);
        const mGain = audioCtx.createGain();
        mGain.gain.value = 1.8;
        mSource.connect(mGain);
        mGain.connect(audioCtx.destination);
        missSourceRef.current = mSource;
        missGainRef.current = mGain;
      } catch (e) {
        missSourceRef.current = null;
        missGainRef.current = null;
      }
    } catch (err) {
      audioCtx = null;
      audioCtxRef.current = null;
    }

    // Ensure audio context will be resumed on first user interaction
    const unlock = async () => {
      try {
        if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
          await audioCtxRef.current.resume();
        }
      } catch {}
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      // cleanup
      try {
        splash.pause();
        splash.currentTime = 0;
      } catch {}
      try {
        miss.pause();
        miss.currentTime = 0;
      } catch {}

      try {
        if (splashSourceRef.current) splashSourceRef.current.disconnect();
        if (splashGainRef.current) splashGainRef.current.disconnect();
        if (missSourceRef.current) missSourceRef.current.disconnect();
        if (missGainRef.current) missGainRef.current.disconnect();
        if (audioCtxRef.current && audioCtxRef.current.state !== "closed")
          audioCtxRef.current.close();
      } catch {}

      splashAudioRef.current = null;
      missAudioRef.current = null;
      audioCtxRef.current = null;
      splashSourceRef.current = null;
      missSourceRef.current = null;
      splashGainRef.current = null;
      missGainRef.current = null;
      window.removeEventListener("pointerdown", unlock as any);
      window.removeEventListener("keydown", unlock as any);
    };
  }, []);

  // helper: ensure audio context resumed before play
  const ensureAudioUnlocked = async () => {
    try {
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        await audioCtxRef.current.resume();
      }
    } catch {}
  };

  // play splash when showSplash && hit
  useEffect(() => {
    if (showSplash && hit) {
      const audio = splashAudioRef.current;
      if (!audio) return;
      (async () => {
        await ensureAudioUnlocked();
        try {
          audio.currentTime = 0;
          const p = audio.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } catch {}
      })();
    }
  }, [showSplash, hit]);

  // play miss when showDamage && !hit
  useEffect(() => {
    if (showDamage && !hit) {
      const audio = missAudioRef.current;
      if (!audio) return;
      (async () => {
        await ensureAudioUnlocked();
        try {
          audio.currentTime = 0;
          const p = audio.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } catch {}
      })();
    }
  }, [showDamage, hit]);

  // -------------------------
  // ANIMATION / POSITION (dengan ketinggian random)
  // -------------------------
  useEffect(() => {
    if (!active || !triggerId) return;
    const total = durationMs + splashDurationMs + 80;
    const t = window.setTimeout(() => {
      onDone && onDone();
      setAnimParams(null);
      setShowBalloon(false);
      setShowSplash(false);
      setShowDamage(false);
      // Reset emosi setelah animasi selesai
      setLeftEmotion("normal");
      setRightEmotion("normal");
    }, total);
    return () => clearTimeout(t);
  }, [triggerId, durationMs, onDone, active]);

  useEffect(() => {
    if (!active || !triggerId) return;
    if (!rootRef.current) return;

    const compute = () => {
      const rootRect = rootRef.current!.getBoundingClientRect();
      const leftRect = leftRef.current?.getBoundingClientRect();
      const rightRect = rightRef.current?.getBoundingClientRect();

      // Dapatkan splash image random untuk animasi ini
      const randomSplashImg = getRandomSplash();

      // Generate faktor ketinggian random untuk animasi ini
      const randomHeightFactor = getRandomHeightFactor();

      if (!leftRect || !rightRect) {
        const txPx = 240;
        const startLeftPx = attackerSide === "left" ? 40 : 240;
        const splashLeftPx = startLeftPx + txPx;
        const splashTopPx = 36;
        // Ketinggian random: antara 25% hingga 45% dari jarak horizontal
        const arcPx = Math.max(
          48,
          Math.min(160, Math.abs(txPx) * randomHeightFactor)
        );
        setAnimParams({
          startLeftPx,
          txPx,
          show: true,
          splashLeftPx,
          splashTopPx,
          arcPx,
          splashImg: randomSplashImg,
          randomFactor: randomHeightFactor, // Simpan faktor random untuk konsistensi
        });
        setShowSplash(false);
        setShowBalloon(true);
        setShowDamage(false);
        setBalloonKey((k) => k + 1);
        return;
      }

      const leftCenter = leftRect.left + leftRect.width / 2 - rootRect.left;
      const rightCenter = rightRect.left + rightRect.width / 2 - rootRect.left;

      let startLeftPx: number;
      let txPx: number;
      let defenderCenterX: number;
      let defenderCenterY: number;

      if (attackerSide === "left") {
        startLeftPx = leftCenter - 28;
        txPx = rightCenter - leftCenter;
        defenderCenterX = rightCenter;
        defenderCenterY = rightRect.top + rightRect.height / 2 - rootRect.top;
      } else {
        startLeftPx = rightCenter - 28;
        txPx = leftCenter - rightCenter;
        defenderCenterX = leftCenter;
        defenderCenterY = leftRect.top + leftRect.height / 2 - rootRect.top;
      }

      const splashWidth = 80;
      const splashHeight = 60;
      const splashLeftPx = defenderCenterX - splashWidth / 2;
      const splashTopPx = defenderCenterY - splashHeight / 1.8;
      // Ketinggian random: antara 25% hingga 45% dari jarak horizontal
      const arcPx = Math.max(
        48,
        Math.min(180, Math.abs(txPx) * randomHeightFactor)
      );

      setAnimParams({
        startLeftPx,
        txPx,
        show: true,
        splashLeftPx,
        splashTopPx,
        arcPx,
        splashImg: randomSplashImg,
        randomFactor: randomHeightFactor, // Simpan faktor random untuk konsistensi
      });

      // reset sequencing & restart
      setShowSplash(false);
      setShowBalloon(true);
      setShowDamage(false);
      setBalloonKey((k) => k + 1);
    };

    compute();
    const onRes = () => compute();
    window.addEventListener("resize", onRes);
    return () => window.removeEventListener("resize", onRes);
  }, [
    triggerId,
    attackerSide,
    durationMs,
    active,
    leftHp,
    rightHp,
    maxHp,
    gender,
  ]);

  // Atur emosi karakter berdasarkan hit/miss
  useEffect(() => {
    if (showDamage) {
      if (attackerSide === "left") {
        // Penyerang kiri (man/woman), target kanan (bot)
        setRightEmotion(hit ? "sad" : "happy");
        setLeftEmotion(hit ? "happy" : "sad");
      } else {
        // Penyerang kanan (bot), target kiri (man/woman)
        setLeftEmotion(hit ? "sad" : "happy");
        setRightEmotion(hit ? "happy" : "sad");
      }
    }
  }, [showDamage, hit, attackerSide]);

  const rotationClass =
    attackerSide === "left" ? "rotate-right" : "rotate-left";

  // CSS untuk animasi balloon dengan ketinggian random
  const balloonAnimationStyle = `
    @keyframes throw-balloon-corrected {
      0% {
        transform: translate(0, 0);
        bottom: 0;
      }
      50% {
        transform: translate(calc(var(--tx) * 0.5), calc(-1 * var(--arc)));
        bottom: var(--arc);
      }
      100% {
        transform: translate(var(--tx), 0);
        bottom: 0;
      }
    }
    
    .balloon-corrected {
      animation: throw-balloon-corrected linear forwards;
    }
  `;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="relative w-full my-8 h-[160px] select-none pointer-events-none"
    >
      {/* Inject CSS untuk animasi yang diperbaiki */}
      <style>{balloonAnimationStyle}</style>

      <div
        ref={leftRef}
        className="child child-left absolute ml-6 left-[12px] bottom-[6px] z-10 w-[140px] h-[140px] overflow-visible"
      >
        <img
          src={leftCharacter}
          alt={`${gender} character`}
          className="character-img block w-full h-auto transform origin-bottom-center scale-[1.5] pointer-events-none select-none"
          draggable={false}
        />
      </div>

      <div
        ref={rightRef}
        className="child child-right absolute mr-12 right-[12px] bottom-[6px] z-10 w-[140px] h-[140px] overflow-visible"
      >
        <img
          src={rightCharacter}
          alt="bot character"
          className="character-img block w-full h-auto transform origin-bottom-center scale-[1.5] pointer-events-none select-none"
          draggable={false}
        />
      </div>

      {animParams && animParams.show && showBalloon && active && (
        <img
          key={balloonKey}
          src={balloonImg}
          alt="balloon"
          className={`balloon-corrected dynamic-balloon ${rotationClass} absolute z-40 w-[56px] h-[56px]`}
          style={
            {
              left: `${animParams.startLeftPx}px`,
              // @ts-ignore
              ["--tx" as any]: `${animParams.txPx}px`,
              // @ts-ignore
              ["--arc" as any]: `${animParams.arcPx}px`,
              animationDuration: `${durationMs}ms`,
            } as React.CSSProperties
          }
          draggable={false}
          onAnimationEnd={() => {
            setShowBalloon(false);
            setShowDamage(true);
            if (hit) {
              setTimeout(() => setShowSplash(true), 22);
            }
          }}
        />
      )}

      {animParams && animParams.show && showSplash && hit && (
        <img
          src={animParams.splashImg}
          alt="splash"
          className={`splash ${
            attackerSide === "left" ? "splash-right" : "splash-left"
          } hit absolute z-30 w-[88px] h-auto`}
          style={{
            left: `${animParams.splashLeftPx}px`,
            top: `${animParams.splashTopPx}px`,
            animationDuration: `${splashDurationMs}ms`,
          }}
          draggable={false}
        />
      )}

      {animParams && animParams.show && showDamage && (
        <div
          className={`anim-damage ${
            attackerSide === "left" ? "damage-right" : "damage-left"
          } ${
            hit ? "hit" : "miss"
          } absolute z-50 font-extrabold text-lg px-3 py-1 rounded-full bg-white border`}
          style={{
            left: `${animParams.splashLeftPx + 28}px`,
            top: `${animParams.splashTopPx - 18}px`,
            animationDuration: `${splashDurationMs + 150}ms`,
          }}
        >
          {damageText}
        </div>
      )}
    </div>
  );
}
