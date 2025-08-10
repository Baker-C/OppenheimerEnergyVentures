export default function PeopleList({ people = [] }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-4">
      {people.map((p, idx) => (
        <li key={idx} className="p-4 border border-gray-200 rounded-md">
          <div className="font-medium">{p.name}</div>
          {p.role && <div className="text-sm text-gray-600">{p.role}</div>}
          {p.bio && <p className="mt-2 text-sm text-gray-700">{p.bio}</p>}
        </li>
      ))}
    </ul>
  );
}
