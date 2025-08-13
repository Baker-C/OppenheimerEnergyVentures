export default function Footer() {
  return (
  <footer className="bg-white shadow-top-md text-xs sm:text-sm text-gray-500 py-3 sm:py-4 mt-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col items-center gap-1">
        <div>&copy; {new Date().getFullYear()} Oppenheimer Energy Ventures</div>
      </div>
    </footer>
  );
}
