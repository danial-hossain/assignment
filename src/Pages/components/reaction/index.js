import { useState } from "react";
import "./style.css";

const reactionOptions = [
  { id: "like", label: "Like", icon: "👍" },
  { id: "love", label: "Love", icon: "❤️" },
  { id: "angry", label: "Angry", icon: "😡" },
  { id: "sad", label: "Sad", icon: "😢" },
];

export default function Reactions({ onSelect, initialValue }) {
  const [selected, setSelected] = useState(initialValue || null);

  const handleClick = (reactionId) => {
    setSelected(reactionId);
    if (onSelect) onSelect(reactionId);
  };

  return (
    <div className="reactions">
      {reactionOptions.map((r) => (
        <button
          key={r.id}
          className={`reaction-btn ${selected === r.id ? "active" : ""}`}
          onClick={() => handleClick(r.id)}
        >
          <span className="icon">{r.icon}</span>
          <span className="label">{r.label}</span>
        </button>
      ))}
    </div>
  );
}
