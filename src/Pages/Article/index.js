import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const reactions = ["👍 Like", "❤️ Love", "😡 Angry", "😢 Sad"];

// Dummy comments for pagination
const dummyComments = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  author: "User " + (i + 1),
  text: "This is a sample comment number " + (i + 1),
}));

export default function ArticlePage() {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [commentReactions, setCommentReactions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;

  // Pagination logic
  const startIdx = (currentPage - 1) * commentsPerPage;
  const currentComments = dummyComments.slice(
    startIdx,
    startIdx + commentsPerPage
  );
  const totalPages = Math.ceil(dummyComments.length / commentsPerPage);

  const handleCommentReaction = (commentId, reaction) => {
    setCommentReactions({ ...commentReactions, [commentId]: reaction });
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
        Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor
        Lorem Ipsum Dolor Lorem Ipsum Dolor
      </p>

      {/* Image */}
      <div className="article-image"></div>

      {/* Caption under image */}
      <p className="article-caption">
        Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor
        Lorem Ipsum Dolor Lorem Ipsum
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

      {/* Decorative line after date */}
      <div className="decorative-line"></div>

      {/* Content */}
      <p className="article-body">
        Lorem ipsum dolor Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor
        Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor
        Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor
        Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor
        Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor
      </p>

      {/* Decorative line before reactions */}
      <div className="decorative-line"></div>

      {/* Reactions Box */}
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
        <h3>{dummyComments.length} Comments</h3>
        {currentComments.map((c) => (
          <div key={c.id} className="comment">
            <p className="comment-author">{c.author}</p>
            <p className="comment-text">{c.text}</p>

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
