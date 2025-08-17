import { Link, useLocation } from "react-router-dom";
// /Uses React Router to both read data passed from another page (useLocation) and navigate (Link).
//useLocation->It tells you which route (URL path) you are currently on.
//It gives you:pathname → the current route (/profile, /article/3, etc.)
//search → the query string (like ?id=5&sort=asc)
//hash → the URL hash (like #section2)
//state → any extra data another page passed when navigating

//Link → lets you navigate to another route and optionally pass extra data.
//useLocation → lets the target page read the current route info and that passed data.
import "./profile.css";



//what extra state (if any) was passed when navigating with <Link ... state={...} />.


export default function Profile() {
  const location = useLocation();
  //useLocation() → always tells you where you are in the app (which route) and 
  const { name, image, bio } = location.state || {
    //location.state → may contain { name, image, bio } if another page passed it via Link.
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
 
  ];

  return (
    <div className="profile-container">
      {/* Profile Section */}
      <div className="profile-header">
        {/* ✅ Clicking on the image or name goes to AuthorPage */}
        <Link to="/author" state={{ name, image, bio }}>
          <img src={image} alt={name} className="profile-img" />
        </Link>
        <div className="profile-info">
          <Link to="/author" state={{ name, image, bio }} className="profile-name">
            {name}
          </Link>
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
