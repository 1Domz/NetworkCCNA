"use client";

import { useState } from "react";
import type { CourseLesson } from "../data/course";
import type { LessonExamResult } from "../data/course-progress";
import { LessonQuiz } from "./lesson-quiz";
import { LessonNotes } from "./lesson-notes";

type LessonContentProps = {
  moduleTitle: string;
  moduleIndex: number;
  lessonIndex: number;
  lesson: CourseLesson;
  isComplete: boolean;
  canRecordCompletion: boolean;
  canNavigatePrevious: boolean;
  canNavigateNext: boolean;
  previousExamResult?: LessonExamResult;
  onComplete: (score: number, total: number) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function LessonContent({
  moduleTitle,
  moduleIndex,
  lessonIndex,
  lesson,
  isComplete,
  canRecordCompletion,
  canNavigatePrevious,
  canNavigateNext,
  previousExamResult,
  onComplete,
  onPrevious,
  onNext,
}: LessonContentProps) {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      <article className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_-20px_rgba(15,23,42,0.22)] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.17em] text-cyan-700">
            Lesson {String(lessonIndex + 1).padStart(2, "0")} of 04
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <svg
              aria-hidden="true"
              className="size-4"
              fill="none"
              viewBox="0 0 20 20"
            >
              <circle
                cx="10"
                cy="10"
                r="7.25"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M10 6v4l2.5 1.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
            {lesson.duration}
          </span>
        </div>

        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 sm:text-[30px]">
          {lesson.title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
          {lesson.summary}
        </p>

        <div className="relative mt-7 overflow-hidden rounded-2xl bg-[#101b2d] p-5 text-white sm:p-6">
          <div
            aria-hidden="true"
            className="absolute -right-8 -top-12 size-44 rounded-full border border-cyan-200/10"
          />
          <div
            aria-hidden="true"
            className="absolute -right-2 -top-6 size-32 rounded-full border border-cyan-200/10"
          />
          <div className="relative flex items-start gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300/15 text-cyan-200">
              <svg
                aria-hidden="true"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 3.75 14.4 9.6l5.85 2.4-5.85 2.4L12 20.25 9.6 14.4 3.75 12 9.6 9.6 12 3.75Z"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </span>
            <div className="relative">
              <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-cyan-200">
                The key idea
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                {lesson.keyConcept}
              </p>
            </div>
          </div>
        </div>

        <section className="mt-8" aria-labelledby="learning-goals">
          <h3
            className="text-base font-semibold text-slate-900"
            id="learning-goals"
          >
            What you&apos;ll learn
          </h3>
          <ul className="mt-4 space-y-3">
            {lesson.objectives.map((objective) => (
              <li
                className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                key={objective}
              >
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <svg
                    aria-hidden="true"
                    className="size-3"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="m3.5 8.2 2.8 2.7 6.2-6"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.7"
                    />
                  </svg>
                </span>
                {objective}
              </li>
            ))}
          </ul>
        </section>

        {lesson.notes && <LessonNotes notes={lesson.notes} />}

        <section className="mt-8 rounded-xl border border-cyan-100 bg-cyan-50/70 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-lg">
              <p className="text-sm font-semibold text-slate-900">
                {isComplete
                  ? "Lesson passed"
                  : canRecordCompletion
                    ? "Unlock the next lesson"
                    : "Preview this lesson"}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {isComplete
                  ? "You passed this lesson exam. Review it any time."
                  : canRecordCompletion
                    ? "Score at least 90% on the exam to unlock the next lesson."
                    : "Complete lessons in order to save your course progress."}
              </p>
            </div>
            <button
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                isComplete
                  ? "border border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50"
                  : "bg-cyan-600 text-white shadow-sm hover:bg-cyan-700"
              }`}
              onClick={() => setQuizOpen((open) => !open)}
              type="button"
            >
              {quizOpen
                ? "Hide exam"
                : isComplete
                  ? "Review exam"
                  : "Start lesson exam"}
            </button>
          </div>
        </section>

        {quizOpen && (
          <LessonQuiz
            key={`${moduleIndex}-${lessonIndex}`}
            lesson={lesson}
            canRecordCompletion={canRecordCompletion}
            onClose={() => setQuizOpen(false)}
            onComplete={onComplete}
            previousResult={previousExamResult}
          />
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
          <span
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
              isComplete
                ? "bg-emerald-50 text-emerald-800"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {isComplete ? "Passed ✓" : "Exam required to unlock next lesson"}
          </span>
          <div className="flex gap-2">
            <button
              aria-label="Previous lesson"
              className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!canNavigatePrevious}
              onClick={onPrevious}
              type="button"
            >
              Previous
            </button>
            <button
              aria-label="Next lesson"
              className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!canNavigateNext}
              onClick={onNext}
              type="button"
            >
              Next
              <span aria-hidden="true" className="ml-1.5">
                →
              </span>
            </button>
          </div>
        </div>
      </article>

      <aside className="space-y-4">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_-20px_rgba(15,23,42,0.18)]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-slate-900">
              Key vocabulary
            </h2>
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
              Remember
            </span>
          </div>
          <p className="mt-5 text-lg font-semibold tracking-tight text-slate-900">
            {lesson.term}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {lesson.definition}
          </p>
        </section>

        <section className="rounded-2xl border border-cyan-100 bg-cyan-50/70 p-5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-white text-cyan-700 shadow-sm">
            <svg
              aria-hidden="true"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 3.5v3m0 11v3m8.5-8.5h-3m-11 0h-3m14.01-6.01-2.12 2.12m-7.78 7.78-2.12 2.12m12.02 0-2.12-2.12m-7.78-7.78L6.49 6.49"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
              <circle
                cx="12"
                cy="12"
                r="4"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-sm font-semibold text-slate-900">
            Study tip
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Try explaining the key idea in your own words. If you can teach it
            simply, you&apos;re building a strong foundation.
          </p>
        </section>

        <p className="px-1 text-xs leading-5 text-slate-400">
          {moduleTitle} is part of an independent study outline inspired by
          common CCNA networking topics. It is not affiliated with Jeremy&apos;s
          IT Lab.
        </p>
        <p className="sr-only">
          Module {moduleIndex + 1}, lesson {lessonIndex + 1}
        </p>
      </aside>
    </>
  );
}
