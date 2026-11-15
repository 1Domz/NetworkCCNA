"use client";

import { courseModules } from "../data/course";

type CourseSidebarProps = {
  activeModuleIndex: number;
  activeLessonIndex: number;
  completedLessons: string[];
  onSelectModule: (moduleIndex: number) => void;
  onSelectLesson: (moduleIndex: number, lessonIndex: number) => void;
  onClose?: () => void;
};

const referenceUrl = "https://www.youtube.com/@JeremysITLab/playlists";

export function CourseSidebar({
  activeModuleIndex,
  activeLessonIndex,
  completedLessons,
  onSelectModule,
  onSelectLesson,
  onClose,
}: CourseSidebarProps) {
  const totalLessons = courseModules.reduce(
    (total, module) => total + module.lessons.length,
    0,
  );
  const completedCount = completedLessons.length;
  const progress = Math.round((completedCount / totalLessons) * 100);

  return (
    <aside className="flex h-full flex-col bg-[#101b2d] text-slate-300">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 lg:hidden">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Modules & lessons
        </span>
        <button
          aria-label="Close course menu"
          className="rounded-lg p-2 text-slate-300 hover:bg-white/10"
          onClick={onClose}
          type="button"
        >
          <span aria-hidden="true" className="text-xl leading-none">
            ×
          </span>
        </button>
      </div>

      <div className="hidden px-6 pb-3 pt-7 lg:block">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Your curriculum
        </p>
        <h2 className="mt-2 text-sm font-semibold text-white">
          Networking foundations
        </h2>
      </div>

      <nav
        aria-label="Course modules and lessons"
        className="flex-1 overflow-y-auto px-3 py-4 lg:py-2"
      >
        <ol className="space-y-1">
          {courseModules.map((module, moduleIndex) => {
            const moduleCompleteCount = module.lessons.filter(
              (_, lessonIndex) =>
                completedLessons.includes(`${moduleIndex}-${lessonIndex}`),
            ).length;
            const isActive = moduleIndex === activeModuleIndex;

            return (
              <li key={module.title}>
                <button
                  aria-expanded={isActive}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                    isActive
                      ? "bg-cyan-400/10 text-white ring-1 ring-inset ring-cyan-300/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                  }`}
                  onClick={() => onSelectModule(moduleIndex)}
                  type="button"
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                      isActive
                        ? "bg-cyan-300 text-slate-950"
                        : "bg-white/[0.07] text-slate-400 group-hover:text-white"
                    }`}
                  >
                    {String(moduleIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-medium leading-5">
                      {module.title}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-slate-500">
                      {moduleCompleteCount}/{module.lessons.length} lessons
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`text-xs text-slate-500 transition-transform ${
                      isActive ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>

                {isActive && (
                  <ol className="ml-7 mt-1 space-y-0.5 border-l border-white/10 pb-2 pl-3">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isSelected = lessonIndex === activeLessonIndex;
                      const isComplete = completedLessons.includes(
                        `${moduleIndex}-${lessonIndex}`,
                      );

                      return (
                        <li key={lesson.title}>
                          <button
                            aria-current={isSelected ? "step" : undefined}
                            className={`flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left text-xs leading-5 transition ${
                              isSelected
                                ? "bg-white/[0.08] font-medium text-cyan-200"
                                : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"
                            }`}
                            onClick={() =>
                              onSelectLesson(moduleIndex, lessonIndex)
                            }
                            type="button"
                          >
                            <span
                              className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[9px] ${
                                isComplete
                                  ? "bg-emerald-400/15 text-emerald-300"
                                  : isSelected
                                    ? "bg-cyan-300/15 text-cyan-200"
                                    : "bg-white/[0.06] text-slate-500"
                              }`}
                            >
                              {isComplete ? "✓" : lessonIndex + 1}
                            </span>
                            <span>{lesson.title}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="space-y-4 border-t border-white/10 p-5">
        <a
          className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 px-3 py-3 transition hover:border-cyan-300/30 hover:bg-white/[0.04]"
          href={referenceUrl}
          rel="noreferrer"
          target="_blank"
        >
          <span>
            <span className="block text-[11px] font-semibold text-slate-200">
              Video reference
            </span>
            <span className="mt-1 block text-[11px] text-slate-500">
              Jeremy&apos;s IT Lab on YouTube
            </span>
          </span>
          <span
            aria-hidden="true"
            className="text-sm text-cyan-300 transition-transform group-hover:translate-x-0.5"
          >
            ↗
          </span>
        </a>

        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-300">Course progress</span>
            <span className="tabular-nums text-slate-400">{progress}%</span>
          </div>
          <div
            aria-label={`${progress}% of lessons completed`}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={progress}
            className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"
            role="progressbar"
          >
            <div
              className="h-full rounded-full bg-cyan-300 transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            {completedCount} of {totalLessons} lessons completed
          </p>
        </div>
      </div>
    </aside>
  );
}
