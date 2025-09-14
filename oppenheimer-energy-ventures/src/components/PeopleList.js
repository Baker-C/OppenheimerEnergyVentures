export default function PeopleList({ people = [] }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-6 ">
      {people.map((p, idx) => (
        <li key={idx} className="
          p-6 border border-gray-400 rounded-md 
          transition-shadow hover:shadow-lg hover:shadow-gray-300/70 dark:hover:glow-basic
          cursor-none fade-up
        " style={{ animationDelay: `${420 + idx * 120}ms` }}>
          <div className="text-lg sm:text-xl md:text-2xl font-semibold">{p.name}</div>
          {p.role && <div className="text-xs sm:text-base md:text-lg font-subheading text-black-muted dark:text-white-muted">{p.role}</div>}
          {p.bio && <p className="mt-4 text-xs sm:text-base md:text-lg text-black-muted dark:text-white-muted leading-7">{p.bio}</p>}
        </li>
      ))}
    </ul>
  );
}
