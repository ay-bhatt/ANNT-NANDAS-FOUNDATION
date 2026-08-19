export default function RegisterLoading() {
  return (
    <div className="min-h-[70vh] bg-slate-50 px-4 py-16">
      <div className="container-premium">
        <div className="mb-8 h-10 w-64 animate-pulse rounded-full bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-52 animate-pulse rounded-[28px] bg-white shadow-sm" />
          ))}
        </div>
      </div>
    </div>
  );
}
