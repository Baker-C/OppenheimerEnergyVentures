export default function MaterialRow({ name, href, isLast = false }) {
  return (
  <div className={`
    flex items-center justify-between py-6 
    border-t ${isLast ? 'border-b' : ''} border-gray-200 
    transition-shadow hover:shadow-y dark:hover:glow-y
    overflow-x-hidden cursor-default-all
  `}>
    <div className="text-xs sm:text-base md:text-lg italic">{name}</div>
    <a
      href={href}
      className="text-base sm:text-lg px-4 py-1 border border-gray-300 rounded-none hover:border-gray-400 transition-colors"
      download
    >
      Download
    </a>
  </div>
  );
}
