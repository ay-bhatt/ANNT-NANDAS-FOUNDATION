import { TALENT_HUNT_AGE_LABEL, TALENT_HUNT_PROGRAM } from "@/lib/registration/constants";

const program = TALENT_HUNT_PROGRAM;

export default function TalentHuntProgramInfo() {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-4 pb-10 pt-8 text-white sm:px-6 sm:pb-12 sm:pt-12 lg:pt-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.18),transparent_42%),radial-gradient(ellipse_at_bottom_right,rgba(37,99,235,0.22),transparent_46%)]" />
      <div className="container-premium relative">
        <p className="section-label-dark">{program.mottoEnglish}</p>
        <p className="mb-3 text-sm font-medium text-emerald-200">{program.mottoHindi}</p>
        <h1 className="display-title-dark text-3xl sm:text-5xl">{program.englishName}</h1>
        <p className="mt-2 text-xl font-semibold text-emerald-200 sm:text-2xl">{program.hindiName}</p>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
          {program.taglineEnglish}. {program.goalEnglish}.
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-emerald-100">
          {program.taglineHindi}. {program.goalHindi}.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">
            Age group {program.posterAge}
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
            Registration ages {TALENT_HUNT_AGE_LABEL}
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
            {program.organizerHindi}
          </span>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {program.benefits.map((benefit, index) => (
            <div key={benefit.title} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                {index + 1}. {benefit.titleHindi}
              </p>
              <h2 className="mt-2 text-lg font-bold text-white">{benefit.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{benefit.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {program.steps.map((step) => (
            <div key={step.title} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300">{step.titleHindi}</p>
              <h3 className="mt-2 text-base font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-[24px] bg-gradient-to-r from-emerald-500 to-blue-600 px-5 py-5 text-center sm:px-8">
          <p className="text-lg font-bold sm:text-2xl">{program.sloganHindi}</p>
          <p className="mt-1 text-sm font-medium text-emerald-50 sm:text-base">{program.sloganEnglish}</p>
        </div>
      </div>
    </section>
  );
}
