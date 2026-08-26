import { sanitizeHtml } from "../utils/sanitizeHtml";

type Player = {
  id: string;
  name: string;
  hp: number;
  isBot?: boolean;
};

type Question = {
  id: number;
  question: string;
  choices: Record<string, string>;
  correct: string;
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

type EndModalProps = {
  showEndModal: boolean;
  setShowEndModal: (show: boolean) => void;
  winnerId: string | null;
  players: Player[];
  player1Answers: LogEntry[];
  resetGame: () => void;
};

export default function EndModal({
  showEndModal,
  setShowEndModal,
  winnerId,
  players,
  player1Answers,
  resetGame,
}: EndModalProps) {
  if (!showEndModal) return null;

  return (
    <div
      className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5"
      onClick={() => setShowEndModal(false)}
    >
      <div
        className="modal w-[min(900px,96vw)] max-h-[90vh] bg-white rounded-xl p-4 shadow-2xl overflow-hidden flex flex-col gap-4"
        role="dialog"
        aria-modal="true"
        aria-label="Hasil Game"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="m-0 text-base font-semibold">Hasil Game</h2>
            <div className="mt-1 text-sm text-gray-600">
              Ringkasan jawaban Player 1
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right min-w-[160px]">
              <div className="flex items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold ${
                    winnerId === "p1"
                      ? "bg-gradient-to-br from-green-300 to-green-500"
                      : "bg-gradient-to-br from-sky-300 to-indigo-500"
                  }`}
                >
                  {winnerId === "p1" ? "😆" : "😢"}
                </div>
                <div className="text-left">
                  <div className="font-semibold">
                    {players.find((p) => p.id === winnerId)?.name ??
                      winnerId ??
                      "-"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {winnerId === "p1" ? "Kamu menang 🎉" : "Bot menang"}
                  </div>
                </div>
              </div>
            </div>

            <button
              aria-label="Tutup"
              onClick={() => setShowEndModal(false)}
              className="cursor-pointer text-lg p-2 text-gray-600 bg-transparent rounded"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body: Jawaban Player 1 */}
        <div className="bg-slate-50 border border-slate-100 rounded-md p-3 max-h-[62vh] overflow-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 className="m-0 text-sm font-semibold">Jawaban Player 1</h3>
            <div className="text-xs text-gray-500">
              {player1Answers.length} item
            </div>
          </div>

          {player1Answers.length === 0 ? (
            <div className="text-gray-600 p-3">
              Player 1 tidak menjawab soal apapun.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {player1Answers.map((l, idx) => {
                const q = l.questionObj;
                const choiceLabel = l.choice;

                // sanitize and keep only allowed formatting tags (e.g. <i>)
                const rawChoiceText =
                  choiceLabel != null ? q.choices[choiceLabel] : "—";
                const choiceHtml = sanitizeHtml(rawChoiceText);

                const correctLabel = q.correct;
                const rawCorrectText =
                  correctLabel != null ? q.choices[correctLabel] : "";
                const correctHtml = sanitizeHtml(rawCorrectText);

                const questionHtml = sanitizeHtml(q.question);

                const isCorrect = l.isCorrect;

                return (
                  <div
                    key={q.id}
                    className="bg-white rounded-lg p-3 shadow-sm flex gap-3 items-start"
                  >
                    <div className="w-10 text-center font-bold text-base">
                      {idx + 1}
                    </div>

                    <div className="flex-1">
                      <div
                        className="font-bold mb-2"
                        // question might include simple formatting (sanitized)
                        dangerouslySetInnerHTML={{
                          __html: questionHtml,
                        }}
                      />

                      <div className="flex gap-3 items-center flex-wrap">
                        <div className="min-w-[140px] text-sm">
                          <div
                            className="text-gray-800"
                            dangerouslySetInnerHTML={{
                              __html: choiceHtml,
                            }}
                          />
                        </div>

                        <div
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            isCorrect
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : "bg-red-50 text-red-600 border border-red-100"
                          }`}
                        >
                          {isCorrect ? "Benar" : "Salah"}
                        </div>

                        <div className="ml-auto text-right">
                          <div className="text-xs text-gray-500">
                            Jawaban benar:
                          </div>
                          <div
                            className="text-sm text-gray-800"
                            dangerouslySetInnerHTML={{
                              __html: correctHtml,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowEndModal(false)}
            className="cursor-pointer px-3 py-2 rounded-lg border bg-white"
          >
            Tutup
          </button>
          <button
            onClick={() => {
              setShowEndModal(false);
              resetGame();
            }}
            className="cursor-pointer px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-teal-400 text-white font-semibold"
          >
            Main lagi
          </button>
        </div>
      </div>
    </div>
  );
}
