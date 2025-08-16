// src/Pages/Article.js
import { useState } from "react";
import { Link } from "react-router-dom";
import people from "../components/people/data"; // ✅ import people
import "./style.css";

const reactions = ["👍 Like", "❤️ Love", "😡 Angry", "😢 Sad"];

// ✅ Generate dummy comments directly from people data
const dummyComments = people.map((person, index) => ({
  id: index + 1,
  author: person.name,
  profile: `/people/${person.id}`,
  date: new Date(2025, 1, index + 1).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
  text: person.bio, // use their bio as the comment text
  likes: 0,
  dislikes: 0,
}));

export default function ArticlePage() {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [commentReactions, setCommentReactions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(dummyComments);

  const commentsPerPage = 3;
  const startIdx = (currentPage - 1) * commentsPerPage;
  const currentComments = comments.slice(startIdx, startIdx + commentsPerPage);
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const handleCommentReaction = (commentId, reaction) => {
    setCommentReactions({ ...commentReactions, [commentId]: reaction });
  };

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
      likes: 0,
      dislikes: 0,
    };
    setComments([newEntry, ...comments]);
    setNewComment("");
    setCurrentPage(1);
  };

  const handleLike = (id) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  const handleDislike = (id) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, dislikes: c.dislikes + 1 } : c
      )
    );
  };

  return (
    <div className="article-container">
      {/* Breadcrumb */}
      <p className="breadcrumb">Section &gt; Sub-section</p>

      {/* Title */}
      <h1 className="article-title">
        Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor
      </h1>

      {/* Intro */}
      <p className="article-intro">
        Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor
      </p>

      {/* Image */}
      <div className="article-image"></div>

      {/* Caption */}
      <p className="article-caption">
        Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor
      </p>

      {/* Author */}
      <div className="author-box">
        <div className="author-avatar"></div>
        <div>
          <Link
            to="/author"
            state={{
              name: "John Doe",
              image: "https://via.placeholder.com/100",
            }}
            className="author-name"
          >
            Author Name
          </Link>
          <p className="author-date">7 January 2025</p>
        </div>
      </div>

      <div className="decorative-line"></div>

      {/* Content */}
      <p className="article-body">
        Lorem ipsum dolor Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor
      </p>

      <div className="decorative-line"></div>

      {/* Reactions */}
      <div className="reactions-box">
        {reactions.map((r, i) => (
          <button
            key={i}
            onClick={() => setSelectedReaction(r)}
            className={`reaction-btn ${selectedReaction === r ? "active" : ""}`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Comments */}
      <div className="comments-box">
        <h3>{comments.length} Comments</h3>

        {/* Input */}
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

        {/* Comment list */}
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

            <div className="comment-actions">
              <span onClick={() => handleLike(c.id)}>👍 {c.likes}</span>
              <span onClick={() => handleDislike(c.id)}>👎 {c.dislikes}</span>
            </div>

            <div className="comment-reactions">
              {reactions.map((r) => (
                <button
                  key={r}
                  onClick={() => handleCommentReaction(c.id, r)}
                  className={`reaction-btn ${
                    commentReactions[c.id] === r ? "active" : ""
                  }`}
                >
                  {r}
                </button>
              ))}
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
