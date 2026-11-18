"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { CourseSidebar } from "./components/course-sidebar";
import { LessonContent } from "./components/lesson-content";
import { courseModules } from "./data/course";
import {
  getCourseProgressSnapshot,
  getLessonOrder,
  getServerCourseProgressSnapshot,
  saveCourseProgress,
  subscribeToCourseProgress,
} from "./data/course-progress";

function NetworkLogo() {
  return (
    <span className="flex size-9 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
      <svg
        aria-hidden="true"
        className="size-5"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="5" r="2.25" fill="currentColor" />
        <circle cx="5" cy="18" r="2.25" fill="currentColor" />
        <circle cx="19" cy="18" r="2.25" fill="currentColor" />
        <path
          d="m10.9 6.9-4.8 9m7-9 4.8 9M7.3 18h9.4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    </span>
  );
}

export default function Home() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileSidebarMounted, setMobileSidebarMounted] = useState(false);
  const [previewAllLessons, setPreviewAllLessons] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const progressSnapshot = useSyncExternalStore(
    subscribeToCourseProgress,
    getCourseProgressSnapshot,
    getServerCourseProgressSnapshot,
  );
  const courseProgress = progressSnapshot.progress;
  const progressError = progressSnapshot.error;

  const activeModule = courseModules[activeModuleIndex];
  const activeLesson = activeModule.lessons[activeLessonIndex];
  const lessonId = `${activeModuleIndex}-${activeLessonIndex}`;
  const completedLessons = courseProgress.completedLessons;
  const activeLessonOrder = getLessonOrder(
    activeModuleIndex,
    activeLessonIndex,
  );
  const isComplete = completedLessons.includes(lessonId);
  const canRecordCompletion = activeLessonOrder <= completedLessons.length;
  const totalLessons = courseModules.reduce(
    (total, module) => total + module.lessons.length,
    0,
  );
  const unlockedLessonCount = previewAllLessons
    ? totalLessons
    : completedLessons.length;
  const progress = Math.round((completedLessons.length / totalLessons) * 100);
  const canNavigatePrevious = activeLessonOrder > 0;
  const canNavigateNext =
    activeLessonOrder < totalLessons - 1 &&
    activeLessonOrder < unlockedLessonCount;

  useEffect(() => {
    let previousScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (window.innerWidth < 1024 || currentScrollY < 80) {
        setHeaderHidden(false);
        previousScrollY = currentScrollY;
        return;
      }

      if (currentScrollY > previousScrollY + 4) {
        setHeaderHidden(true);
      } else if (currentScrollY < previousScrollY - 4) {
        setHeaderHidden(false);
      }

      previousScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mobileSidebarOpen || !mobileSidebarMounted) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timeout = window.setTimeout(
      () => setMobileSidebarMounted(false),
      prefersReducedMotion ? 0 : 800,
    );

    return () => window.clearTimeout(timeout);
  }, [mobileSidebarOpen, mobileSidebarMounted]);

  function openMobileSidebar() {
    setMobileSidebarMounted(true);
    window.requestAnimationFrame(() => setMobileSidebarOpen(true));
  }

  function selectLesson(moduleIndex: number, lessonIndex: number) {
    if (getLessonOrder(moduleIndex, lessonIndex) > unlockedLessonCount) {
      return;
    }

    setActiveModuleIndex(moduleIndex);
    setActiveLessonIndex(lessonIndex);
    setMobileSidebarOpen(false);
  }

  function toggleLessonPreview() {
    const shouldPreviewAll = !previewAllLessons;
    setPreviewAllLessons(shouldPreviewAll);

    if (!shouldPreviewAll && activeLessonOrder > completedLessons.length) {
      const lastUnlockedOrder = Math.min(
        completedLessons.length,
        totalLessons - 1,
      );
      const moduleIndex = courseModules.findIndex(
        (module, index) =>
          lastUnlockedOrder <
          getLessonOrder(index, 0) + module.lessons.length,
      );
      setActiveModuleIndex(moduleIndex);
      setActiveLessonIndex(
        lastUnlockedOrder - getLessonOrder(moduleIndex, 0),
      );
    }
  }

  function navigateLesson(direction: -1 | 1) {
    if (
      direction === 1 &&
      activeLessonOrder >= unlockedLessonCount
    ) {
      return;
    }

    const nextLessonIndex = activeLessonIndex + direction;

    if (
      nextLessonIndex >= 0 &&
      nextLessonIndex < activeModule.lessons.length
    ) {
      setActiveLessonIndex(nextLessonIndex);
      return;
    }

    const nextModuleIndex = activeModuleIndex + direction;
    if (nextModuleIndex >= 0 && nextModuleIndex < courseModules.length) {
      const nextModule = courseModules[nextModuleIndex];
      setActiveModuleIndex(nextModuleIndex);
      setActiveLessonIndex(
        direction === 1 ? 0 : nextModule.lessons.length - 1,
      );
    }
  }

  function markLessonComplete(score: number, total: number) {
    if (activeLessonOrder > completedLessons.length) {
      return;
    }

    saveCourseProgress({
      completedLessons: completedLessons.includes(lessonId)
        ? completedLessons
        : [...completedLessons, lessonId],
      examResults: {
        ...courseProgress.examResults,
        [lessonId]: { score, total },
      },
    });
  }

  function scrollToTop() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <header
        className={`sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur transition-[opacity,transform] duration-[1000ms] ease-in-out motion-reduce:transition-none sm:px-7 ${
          headerHidden
            ? "lg:pointer-events-none lg:-translate-y-full lg:opacity-0"
            : "lg:translate-y-0 lg:opacity-100"
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            aria-label="Open course menu"
            className="flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 lg:hidden"
            onClick={openMobileSidebar}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
            </svg>
          </button>
          <button
            aria-label={
              desktopSidebarOpen
                ? "Hide course sidebar"
                : "Show course sidebar"
            }
            className="hidden size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 lg:flex"
            onClick={() => setDesktopSidebarOpen((open) => !open)}
            title={
              desktopSidebarOpen
                ? "Hide course sidebar"
                : "Show course sidebar"
            }
            type="button"
          >
            <svg
              aria-hidden="true"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <rect
                x="3.75"
                y="4.75"
                width="16.5"
                height="14.5"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M9 5v14"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d={desktopSidebarOpen ? "M6.5 10 5 12l1.5 2" : "m6 10 2 2-2 2"}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </button>
          <NetworkLogo />
          <div>
            <p className="text-sm font-bold tracking-tight text-slate-950">
              Netpath
            </p>
            <p className="hidden text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500 sm:block">
              Learn networking
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 sm:gap-2.5 sm:px-4">
          <span className="size-2 rounded-full bg-emerald-500" />
          <span className="hidden sm:inline">Networking foundations</span>
          <span className="sm:hidden">Foundations</span>
          <span aria-hidden="true" className="text-slate-300">
            /
          </span>
          <span className="tabular-nums">{progress}%</span>
        </div>
      </header>

      {progressError && (
        <div
          className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900"
          role="alert"
        >
          {progressError}
        </div>
      )}

      <div className="flex min-h-[calc(100vh-68px)]">
        <div
          aria-hidden={!desktopSidebarOpen}
          className={`hidden shrink-0 overflow-hidden transition-[width,opacity] duration-[750ms] ease-in-out motion-reduce:transition-none lg:block ${
            desktopSidebarOpen ? "w-[286px] opacity-100" : "w-0 opacity-0"
          }`}
          inert={!desktopSidebarOpen}
        >
          <div className="h-full w-[286px]">
            <CourseSidebar
              activeLessonIndex={activeLessonIndex}
              activeModuleIndex={activeModuleIndex}
              completedLessons={completedLessons}
              isPreviewMode={previewAllLessons}
              onTogglePreviewMode={toggleLessonPreview}
              unlockedLessonCount={unlockedLessonCount}
              onSelectModule={(moduleIndex) =>
                selectLesson(
                  moduleIndex,
                  moduleIndex === activeModuleIndex
                    ? activeLessonIndex
                    : 0,
                )
              }
              onSelectLesson={selectLesson}
            />
          </div>
        </div>

        {mobileSidebarMounted && (
          <div
            aria-hidden={!mobileSidebarOpen}
            className={`fixed inset-0 z-40 transition-opacity duration-[750ms] ease-in-out motion-reduce:transition-none lg:hidden ${
              mobileSidebarOpen
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            inert={!mobileSidebarOpen}
          >
            <button
              aria-label="Close course menu"
              className="absolute inset-0 bg-slate-950/50"
              onClick={() => setMobileSidebarOpen(false)}
              type="button"
            />
            <div
              className={`relative h-full w-[min(88vw,340px)] shadow-2xl transition-transform duration-[750ms] ease-in-out motion-reduce:transition-none ${
                mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <CourseSidebar
                activeLessonIndex={activeLessonIndex}
                activeModuleIndex={activeModuleIndex}
                completedLessons={completedLessons}
                isPreviewMode={previewAllLessons}
                onTogglePreviewMode={toggleLessonPreview}
                unlockedLessonCount={unlockedLessonCount}
                onClose={() => setMobileSidebarOpen(false)}
                onSelectModule={(moduleIndex) =>
                  selectLesson(
                    moduleIndex,
                    moduleIndex === activeModuleIndex
                      ? activeLessonIndex
                      : 0,
                  )
                }
                onSelectLesson={selectLesson}
              />
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1 px-4 pb-12 pt-7 sm:px-7 sm:pt-9 xl:px-12">
          <div className="mx-auto max-w-[1080px]">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-medium text-slate-500">
                <span>Learning path</span>
                <span aria-hidden="true" className="mx-2 text-slate-300">
                  /
                </span>
                <span>
                  Module {String(activeModuleIndex + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="mx-2 text-slate-300">
                  /
                </span>
                <span>
                  Lesson {String(activeLessonIndex + 1).padStart(2, "0")}
                </span>
              </p>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Beginner friendly
              </span>
            </div>

            <section aria-labelledby="module-title">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
                  Module {String(activeModuleIndex + 1).padStart(2, "0")}{" "}
                  <span className="px-1 text-slate-300">/</span>{" "}
                  {courseModules.length}
                </p>
                <h1
                  className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
                  id="module-title"
                >
                  {activeModule.title}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  {activeModule.description}
                </p>
              </div>
            </section>

            <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-6">
              <LessonContent
                key={lessonId}
                canRecordCompletion={canRecordCompletion}
                canNavigateNext={canNavigateNext}
                canNavigatePrevious={canNavigatePrevious}
                isComplete={isComplete}
                lesson={activeLesson}
                lessonIndex={activeLessonIndex}
                moduleIndex={activeModuleIndex}
                moduleTitle={activeModule.title}
                onNext={() => navigateLesson(1)}
                onPrevious={() => navigateLesson(-1)}
                onComplete={markLessonComplete}
                previousExamResult={courseProgress.examResults[lessonId]}
              />
            </div>
          </div>
        </main>
      </div>

      {headerHidden && (
        <button
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-30 hidden size-12 items-center justify-center rounded-full bg-cyan-600 text-white shadow-lg shadow-cyan-950/20 transition duration-300 hover:-translate-y-1 hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700 lg:flex"
          onClick={scrollToTop}
          title="Back to top"
          type="button"
        >
          <svg
            aria-hidden="true"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 19V5m0 0L6 11m6-6 6 6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
