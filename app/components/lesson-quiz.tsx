"use client";

import Image from "next/image";
import { useState } from "react";
import type { CourseLesson } from "../data/course";
import {
  getPassingScore,
  PASSING_PERCENTAGE,
  type LessonExamResult,
} from "../data/course-progress";
import { courseModules } from "../data/course";
import {
  networkDeviceQuestions,
  type CourseIdentifyQuestion,
} from "../data/network-device-questions";
import { interfacesCableQuestions } from "../data/interfaces-cable-questions";
import { tcpIpQuestions } from "../data/tcp-ip-questions";
import { cliQuestions } from "../data/cli-questions";
import {
  arpSwitchingQuestions,
  ethernetFrameQuestions,
} from "../data/ethernet-switching-questions";
import {
  ipv4AddressPartOneQuestions,
  ipv4AddressPartTwoQuestions,
} from "../data/ipv4-address-questions";
import {
  ipv4HeaderQuestions,
  switchInterfaceQuestions,
} from "../data/interface-ipv4-header-questions";
import { routingQuestions } from "../data/routing-questions";

type FlashcardQuestion = {
  id: string;
  type: "flashcard";
  prompt: string;
  answer: string;
};

type IdentifyQuestion = CourseIdentifyQuestion;

type MultipleChoiceQuestion = {
  id: string;
  type: "multiple-choice";
  prompt: string;
  answer: string;
  options: string[];
};

type QuizQuestion =
  | FlashcardQuestion
  | IdentifyQuestion
  | MultipleChoiceQuestion;

type LessonQuizProps = {
  lesson: CourseLesson;
  canRecordCompletion: boolean;
  onComplete: (score: number, total: number) => void;
  onClose: () => void;
  previousResult?: LessonExamResult;
};

function shuffle<T>(items: T[]): T[] {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const currentItem = shuffledItems[index];
    const randomItem = shuffledItems[randomIndex];

    if (currentItem !== undefined && randomItem !== undefined) {
      shuffledItems[index] = randomItem;
      shuffledItems[randomIndex] = currentItem;
    }
  }

  return shuffledItems;
}

function normalizeAnswer(answer: string): string {
  return answer.trim().toLocaleLowerCase().replace(/\s+/g, " ");
}

function isIdentifyAnswerCorrect(
  question: IdentifyQuestion,
  response: string,
): boolean {
  const normalizedResponse = normalizeAnswer(response);
  return [question.answer, ...(question.acceptedAnswers ?? [])].some(
    (answer) => normalizeAnswer(answer) === normalizedResponse,
  );
}

function createQuestions(lesson: CourseLesson): QuizQuestion[] {
  if (lesson.title === "Network devices") {
    return shuffle(networkDeviceQuestions);
  }

  if (lesson.title === "Interfaces and cables") {
    return shuffle(interfacesCableQuestions);
  }

  if (lesson.title === "TCP/IP and encapsulation") {
    return shuffle(tcpIpQuestions);
  }

  if (lesson.title === "Intro to the CLI") {
    return shuffle(cliQuestions);
  }

  if (lesson.title === "Ethernet LAN Switching") {
    return shuffle([...ethernetFrameQuestions, ...arpSwitchingQuestions]);
  }

  if (lesson.title === "IPv4 Addressing") {
    return shuffle([
      ...ipv4AddressPartOneQuestions,
      ...ipv4AddressPartTwoQuestions,
    ]);
  }

  if (lesson.title === "Switch Interfaces") {
    return shuffle(switchInterfaceQuestions);
  }

  if (lesson.title === "IPv4 Header") {
    return shuffle(ipv4HeaderQuestions);
  }

  if (lesson.title === "Routing Fundamentals and Static Routes") {
    return shuffle(routingQuestions);
  }

  const otherLessons = courseModules
    .flatMap((module) => module.lessons)
    .filter((otherLesson) => otherLesson.title !== lesson.title);
  const termDistractors = shuffle(
    Array.from(
      new Set(
        otherLessons
          .map((otherLesson) => otherLesson.term)
          .filter((term) => term !== lesson.term),
      ),
    ),
  ).slice(0, 3);
  const conceptDistractors = shuffle(
    Array.from(
      new Set(
        otherLessons
          .map((otherLesson) => otherLesson.keyConcept)
          .filter((concept) => concept !== lesson.keyConcept),
      ),
    ),
  ).slice(0, 3);

  const standardQuestions: QuizQuestion[] = [
    {
      id: "identify-term",
      type: "identify",
      prompt: `What networking term matches this definition?\n\n${lesson.definition}`,
      answer: lesson.term,
    },
    {
      id: "recall-concept",
      type: "flashcard",
      prompt: `Recall the key idea for: ${lesson.title}`,
      answer: lesson.keyConcept,
    },
    {
      id: "choose-term",
      type: "multiple-choice",
      prompt: `Which term is described by this definition?\n\n${lesson.definition}`,
      answer: lesson.term,
      options: shuffle([lesson.term, ...termDistractors]),
    },
    {
      id: "choose-concept",
      type: "multiple-choice",
      prompt: `Which statement best describes ${lesson.title}?`,
      answer: lesson.keyConcept,
      options: shuffle([lesson.keyConcept, ...conceptDistractors]),
    },
  ];

  return shuffle(standardQuestions);
}

