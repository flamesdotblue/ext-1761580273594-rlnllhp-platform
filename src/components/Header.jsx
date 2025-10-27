import { Rocket, Timer, RotateCcw } from "lucide-react";

export default function Header({ started, timeLeft, onReset }) {
  const mm = String(Math.max(0, Math.floor(timeLeft / 60))).padStart(2, "0");
  const ss = String(Math.max(0, timeLeft % 60)).padStart(2, "0");

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-600 text-white">
            <Rocket size={18} />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight">RankUp</div>
            <div className="text-xs text-slate-500">JEE • NEET Mock Tests</div>
          </div>
        </div>

        {started ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-md border bg-white px-3 py-1.5 text-sm font-medium text-slate-700">
              <Timer size={16} className="text-rose-500" />
              <span className="tabular-nums">{mm}:{ss}</span>
            </div>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        ) : (
          <div className="text-xs text-slate-500">Practice smarter. Rank higher.</div>
        )}
      </div>
    </header>
  );
}
