// src/Pages/components/people/index.js
import "./style.css";

export default function PersonProfile({ person }) {
  if (!person) return <p>Person not found</p>;

  return (
    <div className="person-profile">
      <img src={person.image} alt={person.name} className="person-img" />
      <h2 className="person-name">{person.name}</h2>
      <p className="person-bio">{person.bio}</p>
    </div>
  );
}
