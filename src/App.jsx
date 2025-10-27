import { useMemo, useState, useEffect } from "react";
import Header from "./components/Header";
import TestControls from "./components/TestControls";
import QuestionPanel from "./components/QuestionPanel";
import ResultSummary from "./components/ResultSummary";
import { QUESTIONS } from "./data/questions";

export default function App() {
  const [exam, setExam] = useState("JEE");
  const [subject, setSubject] = useState("Physics");
  const [numQuestions, setNumQuestions] = useState(10);
  const [duration, setDuration] = useState(15); // minutes

  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // {questionId: optionIndex}
  const [timeLeft, setTimeLeft] = useState(0); // seconds

  const pool = useMemo(() => {
    const filtered = QUESTIONS.filter(q => q.exam === exam && q.subject === subject);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(numQuestions, shuffled.length));
  }, [exam, subject, numQuestions]);

  // Start test
  const handleStart = () => {
    setAnswers({});
    setCurrentIdx(0);
    setSubmitted(false);
    setStarted(true);
    setTimeLeft(duration * 60);
  };

  // Timer
  useEffect(() => {
    if (!started || submitted) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [started, submitted, timeLeft]);

  const handleSelect = (qid, optionIdx) => {
    setAnswers(prev => ({ ...prev, [qid]: optionIdx }));
  };

  const handlePrev = () => setCurrentIdx(i => Math.max(0, i - 1));
  const handleNext = () => setCurrentIdx(i => Math.min(pool.length - 1, i + 1));

  const handleSubmit = () => {
    setSubmitted(true);
    setStarted(false);
  };

  const handleRestart = () => {
    setStarted(false);
    setSubmitted(false);
    setAnswers({});
    setCurrentIdx(0);
    setTimeLeft(0);
  };

  const scoring = useMemo(() => {
    if (!submitted) return null;
    let score = 0;
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    const detail = pool.map(q => {
      const chosen = answers[q.id];
      const isCorrect = chosen === q.answerIndex;
      if (chosen === undefined) {
        unanswered += 1;
      } else if (isCorrect) {
        score += q.marks;
        correct += 1;
      } else {
        score += q.negative;
        incorrect += 1;
      }
      return {
        id: q.id,
        question: q.question,
        options: q.options,
        chosen,
        correctIndex: q.answerIndex,
        marks: q.marks,
        negative: q.negative,
        explanation: q.explanation,
      };
    });

    const maxScore = pool.reduce((s, q) => s + q.marks, 0);

    return { score, correct, incorrect, unanswered, total: pool.length, maxScore, detail };
  }, [submitted, pool, answers]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <Header started={started} timeLeft={timeLeft} onReset={handleRestart} />

      <main className="mx-auto max-w-5xl px-4 pb-24">
        {!started && !submitted && (
          <TestControls
            exam={exam}
            setExam={setExam}
            subject={subject}
            setSubject={setSubject}
            numQuestions={numQuestions}
            setNumQuestions={setNumQuestions}
            duration={duration}
            setDuration={setDuration}
            onStart={handleStart}
            availableCounts={{
              JEE: {
                Physics: QUESTIONS.filter(q => q.exam === "JEE" && q.subject === "Physics").length,
                Chemistry: QUESTIONS.filter(q => q.exam === "JEE" && q.subject === "Chemistry").length,
                Mathematics: QUESTIONS.filter(q => q.exam === "JEE" && q.subject === "Mathematics").length,
              },
              NEET: {
                Physics: QUESTIONS.filter(q => q.exam === "NEET" && q.subject === "Physics").length,
                Chemistry: QUESTIONS.filter(q => q.exam === "NEET" && q.subject === "Chemistry").length,
                Biology: QUESTIONS.filter(q => q.exam === "NEET" && q.subject === "Biology").length,
              }
            }}
          />
        )}

        {started && !submitted && pool.length > 0 && (
          <QuestionPanel
            exam={exam}
            subject={subject}
            index={currentIdx}
            total={pool.length}
            question={pool[currentIdx]}
            selected={answers[pool[currentIdx].id]}
            onSelect={handleSelect}
            onPrev={handlePrev}
            onNext={handleNext}
            onSubmit={handleSubmit}
            answers={answers}
          />
        )}

        {submitted && scoring && (
          <ResultSummary
            exam={exam}
            subject={subject}
            result={scoring}
            onRestart={handleRestart}
          />
        )}

        {started && pool.length === 0 && (
          <div className="mt-10 rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-slate-700">No questions available for the selected exam and subject.</p>
          </div>
        )}
      </main>
    </div>
  );
}
