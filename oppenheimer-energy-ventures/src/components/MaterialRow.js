export default function MaterialRow({ name, href, isLast = false }) {
  return (
  <div className={`flex items-center justify-between py-4 border-t ${isLast ? 'border-b' : ''} border-gray-200`}>
      <div className="text-sm sm:text-base">{name}</div>
      <a
        href={href}
    className="text-sm px-3 py-2 border border-gray-300 rounded-none bg-gray-200 text-gray-900 hover:bg-gray-300 hover:border-gray-400 transition-colors"
        download
      >
        Download
      </a>
    </div>
  );
}
