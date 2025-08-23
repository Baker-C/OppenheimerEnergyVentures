import LineDot from './LineDot';

export default function Section({ title, children, className = '', animatedLine = false }) {
  return (
    <section className={`py-10 sm:py-12 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-wide font-heading whitespace-nowrap">{title}</h2>
        <LineDot width="fill" />
      </div>
      <div className="space-y-8">
        {children}
      </div>
    </section>
  );
}
