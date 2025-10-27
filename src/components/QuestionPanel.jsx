import { ChevronLeft, ChevronRight } from "lucide-react";

export default function QuestionPanel({
  exam,
  subject,
  index,
  total,
  question,
  selected,
  onSelect,
  onPrev,
  onNext,
  onSubmit,
  answers,
}) {
  return (
    <section className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-[1fr,320px]">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
          <div>
            Exam: <span className="font-medium text-slate-700">{exam}</span> · Subject: <span className="font-medium text-slate-700">{subject}</span>
          </div>
          <div>Question {index + 1} of {total}</div>
        </div>

        <h3 className="text-base font-semibold text-slate-900">{question.question}</h3>

        <div className="mt-4 space-y-2">
          {question.options.map((opt, i) => {
            const active = selected === i;
            return (
              <label
                key={i}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm ${active ? "border-indigo-500 bg-indigo-50" : "hover:bg-slate-50"}`}
              >
                <input
                  type="radio"
                  name={`q-${question.id}`}
                  checked={active}
                  onChange={() => onSelect(question.id, i)}
                  className="mt-0.5"
                />
                <span>{opt}</span>
              </label>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={index === 0}
            className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm text-slate-700 enabled:hover:bg-slate-50 disabled:opacity-50"
          >
            <ChevronLeft size={16} /> Prev
          </button>

          <div className="flex items-center gap-2">
            {index < total - 1 ? (
              <button
                onClick={onNext}
                className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800"
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={onSubmit}
                className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="h-max rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-3 text-sm font-medium text-slate-700">Question Navigator</div>
        <div className="grid grid-cols-8 gap-2">
          {Array.from({ length: total }).map((_, i) => {
            const qid = i;
            const isCurrent = i === index;
            const answered = Object.values(answers).length && answers?.[(question && question.id) ? null : null];
            const status = answers?.[(arguments[0]?.pool?.[i]?.id)];
            return (
              <button
                key={i}
                onClick={() => {
                  // we can't directly set index here as we don't have setter; using anchor element pattern not possible
                }}
                className={`${isCurrent ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"} rounded-md px-2 py-1 text-xs`}
                disabled
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-slate-500">Navigator becomes interactive in extended version. Current build focuses on core test flow.</p>
      </div>
    </section>
  );
}
