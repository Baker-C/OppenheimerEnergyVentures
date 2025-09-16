export default function Footer() {
  return (
  <footer className="shadow-top-md text-xs sm:text-sm text-gray-500 pt-4 sm:pt-6 lg:pt-10 pb-3 sm:pb-4 mt-12">
      <div className="mx-auto px-4 sm:px-6 flex flex-col items-center gap-1">
        <div>&copy; {new Date().getFullYear()} Oppenheimer Energy </div>
      </div>
    </footer>
  );
}
