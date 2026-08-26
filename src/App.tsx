// src/App.tsx

import { useEffect, useRef, useState } from "react";
import GameBoard from "./components/GameBoard";
import QuestionPanel from "./components/QuestionPanel";
import WaterBalloonAnimation from "./components/WaterBalloonAnimation";
import WelcomeScreen from "./components/WelcomeScreen";
import EndModal from "./components/EndModal";
import { MODUL1_QUESTIONS as QUESTIONS } from "./data/questions";
import type { Question } from "./data/questions";
import { computeDamage } from "./utils/damage";
import confetti from "canvas-confetti";

type Player = {
  id: string;
  name: string;
  hp: number;
  isBot?: boolean;
};

type RoundInfo = {
  roundId: number;
  attackerId: string;
  defenderId: string;
  question: Question;
  startTime: number;
  timeLimit: number;
};

type FloatingDamage = {
  id: string;
  playerId: string;
  text: string;
};

type PendingResult = {
  roundId: number;
  attackerId: string;
  defenderId: string;
  choice: string | null;
  isCorrect: boolean;
  damage: number;
  timeTaken: number;
};

type LogEntry = {
  roundId: number;
  attacker: string;
  defender: string;
  choice: string | null;
  isCorrect: boolean;
  damage: number;
  question: string;
  questionObj: Question;
  timeTaken: number;
};

const BASE_DAMAGE = 10;
const MAX_HP = QUESTIONS.length * 20;

function makePlayers(maxHp: number): Player[] {
  return [
    { id: "p1", name: "Player 1", hp: maxHp },
    { id: "p2", name: "Bot (CPU)", hp: maxHp, isBot: true },
  ];
}

