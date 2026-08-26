// src/components/QuestionPanel.tsx

import { useEffect, useRef, useState } from "react";
import { computeDamage } from "../utils/damage";

type Question = {
  id: number;
  question: string;
  choices: Record<string, string>;
  correct: string;
};

type RoundInfo = {
  roundId: number;
  attackerId: string;
  defenderId: string;
  question: Question;
  startTime: number; // ms
  timeLimit: number; // seconds
};

type Props = {
  round: RoundInfo;
  onSubmitAnswer: (res: {
    choice: string | null; // actual choice key ('a'|'b'|...)
    isCorrect: boolean;
    damage: number;
    timeTaken: number;
  }) => void;
};

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuestionPanel({ round, onSubmitAnswer }: Props) {
  const [timeLeft, setTimeLeft] = useState<number>(round.timeLimit);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);

  const LABELS = ["A", "B", "C", "D"];

  const [displayedChoices, setDisplayedChoices] = useState<
    { label: string; key: string; text: string }[]
  >([]);

  const intervalRef = useRef<number | null>(null);
  const startRef = useRef<number>(round.startTime);

  // Sound effects
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    const clickAudio = new Audio("sounds/click.mp3");
    clickAudio.preload = "auto";
    const timeoutAudio = new Audio("sounds/timeout.mp3");
    timeoutAudio.preload = "auto";

    clickAudioRef.current = clickAudio;
    timeoutAudioRef.current = timeoutAudio;

    return () => {
      try {
        clickAudio.pause();
        clickAudio.currentTime = 0;
        timeoutAudio.pause();
        timeoutAudio.currentTime = 0;
      } catch {}
    };
  }, []);

  const playSound = (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    try {
      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    } catch {}
  };

  useEffect(() => {
    const keys = Object.keys(round.question.choices);
    const shuffledKeys = shuffle(keys);

    const arr = LABELS.map((label, idx) => {
      const key = shuffledKeys[idx] ?? shuffledKeys[idx % shuffledKeys.length];
      return {
        label,
        key,
        text: round.question.choices[key],
      };
    });

    setDisplayedChoices(arr);

    setSelected(null);
    setAnswered(false);
    setTimeLeft(round.timeLimit);
    startRef.current = round.startTime;

    const tick = () => {
      const elapsed = (Date.now() - startRef.current) / 1000;
      const rem = Math.max(0, round.timeLimit - elapsed);
      setTimeLeft(Number(rem.toFixed(2)));
      if (rem <= 0) {
        clearIntervalIfNeeded();
        playSound(timeoutAudioRef.current);
        handleSubmit(null);
      }
    };

    tick();
    intervalRef.current = window.setInterval(tick, 100);

    return () => clearIntervalIfNeeded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round.roundId]);

  function clearIntervalIfNeeded() {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function handleSubmit(choiceKey: string | null) {
    if (answered) return;

    clearIntervalIfNeeded();
    setSelected(choiceKey);
    setAnswered(true);

    if (choiceKey) {
      playSound(clickAudioRef.current);
    }

    const answerTime = Date.now();
    const timeTaken = Math.max(0, (answerTime - startRef.current) / 1000);
    const isCorrect =
      choiceKey !== null && choiceKey === round.question.correct;
    const damage = computeDamage({
      baseDamage: 10,
      timeLimit: round.timeLimit,
      timeTaken,
      isCorrect,
    });
    onSubmitAnswer({ choice: choiceKey, isCorrect, damage, timeTaken });
  }

  const percent = Math.max(
    0,
    Math.min(100, (timeLeft / round.timeLimit) * 100)
  );

  // Determine timer color based on remaining time
  const getTimerColor = () => {
    if (percent > 60) return "from-green-500 to-emerald-400";
    if (percent > 30) return "from-yellow-500 to-orange-400";
    return "from-red-500 to-pink-500";
  };

  const getTimerGlow = () => {
    if (percent > 60) return "shadow-lg shadow-green-500/20";
    if (percent > 30) return "shadow-lg shadow-yellow-500/20";
    return "shadow-lg shadow-red-500/20 pulse-alert";
  };

  return (
    <div className="question-panel w-full space-y-6">
      {/* Header Section */}
      {/* <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full mb-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold">WAKTU MENJAWAB</span>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </div> */}

      {/* Enhanced Timer Bar */}
      <div className="space-y-2">
        {/* Answered Status */}
        {answered && selected && (
          <div
            className={`text-center p-4 rounded-2xl border-2 ${
              selected === round.question.correct
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              {selected === round.question.correct ? (
                <>
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg">Jawaban Benar! 🎯</p>
                    <p className="text-sm">Kamu berhasil mengenai lawan!</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">✗</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg">Jawaban Salah! 💦</p>
                    <p className="text-sm">Kamu meleset...</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {answered && !selected && (
          <div className="text-center p-4 bg-yellow-50 border-2 border-yellow-200 text-yellow-800 rounded-2xl">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">⏰</span>
              </div>
              <div>
                <p className="font-bold text-lg">Waktu Habis! 💨</p>
                <p className="text-sm">Kamu tidak menjawab tepat waktu</p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!answered && (
          <div className="flex justify-between items-center text-sm font-medium text-gray-600">
            <span>Sisa Waktu</span>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full animate-pulse ${
                  percent > 60
                    ? "bg-green-500"
                    : percent > 30
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              ></div>
              <span
                className={`font-bold ${
                  percent > 60
                    ? "text-green-600"
                    : percent > 30
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {timeLeft.toFixed(1)}s
              </span>
            </div>
          </div>
        )}

        <div
          className={`w-full h-4 bg-gray-200 rounded-full overflow-hidden transition-all duration-300 ${getTimerGlow()}`}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={round.timeLimit}
          aria-valuenow={Math.round(timeLeft)}
        >
          <div
            className={`h-full transition-all duration-100 ease-linear rounded-full bg-gradient-to-r ${getTimerColor()}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">?</span>
          </div>
          <h2
            className="question-text text-lg font-semibold text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: round.question.question }}
          />
        </div>
        {/* <div className="text-right">
          <span className="text-xs text-gray-500 bg-white/50 px-2 py-1 rounded">
            Soal #{round.question.id}
          </span>
        </div> */}
      </div>

      {/* Choices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {displayedChoices.map((c) => {
          const isSelected = selected === c.key;
          const isCorrectAnswer = c.key === round.question.correct;

          let choiceStyle = "";
          if (answered) {
            if (isSelected && isCorrectAnswer) {
              choiceStyle =
                "bg-gradient-to-br from-green-500 to-emerald-600 text-white border-green-500 shadow-lg";
            } else if (isSelected && !isCorrectAnswer) {
              choiceStyle =
                "bg-gradient-to-br from-red-500 to-pink-600 text-white border-red-500 shadow-lg";
            } else if (isCorrectAnswer) {
              choiceStyle =
                "bg-gradient-to-br from-green-100 to-emerald-200 text-green-800 border-green-300 shadow-md";
            } else {
              choiceStyle =
                "bg-gray-100 text-gray-400 border-gray-200 opacity-70";
            }
          } else {
            choiceStyle = `
              bg-white text-gray-800 border-blue-200 
              hover:bg-blue-50 hover:border-blue-400 hover:shadow-md 
              active:scale-95 transition-all duration-200
              ${
                isSelected
                  ? "ring-2 ring-blue-400 border-blue-400 bg-blue-50 shadow-md"
                  : ""
              }
            `;
          }

          return (
            <button
              key={c.label}
              className={`
                relative w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left 
                transition-all duration-300 transform cursor-pointer
                ${choiceStyle}
                ${!answered ? "hover:scale-102" : ""}
              `}
              onClick={() => handleSubmit(c.key)}
              disabled={answered}
              aria-pressed={isSelected}
            >
              {/* Choice Indicator */}
              <div
                className={`
                flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
                font-bold text-sm border-2 transition-all duration-300
                ${
                  answered
                    ? isSelected && isCorrectAnswer
                      ? "bg-white text-green-600 border-white"
                      : isSelected && !isCorrectAnswer
                      ? "bg-white text-red-600 border-white"
                      : isCorrectAnswer
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-gray-300 text-gray-500 border-gray-300"
                    : isSelected
                    ? "bg-blue-500 text-white border-blue-500 shadow-md"
                    : "bg-white text-blue-600 border-blue-300"
                }
              `}
              >
                {c.label}
              </div>

              {/* Choice Text */}
              <div
                className="choice-text flex-1 text-md leading-relaxed font-medium"
                dangerouslySetInnerHTML={{ __html: c.text }}
              />

              {/* Status Icons */}
              {answered && (
                <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                  {isSelected && isCorrectAnswer && (
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-lg">✓</span>
                    </div>
                  )}
                  {isSelected && !isCorrectAnswer && (
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <span className="text-red-600 text-lg">✗</span>
                    </div>
                  )}
                  {!isSelected && isCorrectAnswer && (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