export function LessonQuiz({
  lesson,
  canRecordCompletion,
  onComplete,
  onClose,
  previousResult,
}: LessonQuizProps) {
  const [questions, setQuestions] = useState(() => createQuestions(lesson));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [identifyAnswer, setIdentifyAnswer] = useState("");
  const [identifySubmitted, setIdentifySubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [choiceSubmitted, setChoiceSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const passingScore = getPassingScore(questions.length);
  const passed = score >= passingScore;
  const identifyAnswerIsCorrect =
    currentQuestion?.type === "identify" &&
    isIdentifyAnswerCorrect(currentQuestion, identifyAnswer);

  function recordAnswer(wasCorrect: boolean) {
    const finalScore = score + Number(wasCorrect);
    setScore(finalScore);

    if (currentQuestionIndex === questions.length - 1) {
      setFinished(true);
      if (finalScore >= passingScore) {
        onComplete(finalScore, questions.length);
      }
      return;
    }

    setCurrentQuestionIndex((index) => index + 1);
    setAnswerRevealed(false);
    setIdentifyAnswer("");
    setIdentifySubmitted(false);
    setSelectedOption(null);
    setChoiceSubmitted(false);
  }

  function restartQuiz() {
    setQuestions(createQuestions(lesson));
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswerRevealed(false);
    setIdentifyAnswer("");
    setIdentifySubmitted(false);
    setSelectedOption(null);
    setChoiceSubmitted(false);
    setFinished(false);
  }

  return (
    <section
      aria-label="Lesson exam"
      className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-cyan-700">
            Anki-inspired review
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">
            Lesson exam
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Score {passingScore} of {questions.length} correct (
            {PASSING_PERCENTAGE}% minimum) to unlock the next lesson.
          </p>
          {previousResult && (
            <p className="mt-1 text-xs text-emerald-700">
              Saved passing score: {previousResult.score} /{" "}
              {previousResult.total}
            </p>
          )}
        </div>
        <button
          aria-label="Close lesson exam"
          className="rounded-lg p-2 text-slate-500 transition hover:bg-white hover:text-slate-800"
          onClick={onClose}
          type="button"
        >
          <span aria-hidden="true" className="text-xl leading-none">
            ×
          </span>
        </button>
      </div>

      {finished ? (
        <div className="mt-5 rounded-xl bg-white p-5 text-center">
          <p
            className={`text-2xl font-semibold ${
              passed ? "text-emerald-700" : "text-slate-900"
            }`}
          >
            {score} / {questions.length}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {passed
              ? canRecordCompletion
                ? "You passed the 90% requirement and this lesson is complete."
                : "You passed this preview exam. Complete lessons in order to save your course progress."
              : `You need at least ${passingScore} of ${questions.length} correct to pass (90%). Review the answers and try again.`}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {!passed && (
              <button
                className="rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
                onClick={restartQuiz}
                type="button"
              >
                Try again
              </button>
            )}
            <button
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              onClick={onClose}
              type="button"
            >
              Close exam
            </button>
          </div>
        </div>
      ) : currentQuestion ? (
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span>
              {currentQuestion.type === "identify"
                ? "Identify"
                : currentQuestion.type === "flashcard"
                  ? "Flashcard"
                  : "Multiple choice"}
            </span>
          </div>
          <div
            aria-label={`Question ${currentQuestionIndex + 1} of ${questions.length}`}
            aria-valuemax={questions.length}
            aria-valuemin={0}
            aria-valuenow={currentQuestionIndex + 1}
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
          >
            <div
              className="h-full rounded-full bg-cyan-500 transition-[width]"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          {currentQuestion.type === "flashcard" ? (
            <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
              <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
                {currentQuestion.prompt}
              </p>
              {answerRevealed ? (
                <>
                  <div className="mt-4 rounded-lg bg-cyan-50 p-4 text-sm leading-6 text-cyan-950">
                    {currentQuestion.answer}
                  </div>
                  <p className="mt-4 text-xs font-medium text-slate-500">
                    Could you recall it before revealing the answer?
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      onClick={() => recordAnswer(true)}
                      type="button"
                    >
                      I knew it
                    </button>
                    <button
                      className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      onClick={() => recordAnswer(false)}
                      type="button"
                    >
                      Need to review
                    </button>
                  </div>
                </>
              ) : (
                <button
                  className="mt-4 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
                  onClick={() => setAnswerRevealed(true)}
                  type="button"
                >
                  Show answer
                </button>
              )}
            </div>
          ) : currentQuestion.type === "identify" ? (
            <form
              className="mt-5 rounded-xl border border-slate-200 bg-white p-5"
              onSubmit={(event) => {
                event.preventDefault();
                if (!identifyAnswer.trim()) {
                  return;
                }
                setIdentifySubmitted(true);
              }}
            >
              <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
                {currentQuestion.prompt}
              </p>
              {currentQuestion.image && (
                <div className="relative mt-4 h-48 w-full overflow-hidden rounded-xl bg-slate-50">
                  <Image
                    alt={currentQuestion.image.alt}
                    className="object-contain"
                    fill
                    sizes="(max-width: 640px) 100vw, 720px"
                    src={currentQuestion.image.src}
                  />
                </div>
              )}
              <label
                className="mt-4 block text-sm font-medium text-slate-800"
                htmlFor={`identify-answer-${currentQuestion.id}`}
              >
                Your answer
              </label>
              <input
                autoComplete="off"
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 disabled:bg-slate-50"
                disabled={identifySubmitted}
                id={`identify-answer-${currentQuestion.id}`}
                onChange={(event) => setIdentifyAnswer(event.target.value)}
                placeholder="Type your answer"
                required
                spellCheck={false}
                type="text"
                value={identifyAnswer}
              />
              {identifySubmitted && (
                <p
                  aria-live="polite"
                  className={`mt-3 text-sm font-medium ${
                    identifyAnswerIsCorrect
                      ? "text-emerald-700"
                      : "text-rose-700"
                  }`}
                >
                  {identifyAnswerIsCorrect
                    ? "Correct!"
                    : `Not quite. The answer is: ${currentQuestion.answer}`}
                </p>
              )}
              {identifySubmitted ? (
                <button
                  className="mt-4 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
                  onClick={() => recordAnswer(identifyAnswerIsCorrect)}
                  type="button"
                >
                  {currentQuestionIndex === questions.length - 1
                    ? "Finish exam"
                    : "Next question"}
                </button>
              ) : (
                <button
                  className="mt-4 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={!identifyAnswer.trim()}
                  type="submit"
                >
                  Check answer
                </button>
              )}
            </form>
          ) : (
            <fieldset className="mt-5">
              <legend className="text-sm font-medium leading-6 text-slate-800">
                {currentQuestion.prompt}
              </legend>
              <div className="mt-3 space-y-2">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedOption === option;
                  const isCorrect = option === currentQuestion.answer;
                  const optionStyle = choiceSubmitted
                    ? isCorrect
                      ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                      : isSelected
                        ? "border-rose-300 bg-rose-50 text-rose-900"
                        : "border-slate-200 bg-white text-slate-500"
                    : isSelected
                      ? "border-cyan-400 bg-cyan-50 text-slate-900"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300";

                  return (
                    <label
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm leading-5 transition ${optionStyle}`}
                      key={option}
                    >
                      <input
                        checked={isSelected}
                        className="mt-1 accent-cyan-600"
                        disabled={choiceSubmitted}
                        name="lesson-quiz-answer"
                        onChange={() => setSelectedOption(option)}
                        type="radio"
                        value={option}
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
              {choiceSubmitted && (
                <p
                  aria-live="polite"
                  className={`mt-3 text-sm font-medium ${
                    selectedOption === currentQuestion.answer
                      ? "text-emerald-700"
                      : "text-rose-700"
                  }`}
                >
                  {selectedOption === currentQuestion.answer
                    ? "Correct!"
                    : `Not quite. The correct answer is: ${currentQuestion.answer}`}
                </p>
              )}
              {choiceSubmitted ? (
                <button
                  className="mt-4 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
                  onClick={() =>
                    recordAnswer(selectedOption === currentQuestion.answer)
                  }
                  type="button"
                >
                  {currentQuestionIndex === questions.length - 1
                    ? "Finish exam"
                    : "Next question"}
                </button>
              ) : (
                <button
                  className="mt-4 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={selectedOption === null}
                  onClick={() => setChoiceSubmitted(true)}
                  type="button"
                >
                  Check answer
                </button>
              )}
            </fieldset>
          )}
        </div>
      ) : null}
    </section>
  );
}
