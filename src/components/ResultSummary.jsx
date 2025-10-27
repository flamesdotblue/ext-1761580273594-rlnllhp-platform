import { Award } from "lucide-react";

export default function ResultSummary({ exam, subject, result, onRestart }) {
  const { score, correct, incorrect, unanswered, total, maxScore, detail } = result;
  const pct = Math.max(0, Math.round((score / maxScore) * 100));

  return (
    <section className="mx-auto mt-10 max-w-4xl">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
            <Award size={18} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Your Results</h2>
            <p className="text-sm text-slate-500">{exam} · {subject}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          <Stat label="Score" value={`${score} / ${maxScore}`} accent="text-emerald-600" />
          <Stat label="Correct" value={correct} />
          <Stat label="Incorrect" value={incorrect} />
          <Stat label="Unanswered" value={unanswered} />
        </div>

        <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full bg-gradient-to-r from-indigo-600 to-violet-600" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 text-right text-xs text-slate-500">{pct}% of max score</div>

        <div className="mt-8">
          <h3 className="mb-3 text-sm font-medium text-slate-700">Review</h3>
          <div className="space-y-4">
            {detail.map(item => (
              <div key={item.id} className="rounded-lg border p-4">
                <div className="mb-2 text-sm font-semibold text-slate-900">{item.question}</div>
                <ul className="space-y-1 text-sm">
                  {item.options.map((opt, i) => {
                    const isCorrect = i === item.correctIndex;
                    const isChosen = i === item.chosen;
                    return (
                      <li key={i} className={`rounded-md px-2 py-1 ${isCorrect ? "bg-emerald-50 text-emerald-700" : isChosen ? "bg-rose-50 text-rose-700" : ""}`}>
                        {opt}
                        {isCorrect ? " • Correct" : isChosen ? " • Your answer" : ""}
                      </li>
                    );
                  })}
                </ul>
                {item.explanation ? (
                  <p className="mt-2 text-xs text-slate-600">{item.explanation}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button onClick={onRestart} className="rounded-md border px-4 py-2 text-sm hover:bg-slate-50">Back to Home</button>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className="rounded-lg border bg-white p-4 text-center">
      <div className={`text-xl font-semibold ${accent || "text-slate-900"}`}>{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}