export default function App() {
  const [players, setPlayers] = useState<Player[]>(() => makePlayers(MAX_HP));
  const [currentTurn, setCurrentTurn] = useState<string>("p1");
  const [log, setLog] = useState<LogEntry[]>([]);
  const [roundInfo, setRoundInfo] = useState<RoundInfo | null>(null);
  const [questionsPool, setQuestionsPool] = useState<number[]>(() =>
    QUESTIONS.map((q) => q.id)
  );
  const [floatingDamages, setFloatingDamages] = useState<FloatingDamage[]>([]);
  const [attackAnim, setAttackAnim] = useState<null | {
    id: string;
    attackerSide: "left" | "right";
    text: string;
    hit: boolean;
  }>(null);
  const [pendingResult, setPendingResult] = useState<PendingResult | null>(
    null
  );
  const [started, setStarted] = useState<boolean>(false);
  const [showEndModal, setShowEndModal] = useState<boolean>(false);
  const [winnerId, setWinnerId] = useState<string | null>(null);

  const playersRef = useRef(players);
  const roundRef = useRef(roundInfo);
  const questionsPoolRef = useRef(questionsPool);

  const botTimerRef = useRef<number | null>(null);
  const botScheduledAtRef = useRef<number | null>(null);
  const botDelayRef = useRef<number | null>(null);
  const botRemainingRef = useRef<number | null>(null);
  const pauseStartRef = useRef<number | null>(null);

  useEffect(() => {
    playersRef.current = players;
  }, [players]);
  useEffect(() => {
    roundRef.current = roundInfo;
  }, [roundInfo]);
  useEffect(() => {
    questionsPoolRef.current = questionsPool;
  }, [questionsPool]);

  useEffect(() => {
    return () => {
      if (botTimerRef.current) {
        window.clearTimeout(botTimerRef.current);
        botTimerRef.current = null;
      }
    };
  }, []);

  function clearBotTimer() {
    if (botTimerRef.current) {
      window.clearTimeout(botTimerRef.current);
      botTimerRef.current = null;
    }
    botScheduledAtRef.current = null;
    botDelayRef.current = null;
    botRemainingRef.current = null;
  }

  function pickNextQuestionFromPool(): Question | null {
    let pool = questionsPoolRef.current;
    if (!pool || pool.length === 0) {
      const allIds = QUESTIONS.map((q) => q.id);
      setQuestionsPool(allIds);
      questionsPoolRef.current = allIds;
      pool = allIds;
    }
    if (!pool || pool.length === 0) return null;
    const randomIdx = Math.floor(Math.random() * pool.length);
    const qid = pool[randomIdx];
    const q = QUESTIONS.find((qq) => qq.id === qid) ?? null;
    return q;
  }

  function performBotAnswer(round: RoundInfo) {
    const currentRound = roundRef.current;
    if (!currentRound || currentRound.roundId !== round.roundId) return;
    const currentAttacker = playersRef.current.find(
      (p) => p.id === round.attackerId
    );
    if (!currentAttacker?.isBot) return;

    const now = Date.now();
    const timeTaken = Math.max(0, (now - round.startTime) / 1000);
    const botAccuracy = 0.78;
    const willBeCorrect = Math.random() < botAccuracy;

    let chosen: string | null = null;
    if (willBeCorrect) chosen = round.question.correct;
    else {
      const keys = Object.keys(round.question.choices).filter(
        (k) => k !== round.question.correct
      );
      chosen = keys[Math.floor(Math.random() * keys.length)];
    }

    const isCorrect = chosen === round.question.correct;
    const damage = computeDamage({
      baseDamage: BASE_DAMAGE,
      timeLimit: round.timeLimit,
      timeTaken,
      isCorrect,
    });

    applyResult({ choice: chosen, isCorrect, damage, timeTaken });
  }

  function scheduleBotAnswer(round: RoundInfo) {
    clearBotTimer();

    const minDelay = 300;
    const maxDelay = Math.max(300, round.timeLimit * 1000 - 200);
    const delay =
      Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    botDelayRef.current = delay;
    botScheduledAtRef.current = Date.now();
    botTimerRef.current = window.setTimeout(() => {
      botTimerRef.current = null;
      botScheduledAtRef.current = null;
      botDelayRef.current = null;
      performBotAnswer(round);
    }, delay);
  }

  useEffect(() => {
    function onVisibilityChange() {
      if (document.hidden) {
        pauseStartRef.current = Date.now();

        if (
          botTimerRef.current &&
          botScheduledAtRef.current != null &&
          botDelayRef.current != null
        ) {
          const elapsed = Date.now() - botScheduledAtRef.current;
          const remaining = Math.max(0, (botDelayRef.current ?? 0) - elapsed);
          window.clearTimeout(botTimerRef.current);
          botTimerRef.current = null;
          botScheduledAtRef.current = null;
          botDelayRef.current = null;
          botRemainingRef.current = remaining;
        }
      } else {
        if (pauseStartRef.current) {
          const pausedDuration = Date.now() - pauseStartRef.current;
          pauseStartRef.current = null;

          setRoundInfo((r) => {
            if (!r) return r;
            const newStart = r.startTime + pausedDuration;
            const newR = { ...r, startTime: newStart };
            roundRef.current = newR;
            return newR;
          });
        }

        if (botRemainingRef.current != null) {
          const remaining = botRemainingRef.current;
          botRemainingRef.current = null;
          const currentRound = roundRef.current;
          if (!currentRound) return;

          if (remaining <= 0) {
            performBotAnswer(currentRound);
          } else {
            botDelayRef.current = remaining;
            botScheduledAtRef.current = Date.now();
            botTimerRef.current = window.setTimeout(() => {
              botTimerRef.current = null;
              botScheduledAtRef.current = null;
              botDelayRef.current = null;
              performBotAnswer(currentRound);
            }, remaining);
          }
        }
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  function startRound(attackerId: string) {
    clearBotTimer();
    setCurrentTurn(attackerId);

    let nextQ = pickNextQuestionFromPool();
    if (!nextQ) {
      setRoundInfo(null);
      return;
    }

    const round: RoundInfo = {
      roundId: Date.now(),
      attackerId,
      defenderId: attackerId === "p1" ? "p2" : "p1",
      question: nextQ,
      startTime: Date.now(),
      timeLimit: 10,
    };

    setRoundInfo(round);

    const attacker = playersRef.current.find((p) => p.id === attackerId);
    if (attacker?.isBot) {
      scheduleBotAnswer(round);
    }
  }

  function pushFloatingDamage(fd: FloatingDamage) {
    setFloatingDamages((prev) => [...prev, fd]);
    setTimeout(() => {
      setFloatingDamages((prev) => prev.filter((x) => x.id !== fd.id));
    }, 1300);
  }

  const victoryAudioRef = useRef<HTMLAudioElement | null>(null);
  const loseAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const victory = new Audio("sounds/victory.mp3");
    victory.preload = "auto";
    const lose = new Audio("sounds/lose.mp3");
    lose.preload = "auto";

    victoryAudioRef.current = victory;
    loseAudioRef.current = lose;

    return () => {
      try {
        victory.pause();
        victory.currentTime = 0;
      } catch {}
      try {
        lose.pause();
        lose.currentTime = 0;
      } catch {}
      victoryAudioRef.current = null;
      loseAudioRef.current = null;
    };
  }, []);

  const safePlay = (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    try {
      audio.currentTime = 0;
      const p = audio.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } catch {}
  };

  function applyResult({
    choice,
    isCorrect,
    damage,
    timeTaken,
  }: {
    choice: string | null;
    isCorrect: boolean;
    damage: number;
    timeTaken: number;
  }) {
    clearBotTimer();
    const currentRound = roundRef.current;
    if (!currentRound) return;

    if (isCorrect && currentRound.attackerId === "p1") {
      setQuestionsPool((prev) => {
        const next = prev.filter((id) => id !== currentRound.question.id);
        questionsPoolRef.current = next;
        return next;
      });
    }

    setLog((prev) => [
      {
        roundId: currentRound.roundId,
        attacker: currentRound.attackerId,
        defender: currentRound.defenderId,
        choice,
        isCorrect,
        damage,
        question: currentRound.question.question,
        questionObj: currentRound.question,
        timeTaken,
      },
      ...prev,
    ]);

    const fd: FloatingDamage = {
      id: `${currentRound.roundId}_${Date.now()}`,
      playerId: currentRound.defenderId,
      text: isCorrect ? `-${damage}` : "Miss",
    };
    pushFloatingDamage(fd);

    const anim = {
      id: `${currentRound.roundId}_${Date.now()}`,
      attackerSide:
        currentRound.attackerId === "p1"
          ? ("left" as const)
          : ("right" as const),
      text: isCorrect ? `-${damage}` : "Miss",
      hit: isCorrect,
    };

    setPendingResult({
      roundId: currentRound.roundId,
      attackerId: currentRound.attackerId,
      defenderId: currentRound.defenderId,
      choice,
      isCorrect,
      damage,
      timeTaken,
    });
    setAttackAnim(anim);
  }

  function handleAnimDone() {
    const pr = pendingResult;
    setAttackAnim(null);

    if (!pr) return;

    if (pr.isCorrect) {
      setPlayers((prev) =>
        prev.map((p) =>
          p.id === pr.defenderId
            ? { ...p, hp: Math.max(0, p.hp - pr.damage) }
            : p
        )
      );
    }

    const defenderSnapshot = playersRef.current.find(
      (p) => p.id === pr.defenderId
    );
    const defenderNewHp =
      (defenderSnapshot ? defenderSnapshot.hp : 0) -
      (pr.isCorrect ? pr.damage : 0);

    if (defenderNewHp <= 0) {
      setPlayers((prev) =>
        prev.map((p) => (p.id === pr.defenderId ? { ...p, hp: 0 } : p))
      );
      setRoundInfo(null);
      setPendingResult(null);

      const winner = pr.attackerId;
      const loser = pr.defenderId;

      if (winner === "p1") {
        safePlay(victoryAudioRef.current);
      } else if (loser === "p1") {
        safePlay(loseAudioRef.current);
      }

      if (winner === "p1") {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.4 },
        });
      }

      setWinnerId(winner);
      return;
    }

    const nextTurn = pr.defenderId;
    setCurrentTurn(nextTurn);
    setPendingResult(null);

    setTimeout(() => startRound(nextTurn), 700);
  }

  function resetGame() {
    clearBotTimer();
    setPlayers(makePlayers(MAX_HP));
    setLog([]);
    setCurrentTurn("p1");
    setRoundInfo(null);
    setFloatingDamages([]);
    setQuestionsPool(QUESTIONS.map((q) => q.id));
    setAttackAnim(null);
    setPendingResult(null);
    setStarted(false);
    setShowEndModal(false);
    setWinnerId(null);
  }

  const chronoLog = log.slice().reverse();
  const player1Map = new Map<number, (typeof log)[number]>();
  for (const entry of chronoLog) {
    if (entry.attacker !== "p1") continue;
    const qid = entry.questionObj.id;
    if (!player1Map.has(qid)) {
      player1Map.set(qid, entry);
    }
  }
  const player1Answers = Array.from(player1Map.values());

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-100">
      {!started ? (
        <WelcomeScreen
          onStart={() => {
            setStarted(true);
            setTimeout(() => startRound("p1"), 80);
          }}
        />
      ) : (
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          {/* <div className="text-center mb-2">
            <h1 className="text-3xl font-bold text-blue-800 drop-shadow-sm">
              Water Balloon Quiz Battle
            </h1>
            <p className="text-blue-600 mt-1">
              Jawab soal dengan benar untuk melempar balon air!
            </p>
          </div> */}

          {/* Game Board */}
          <GameBoard
            players={players}
            currentTurn={currentTurn}
            floatingDamages={floatingDamages}
            maxHp={MAX_HP}
          />

          <WaterBalloonAnimation
            triggerId={attackAnim ? attackAnim.id : null}
            active={!!attackAnim}
            attackerSide={
              attackAnim
                ? attackAnim.attackerSide
                : currentTurn === "p1"
                ? "left"
                : "right"
            }
            damageText={attackAnim ? attackAnim.text : undefined}
            hit={attackAnim ? attackAnim.hit : false}
            onDone={handleAnimDone}
            durationMs={1200}
            leftHp={players.find((p) => p.id === "p1")?.hp ?? 0}
            rightHp={players.find((p) => p.id === "p2")?.hp ?? 0}
            maxHp={MAX_HP}
          />

          {/* Turn Indicator */}
          {/* <div className="text-center mb-4">
            <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full shadow-md">
              <span className="font-semibold text-md">
                {roundInfo
                  ? players.find((p) => p.id === roundInfo.attackerId)?.name +
                    " sedang menyerang..."
                  : "Memulai pertandingan..."}
              </span>
            </div>
          </div> */}

          {/* Question Panel */}
          {roundInfo ? (
            players.find((p) => p.id === roundInfo.attackerId)?.isBot ? (
              <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-6 text-center mb-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <em className="text-yellow-800 text-lg">
                    Bot sedang berpikir...
                  </em>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            ) : (
              <QuestionPanel round={roundInfo} onSubmitAnswer={applyResult} />
            )
          ) : (
            <div></div>
          )}

          {/* Game Over Section */}
          {winnerId && !showEndModal && (
            <div className="text-center bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white shadow-xl mb-6">
              <h2 className="text-4xl font-bold mb-4 drop-shadow">
                {winnerId === "p1" ? "🎉 Selamat! 🎉" : "💦 Game Over! 💦"}
              </h2>
              <p className="text-xl mb-2">
                {winnerId === "p1"
                  ? "Kamu memenangkan pertandingan!"
                  : "Bot memenangkan pertandingan!"}
              </p>
              <p className="text-lg mb-6 opacity-90">
                {winnerId === "p1"
                  ? "Jawabanmu tepat dan strategimu hebat!"
                  : "Jangan menyerah, coba lagi!"}
              </p>

              <div className="mb-6 p-4 bg-white/20 rounded-xl">
                <p className="text-lg mb-1">
                  Game edukasi ini dibuat dengan React JS
                </p>
                <p className="text-sm opacity-90">
                  Punya kritik dan saran? Hubungi:{" "}
                  <a
                    href="https://wa.me/082178563110"
                    target="_blank"
                    className="underline font-semibold hover:text-yellow-200 transition-colors"
                  >
                    Muhammad Al Hafidhi
                  </a>
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  className="cursor-pointer px-6 py-3 bg-white text-blue-600 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-xl"
                  onClick={resetGame}
                >
                  🔄 Main Lagi
                </button>

                <button
                  className="cursor-pointer px-6 py-3 bg-yellow-500 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-xl"
                  onClick={() => setShowEndModal(true)}
                >
                  📊 Lihat Hasil
                </button>
              </div>
            </div>
          )}

          <EndModal
            showEndModal={showEndModal}
            setShowEndModal={setShowEndModal}
            winnerId={winnerId}
            players={players}
            player1Answers={player1Answers}
            resetGame={resetGame}
          />
        </div>
      )}
    </div>
  );
}
