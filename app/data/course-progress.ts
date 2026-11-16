import { courseModules } from "./course";
import { interfacesCableQuestions } from "./interfaces-cable-questions";
import { tcpIpQuestions } from "./tcp-ip-questions";
import { cliQuestions } from "./cli-questions";
import {
  arpSwitchingQuestions,
  ethernetFrameQuestions,
} from "./ethernet-switching-questions";
import {
  ipv4AddressPartOneQuestions,
  ipv4AddressPartTwoQuestions,
} from "./ipv4-address-questions";
import {
  ipv4HeaderQuestions,
  switchInterfaceQuestions,
} from "./interface-ipv4-header-questions";
import { routingQuestions } from "./routing-questions";

export const COURSE_PROGRESS_STORAGE_KEY = "netpath-course-progress-v1";
export const PASSING_PERCENTAGE = 90;

export type LessonExamResult = {
  score: number;
  total: number;
};

export type SavedCourseProgress = {
  completedLessons: string[];
  examResults: Record<string, LessonExamResult>;
};

export type CourseProgressSnapshot = {
  progress: SavedCourseProgress;
  error: string | null;
};

const allLessonIds = courseModules.flatMap((module, moduleIndex) =>
  module.lessons.map((_, lessonIndex) => `${moduleIndex}-${lessonIndex}`),
);
const allLessonIdSet = new Set(allLessonIds);
const changedExamQuestionCounts: Record<string, number> = {
  "0-1": interfacesCableQuestions.length,
  "0-2": tcpIpQuestions.length,
  "0-3": cliQuestions.length,
  "1-0": ethernetFrameQuestions.length + arpSwitchingQuestions.length,
  "1-1":
    ipv4AddressPartOneQuestions.length + ipv4AddressPartTwoQuestions.length,
  "1-2": switchInterfaceQuestions.length,
  "1-3": ipv4HeaderQuestions.length,
  "2-0": routingQuestions.length,
};
const emptyCourseProgress: SavedCourseProgress = {
  completedLessons: [],
  examResults: {},
};
const emptySnapshot: CourseProgressSnapshot = {
  progress: emptyCourseProgress,
  error: null,
};
const listeners = new Set<() => void>();
let cachedSnapshot: CourseProgressSnapshot | null = null;

export function getPassingScore(total: number): number {
  return Math.ceil((total * PASSING_PERCENTAGE) / 100);
}

