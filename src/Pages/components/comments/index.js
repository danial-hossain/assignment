import { useState } from "react";
import "./style.css";

// Dummy comments
const dummyComments = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  author: "Author Name",
  date: "10 February 2025",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  likes: 0,
  dislikes: 0,
}));

export default function CommentsBox() {
  const [comments, setComments] = useState(dummyComments);
  const [currentPage, setCurrentPage] = useState(1);
  const [newComment, setNewComment] = useState("");
  const commentsPerPage = 2;

  // Pagination logic
  const startIdx = (currentPage - 1) * commentsPerPage;
  const currentComments = comments.slice(startIdx, startIdx + commentsPerPage);
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  // Like handler
  const handleLike = (id) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  // Dislike handler
  const handleDislike = (id) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, dislikes: c.dislikes + 1 } : c))
    );
  };

  // Add new comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newEntry = {
      id: comments.length + 1,
      author: "You",
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      text: newComment,
      likes: 0,
      dislikes: 0,
    };
    setComments([newEntry, ...comments]); // Add new comment on top
    setNewComment("");
    setCurrentPage(1); // go back to first page
  };

  return (
    <div className="comments-container">
      {/* Comment input */}
      <div className="comment-input">
        <input
          type="text"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
        />
        <button onClick={handleAddComment}>&#10148;</button>
      </div>

      {/* Comment list */}
      <div className="comment-list">
        <h3>{comments.length} Comments</h3>
        {currentComments.map((c) => (
          <div key={c.id} className="comment">
            <div className="comment-avatar"></div>
            <div className="comment-content">
              <div className="comment-header">
                <span className="author">{c.author}</span>
                <span className="date">{c.date}</span>
                <span className="report">Report</span>
              </div>
              <p className="text">{c.text}</p>
              <div className="comment-actions">
                <span onClick={() => handleLike(c.id)}>👍 Like {c.likes}</span>
                <span onClick={() => handleDislike(c.id)}>👎 Dislike {c.dislikes}</span>
                <span className="reply">Reply</span>
              </div>
            </div>
          </div>
        ))}
      </div>

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
  );
}
