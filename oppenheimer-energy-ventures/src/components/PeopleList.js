export default function PeopleList({ people = [] }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-6">
      {people.map((p, idx) => (
  <li key={idx} className="p-6 border border-gray-200 rounded-md transition-shadow hover:shadow-lg hover:shadow-gray-300/70 cursor-default-all fade-up" style={{ animationDelay: `${420 + idx * 120}ms` }}>
          <div className="text-lg sm:text-xl md:text-2xl font-semibold">{p.name}</div>
          {p.role && <div className="text-base sm:text-lg md:text-xl text-gray-600">{p.role}</div>}
          {p.bio && <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-700 leading-7">{p.bio}</p>}
        </li>
      ))}
    </ul>
  );
}
