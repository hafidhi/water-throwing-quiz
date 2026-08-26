type Player = {
  id: string;
  name: string;
  hp: number;
  isBot?: boolean;
};

type FloatingDamage = {
  id: string;
  playerId: string;
  text: string;
};

interface GameBoardProps {
  players: Player[];
  currentTurn: string;
  floatingDamages?: FloatingDamage[];
  maxHp: number;
}

export default function GameBoard({
  players,
  currentTurn,
  // floatingDamages = [], // tetap di-comment seperti awal
  maxHp,
}: GameBoardProps) {
  return (
    <div className="flex gap-4 mb-4 items-stretch">
      {players.map((p) => {
        // const damagesForThis = floatingDamages.filter(
        //   (d) => d.playerId === p.id
        // ); // tetap di-comment

        // Calculate HP percentage
        const fillPercent =
          maxHp > 0 ? Math.max(0, Math.min(100, (p.hp / maxHp) * 100)) : 0;

        // Determine HP bar color based on percentage
        const getHpBarColor = () => {
          if (fillPercent > 75) return "from-green-500 to-emerald-400";
          if (fillPercent > 50) return "from-yellow-500 to-amber-400";
          if (fillPercent > 25) return "from-orange-500 to-yellow-400";
          return "from-red-500 to-orange-400";
        };

        const getHpStatus = () => {
          if (fillPercent > 75) return "🟢 Sehat";
          if (fillPercent > 50) return "🟡 Terluka";
          if (fillPercent > 25) return "🟠 Kritis";
          return "🔴 Bahaya";
        };

        return (
          <div
            key={p.id}
            className={`flex-1 rounded-xl border border-black/5 
            transition-all duration-200 ease-in-out overflow-visible relative p-3 rounded-lg bg-white shadow-sm transition-transform duration-150 ${
              currentTurn === p.id
                ? "-translate-y-1 shadow-lg border border-blue-100"
                : "border-transparent"
            }`}
          >
            <div className="font-bold text-base mb-2">
              {p.name} {p.isBot ? "🤖" : ""}
            </div>

            {/* Floating damages tetap di-comment */}
            {/* <div
              className="floating-damage-container"
              aria-hidden
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: "flex-end",
                pointerEvents: "none",
              }}
            >
              {damagesForThis.map((d) => (
                <div
                  key={d.id}
                  className={`floating-damage ${d.text === "Miss" ? "miss" : ""}`}
                  style={{
                    transform: "translateY(0)",
                    transition: "transform 0.25s ease, opacity 0.3s",
                    background:
                      d.text === "Miss" ? "transparent" : "rgba(255,0,0,0.08)",
                    padding: "2px 6px",
                    borderRadius: 6,
                    fontSize: 12,
                    color: d.text === "Miss" ? "#777" : "#d00",
                    opacity: 1,
                  }}
                >
                  {d.text}
                </div>
              ))}
            </div> */}

            {/* New Enhanced Health Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">Health Points</span>
                <span className="text-gray-500 font-mono">
                  {Math.max(0, p.hp)} / {maxHp}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                <div
                  className={`h-full transition-all duration-500 ease-out rounded-full bg-gradient-to-r ${getHpBarColor()} relative overflow-hidden`}
                  style={{ width: `${fillPercent}%` }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>

                  {/* HP Bar Pattern */}
                  <div className="absolute inset-0 opacity-10 bg-repeat-x bg-[length:20px_20px] bg-[radial-gradient(circle,#000_1px,transparent_1px)]"></div>
                </div>
              </div>

              {/* HP Status */}
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Status</span>
                <span
                  className={`font-bold ${
                    fillPercent > 70
                      ? "text-green-600"
                      : fillPercent > 40
                      ? "text-yellow-600"
                      : fillPercent > 20
                      ? "text-orange-600"
                      : "text-red-600"
                  }`}
                >
                  {getHpStatus()}
                </span>
              </div>
            </div>

            <style>{`
              @keyframes shimmer {
                0% {
                  transform: translateX(-100%) skewX(-12deg);
                }
                100% {
                  transform: translateX(200%) skewX(-12deg);
                }
              }
              .animate-shimmer {
                animation: shimmer 2s infinite;
              }
            `}</style>
          </div>
        );
      })}
    </div>
  );
}
