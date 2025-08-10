export default function Section({ title, children, className = '' }) {
  return (
    <section className={`py-10 sm:py-12 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-lg font-medium tracking-wide">{title}</h2>
        <span className="flex-1 h-px bg-current relative line-dot" aria-hidden />
      </div>
      {children}
    </section>
  );
}
