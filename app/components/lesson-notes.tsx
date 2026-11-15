import type { LessonNotes as LessonNotesData } from "../data/course";

type LessonNotesProps = {
  notes: LessonNotesData;
};

export function LessonNotes({ notes }: LessonNotesProps) {
  const layers = notes.layers;

  return (
    <section
      aria-labelledby="detailed-notes-title"
      className="mt-8 border-t border-slate-100 pt-7"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-cyan-700">
        Detailed notes
      </p>
      <h3
        className="mt-2 text-xl font-semibold tracking-tight text-slate-950"
        id="detailed-notes-title"
      >
        {notes.heading ?? "TCP/IP model"}
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        {notes.introduction}
      </p>

      {layers && (
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          {layers.map((layer, index) => (
            <li
              className={`rounded-xl border border-slate-200 bg-slate-50 p-4 ${
                index === layers.length - 1 ? "sm:col-span-2" : ""
              }`}
              key={layer.name}
            >
              <div className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-xs font-bold text-cyan-800">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-slate-900">
                    {layer.name} layer
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {layer.responsibility}
                  </p>
                  <dl className="mt-3 grid gap-x-4 gap-y-2 text-xs sm:grid-cols-2">
                    <div>
                      <dt className="font-semibold uppercase tracking-wide text-slate-400">
                        Examples
                      </dt>
                      <dd className="mt-1 text-slate-700">
                        {layer.examples}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold uppercase tracking-wide text-slate-400">
                        Data unit
                      </dt>
                      <dd className="mt-1 text-slate-700">
                        {layer.dataUnit}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}

      <div className="mt-6 space-y-5">
        {notes.sections.map((section) => (
          <section aria-labelledby={`notes-${section.title}`} key={section.title}>
            <h4
              className="text-sm font-semibold text-slate-900"
              id={`notes-${section.title}`}
            >
              {section.title}
            </h4>
            <div className="mt-2 space-y-2">
              {section.paragraphs.map((paragraph) => (
                <p
                  className="text-sm leading-6 text-slate-600"
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {section.points && (
              <ul className="mt-3 space-y-2">
                {section.points.map((point) => (
                  <li
                    className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                    key={point}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-500"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
      {notes.reference && (
        <a
          className="mt-6 inline-flex text-sm font-medium text-cyan-700 underline decoration-cyan-300 underline-offset-4 transition hover:text-cyan-900"
          href={notes.reference.url}
          rel="noreferrer"
          target="_blank"
        >
          Watch reference: {notes.reference.label}
        </a>
      )}
    </section>
  );
}
