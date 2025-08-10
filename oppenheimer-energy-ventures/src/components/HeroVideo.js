export default function HeroVideo({ src = '/video/hero.mp4', poster = '/video/hero-poster.jpg' }) {
  return (
    <div className="w-full aspect-[16/9] bg-black">
      <video
        className="w-full h-full object-cover pointer-events-none"
        autoPlay
        playsInline
        muted
        loop
        aria-hidden
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
