import { BookOpen, Play } from "lucide-react";

const jeeSubjects = ["Physics", "Chemistry", "Mathematics"];
const neetSubjects = ["Physics", "Chemistry", "Biology"];

export default function TestControls({
  exam,
  setExam,
  subject,
  setSubject,
  numQuestions,
  setNumQuestions,
  duration,
  setDuration,
  onStart,
  availableCounts,
}) {
  const subjects = exam === "JEE" ? jeeSubjects : neetSubjects;

  return (
    <section className="mx-auto mt-10 max-w-3xl">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
            <BookOpen size={18} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Create your mock test</h2>
            <p className="text-sm text-slate-500">Choose exam, subject, and time. We will craft a focused practice set.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Exam</label>
            <div className="grid grid-cols-2 gap-2">
              {(["JEE", "NEET"]).map(x => (
                <button
                  key={x}
                  onClick={() => {
                    setExam(x);
                    const list = x === "JEE" ? jeeSubjects : neetSubjects;
                    if (!list.includes(subject)) setSubject(list[0]);
                  }}
                  className={`rounded-lg border px-3 py-2 text-sm ${exam === x ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "hover:bg-slate-50"}`}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <div className="grid grid-cols-3 gap-2">
              {subjects.map(s => (
                <button
                  key={s}
                  onClick={() => setSubject(s)}
                  className={`rounded-lg border px-3 py-2 text-sm ${subject === s ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "hover:bg-slate-50"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500">Available: {availableCounts?.[exam]?.[subject] ?? 0} questions</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Questions</label>
            <input
              type="range"
              min={5}
              max={30}
              value={numQuestions}
              onChange={e => setNumQuestions(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-slate-600">{numQuestions} questions</div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Duration</label>
            <select
              value={duration}
              onChange={e => setDuration(parseInt(e.target.value))}
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              {[10, 15, 20, 30, 45, 60].map(m => (
                <option key={m} value={m}>{m} minutes</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 px-4 py-2 text-white shadow hover:opacity-95"
          >
            <Play size={16} /> Start Test
          </button>
        </div>
      </div>
    </section>
  );
}
