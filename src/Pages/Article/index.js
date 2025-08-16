import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import people from "../components/people/data";
import "./style.css";

const dummyComments = people.map((person, index) => ({
  id: index + 1,
  author: person.name,
  profile: `/people/${person.id}`,
  date: new Date(2025, 1, index + 1).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
  text: person.bio,
  liked: null, // "like" | "dislike" | null
  likes: 0,
  dislikes: 0,
}));

export default function ArticlePage() {
  const location = useLocation();
  const { name, image, bio } = location.state || {
    name: "danial hossain",
    image: "/profile.jpg",
    bio: "Software Developer, C++ & React enthusiast 🚀",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(dummyComments);

  const commentsPerPage = 3;
  const startIdx = (currentPage - 1) * commentsPerPage;
  const currentComments = comments.slice(startIdx, startIdx + commentsPerPage);
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  // ✅ Add comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newEntry = {
      id: comments.length + 1,
      author: "You",
      profile: null,
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      text: newComment,
      liked: null,
      likes: 0,
      dislikes: 0,
    };
    setComments([newEntry, ...comments]);
    setNewComment("");
    setCurrentPage(1);
  };

  // ✅ Like/Dislike toggle logic
  const handleLikeDislike = (id, type) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;

        // already liked/disliked
        if (c.liked === type) return c;

        if (type === "like") {
          return {
            ...c,
            liked: "like",
            likes: c.likes + 1,
            dislikes: c.liked === "dislike" ? c.dislikes - 1 : c.dislikes,
          };
        } else {
          return {
            ...c,
            liked: "dislike",
            dislikes: c.dislikes + 1,
            likes: c.liked === "like" ? c.likes - 1 : c.likes,
          };
        }
      })
    );
  };

  return (
    <div className="article-container">
      <p className="breadcrumb">Section &gt; Sub-section</p>

      <h1 className="article-title">
        Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor
      </h1>

      <p className="article-intro">
        Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor
      </p>

      <div className="article-image"></div>

      <p className="article-caption">
        Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor
      </p>

      {/* ✅ Author info */}
      <div className="author-box">
        <div className="author-avatar">
          <img src={image} alt={name} style={{ width: 50, borderRadius: "50%" }} />
        </div>
        <div>
          <Link
            to="/author"
            state={{ name, image, bio }}
            className="author-name"
          >
            {name}
          </Link>
          <p className="author-date">7 January 2025</p>
        </div>
      </div>

      <div className="decorative-line"></div>

      <p className="article-body">
        Lorem ipsum dolor Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor
      </p>

      <div className="decorative-line"></div>

      {/* ✅ Comments */}
      <div className="comments-box">
        <h3>{comments.length} Comments</h3>

        <div className="comment-input">
          <input
            type="text"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
          />
          <button onClick={handleAddComment}>➤</button>
        </div>

        {currentComments.map((c) => (
          <div key={c.id} className="comment">
            {c.profile ? (
              <Link to={c.profile} className="comment-author">
                {c.author}
              </Link>
            ) : (
              <p className="comment-author">{c.author}</p>
            )}
            <p className="comment-date">{c.date}</p>
            <p className="comment-text">{c.text}</p>

            {/* ✅ Only Like & Dislike */}
            <div className="comment-actions">
              <button
                onClick={() => handleLikeDislike(c.id, "like")}
                className={c.liked === "like" ? "active" : ""}
              >
                👍 {c.likes}
              </button>
              <button
                onClick={() => handleLikeDislike(c.id, "dislike")}
                className={c.liked === "dislike" ? "active" : ""}
              >
                👎 {c.dislikes}
              </button>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