export function getLessonOrder(
  moduleIndex: number,
  lessonIndex: number,
): number {
  return (
    courseModules
      .slice(0, moduleIndex)
      .reduce((count, module) => count + module.lessons.length, 0) +
    lessonIndex
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isLessonExamResult(value: unknown): value is LessonExamResult {
  if (!isRecord(value)) {
    return false;
  }

  const { score, total } = value;
  return (
    typeof score === "number" &&
    Number.isInteger(score) &&
    typeof total === "number" &&
    Number.isInteger(total) &&
    total > 0 &&
    score >= getPassingScore(total) &&
    score <= total
  );
}

export function isSavedCourseProgress(
  value: unknown,
): value is SavedCourseProgress {
  if (!isRecord(value)) {
    return false;
  }

  const { completedLessons, examResults } = value;
  if (!Array.isArray(completedLessons) || !isRecord(examResults)) {
    return false;
  }

  const completedValues: unknown[] = completedLessons;
  const validCompletedLessons = completedValues.filter(
    (lessonId): lessonId is string =>
      typeof lessonId === "string" && allLessonIdSet.has(lessonId),
  );
  if (validCompletedLessons.length !== completedValues.length) {
    return false;
  }

  if (
    new Set(validCompletedLessons).size !== validCompletedLessons.length ||
    validCompletedLessons.some(
      (lessonId, index) => lessonId !== allLessonIds[index],
    )
  ) {
    return false;
  }

  const examResultIds = Object.keys(examResults);
  return (
    examResultIds.length === validCompletedLessons.length &&
    validCompletedLessons.every((lessonId) =>
      isLessonExamResult(examResults[lessonId]),
    )
  );
}

function readStoredProgress(): CourseProgressSnapshot {
  if (typeof window === "undefined") {
    return emptySnapshot;
  }

  let serializedProgress: string | null;
  try {
    serializedProgress = window.localStorage.getItem(
      COURSE_PROGRESS_STORAGE_KEY,
    );
  } catch (error) {
    if (!(error instanceof DOMException)) {
      throw error;
    }

    return {
      progress: emptyCourseProgress,
      error:
        "This browser blocked local storage. Progress will only last for this session.",
    };
  }

  if (serializedProgress === null) {
    return emptySnapshot;
  }

  let parsedProgress: unknown;
  try {
    parsedProgress = JSON.parse(serializedProgress);
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      throw error;
    }

    return {
      progress: emptyCourseProgress,
      error:
        "Saved progress could not be read. Clear this site's saved data to start fresh.",
    };
  }

  if (!isSavedCourseProgress(parsedProgress)) {
    return {
      progress: emptyCourseProgress,
      error:
        "Saved progress has an invalid format. Clear this site's saved data to start fresh.",
    };
  }

  const changedLessonId = allLessonIds.find((lessonId) => {
    const expectedQuestionCount = changedExamQuestionCounts[lessonId];
    const examResult = parsedProgress.examResults[lessonId];
    return (
      expectedQuestionCount !== undefined &&
      examResult !== undefined &&
      examResult.total !== expectedQuestionCount
    );
  });

  if (changedLessonId !== undefined) {
    const changedLessonOrder = allLessonIds.indexOf(changedLessonId);
    const completedLessons = parsedProgress.completedLessons.filter(
      (lessonId) => allLessonIds.indexOf(lessonId) < changedLessonOrder,
    );
    const examResults: Record<string, LessonExamResult> = {};

    for (const lessonId of completedLessons) {
      const examResult = parsedProgress.examResults[lessonId];
      if (!examResult) {
        throw new Error(`Missing saved exam result for lesson ${lessonId}.`);
      }
      examResults[lessonId] = examResult;
    }

    const migratedProgress = { completedLessons, examResults };
    let migrationError =
      "A lesson exam changed, so its saved result and later lesson progress were reset. Pass the updated exam to unlock those lessons.";

    try {
      window.localStorage.setItem(
        COURSE_PROGRESS_STORAGE_KEY,
        JSON.stringify(migratedProgress),
      );
    } catch (storageError) {
      if (!(storageError instanceof DOMException)) {
        throw storageError;
      }

      migrationError +=
        " The browser could not save this update, so the reset may not persist after reloading.";
    }

    return { progress: migratedProgress, error: migrationError };
  }

  return { progress: parsedProgress, error: null };
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function handleStorageChange(event: StorageEvent) {
  if (
    event.key !== COURSE_PROGRESS_STORAGE_KEY &&
    event.key !== null
  ) {
    return;
  }

  cachedSnapshot = readStoredProgress();
  notifyListeners();
}

export function getCourseProgressSnapshot(): CourseProgressSnapshot {
  if (cachedSnapshot === null) {
    cachedSnapshot = readStoredProgress();
  }

  return cachedSnapshot;
}

export function getServerCourseProgressSnapshot(): CourseProgressSnapshot {
  return emptySnapshot;
}

export function subscribeToCourseProgress(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", handleStorageChange);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorageChange);
  };
}

export function saveCourseProgress(progress: SavedCourseProgress): void {
  if (!isSavedCourseProgress(progress)) {
    throw new Error("Refusing to save invalid course progress.");
  }

  let error: string | null = null;
  try {
    window.localStorage.setItem(
      COURSE_PROGRESS_STORAGE_KEY,
      JSON.stringify(progress),
    );
  } catch (storageError) {
    if (!(storageError instanceof DOMException)) {
      throw storageError;
    }

    error =
      "Browser storage could not save progress. Your current progress may not persist.";
  }

  cachedSnapshot = { progress, error };
  notifyListeners();
}
