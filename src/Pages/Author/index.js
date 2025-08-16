import { useLocation } from "react-router-dom";
import "./style.css";

export default function AuthorPage() {
  const location = useLocation();
  const { name, image } = location.state || {
    name: "Unknown Author",
    image: "https://via.placeholder.com/100",
  };

  return (
    <div className="author-container">
      <img src={image} alt={name} className="author-profile-pic" />
      <h2 className="author-profile-name">{name}</h2>
      <p className="author-profile-bio">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a dummy
        author profile page.
      </p>
    </div>
  );
}
