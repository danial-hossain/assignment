import { Link, useLocation } from "react-router-dom";
// /Uses React Router to both read data passed from another page (useLocation) and navigate (Link).
//useLocation->It tells you which route (URL path) you are currently on.
//It gives you:pathname → the current route (/profile, /article/3, etc.)
//search → the query string (like ?id=5&sort=asc)
//hash → the URL hash (like #section2)
//state → any extra data another page passed when navigating


import "./profile.css";

export default function Profile() {
  const location = useLocation();
  const { name, image, bio } = location.state || {
    name: "danial hossain",
    image: "/profile.jpg", // ✅ your profile.jpg in public folder
    bio: "Software Developer, C++ & React enthusiast 🚀",
  };

  const articles = [
    {
      id: 1,
      title: "Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor",
      link: "/article/1", // ✅ correct route
    },
    {
      id: 2,
      title: "Another Demo Article for Showcase",
      link: "/article/2",
    },
    {
      id: 3,
      title: "How to Build a React App Step by Step",
      link: "/article/3",
    },
  ];

  return (
    <div className="profile-container">
      {/* Profile Section */}
      <div className="profile-header">
        <img src={image} alt={name} className="profile-img" />
        <div className="profile-info">
          <h2 className="profile-name">{name}</h2>
          <p className="profile-bio">{bio}</p>
        </div>
      </div>

      {/* Articles Section */}
      <div className="articles-section">
        <h3 className="articles-title">Popular Articles</h3>
        <div className="articles-list">
          {articles.map((a) => (
            <div key={a.id} className="article-card">
              <Link
                to={a.link}
                state={{ name, image, bio }} // ✅ pass author info to ArticlePage
                className="article-link"
              >
                {a.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
