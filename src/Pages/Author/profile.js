// src/Pages/author/Profile.js
import { useLocation } from "react-router-dom";
import "./profile.css";

export default function Profile() {
  const location = useLocation();
  const { name, image } = location.state || {
    name: "Unknown Author",
    image: "https://via.placeholder.com/150",
  };

  return (
    <div className="profile-container">
      <img src={image} alt={name} className="profile-img" />
      <h2 className="profile-name">{name}</h2>
      <p className="profile-bio">
        {name} is a contributor to this platform. This is a demo author profile
        page.
      </p>
    </div>
  );
}
