export default function MaterialRow({ name, href, isLast = false }) {
  return (
  <div className={`
    flex items-center justify-between py-6 
    border-t ${isLast ? 'border-b' : ''} border-gray-200 
    transition-shadow hover:shadow-y dark:hover:glow-y hover:cursor-none
    px-2
  `}>
    <div className="text-xs sm:text-base md:text-lg text-black-muted dark:text-white-muted">{name}</div>
    <a
      href={href}
      className="font-subheading text-base sm:text-lg px-4 py-1 border border-gray-300 rounded-none hover:border-gray-400 transition-colors"
      download
    >
      Download
    </a>
  </div>
  );
}
