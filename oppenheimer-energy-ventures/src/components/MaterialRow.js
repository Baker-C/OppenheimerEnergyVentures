export default function MaterialRow({ name, href, isLast = false }) {
  return (
  <div className={`flex items-center justify-between py-6 border-t ${isLast ? 'border-b' : ''} border-gray-200 transition-shadow hover:shadow-y overflow-x-hidden cursor-default-all`}>
  <div className="text-sm sm:text-lg md:text-xl italic">{name}</div>
      <a
        href={href}
        className="text-base sm:text-lg px-4 py-1 border border-gray-300 rounded-none bg-gray-200 text-gray-900 hover:bg-gray-300 hover:border-gray-400 transition-colors"
        download
      >
        Download
      </a>
    </div>
  );
}
