export default function Container({ className = '', children }) {
  return (
    <div className={`max-w-7xl mx-auto px-10 pb-40 lg:pt-20 ${className}`}>{children}</div>
  );
}
