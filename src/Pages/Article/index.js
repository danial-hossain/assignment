import { useState } from "react"; //using useState ->for storing data
import { Link, useLocation } from "react-router-dom"; // useLocation to find the route and any passed data
import people from "../components/people/data";
//it imports something named people from the file data.js (inside components/people/).
import "./style.css"; //for current page styling
//people ->map ->jetate sob data stored

const dummyComments = people.map((person, index) => ({
  //people.map(...) → go through each person in the people array and make a new object for them.
  //The result is a new array called dummyComments.

  //id->comment number 
  //profile->visit profile
  //data->comment data
  // 
  //author ->name of person
  id: index + 1,
  author: person.name,
  profile: `/people/${person.id}`,
  date: new Date(2025, 1, index + 1).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
  text: person.bio,
  //text-->actual comment that is shown here
  liked: null, // "like" | "dislike" | null
  likes: 0,
  dislikes: 0,
}));

export default function ArticlePage() {
  const location = useLocation();
  //Since  no pass of data in location.state, location ->checks location and data of that state
  //React Router gives me undefined (the default data) is shown
  const { name, image, bio } = location.state || {
    name: "danial hossain",
    image: "/profile.jpg",
    bio: "Software Developer, C++ & React enthusiast 🚀",
  };

  const [currentPage, setCurrentPage] = useState(1);
  //Keeps track of which page of comments you are on. (Page 1, Page 2, etc.)
  const [newComment, setNewComment] = useState("");
  // Stores the text while you are typing a new comment in the input box.
  //currently no showing option available
  const [comments, setComments] = useState(dummyComments);
  //Stores the list of all comments.
 //Initially, it uses dummyComments (fake data from people).

  const commentsPerPage = 3;
  //You show 3 comments per page.
//Page 1 → Comment 1, 2, 3
//Page 2 → Comment 4, 5, 6
//Page 3 → Comment 7
  const startIdx = (currentPage - 1) * commentsPerPage;
  const currentComments = comments.slice(startIdx, startIdx + commentsPerPage);
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  // ✅ Add comment
  // 43 no line -> newComment for new comment storing 
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    // If the box is empty → stop.

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
    //Adds your new comment first, then the old ones.
    setNewComment("");
    //So the text box becomes empty again.
    setCurrentPage(1);
    //So you immediately see your new comment.
  };

  // ✅ Like/Dislike toggle logic
  const handleLikeDislike = (id, type) => {
    //👉 It controls the 👍 Like and 👎 Dislike buttons for each comment.
    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
         //👉 If this is not the clicked comment → leave it unchanged.
        // already liked/disliked
        if (c.liked === type) return c;
       
       // 👉 Example: You already liked it, and click 👍 again → do nothing.

        if (type === "like") {
          //If you clicked 👍 (like)
          return {
            ...c,
            liked: "like",
            //Mark as "like"
            likes: c.likes + 1,
            //Increase likes count by 1
            dislikes: c.liked === "dislike" ? c.dislikes - 1 : c.dislikes,
            //If it was 👎 before, remove one from dislikes
          };
        } else {
          return {
            ...c,
            liked: "dislike",
            dislikes: c.dislikes + 1,
            likes: c.liked === "like" ? c.likes - 1 : c.likes,
            //Increase dislikes count by 1
           //If it was 👍 before, remove one from likes
          };
        }
      })
    );
  };

  // ✅ Reactions (article level, not per comment)
  //reactions → stores the total counts (like = 0, love = 0, etc.).
//userReaction → remembers what this user picked (or null if none)

  const [reactions, setReactions] = useState({
    like: 0,
    love: 0,
    angry: 0,
    sad: 0,
  });
  const [userReaction, setUserReaction] = useState(null); 
  // Stores the current user’s chosen reaction

  const handleReaction = (type) => {
    setReactions((prev) => {
      let updated = { ...prev };

      // 👉 If user clicked the same reaction again → remove it (neutral)
      if (userReaction === type) {
        updated[type] = Math.max(0, updated[type] - 1);
        setUserReaction(null);
        return updated;
      }

      // 👉 If switching from one reaction to another
      if (userReaction) {
        updated[userReaction] = Math.max(0, updated[userReaction] - 1);
      }

      // 👉 Add new reaction
      updated[type] = updated[type] + 1;
      setUserReaction(type);
//If you click the same reaction again → it’s removed (goes back to neutral).
//If you switch reactions → old one goes down by 1, new one goes up by 1.
//So at most one reaction is active per user.
      return updated;
    });
  };

  return (
    <div className="article-container">
      <p className="breadcrumb">Section &gt; Sub-section</p>

      {/* just a placeholder text now → Section > Sub-section */}

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
          { /*from 37th line we used the default image as there is no data passed  */}

          { /*<Link> → React Router component (works like <a> but no page refresh).
        to="/author" → when clicked, it will navigate to the /author route (your Profile page)
        state={{ name, image, bio }} → passes data (name, image, bio) to that new page. 
        If not passed, your Profile page shows default values.
        /author -> is located ad App.js
        That means  whenever the browser goes to /author, React Router will render the Profile component.

        */}
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

      {/* ✅ Reaction buttons + Box */}
      <div className="reaction-buttons">
        <button
          onClick={() => handleReaction("like")}
          className={userReaction === "like" ? "active" : ""}
        >
          👍 Like
        </button>
        <button
          onClick={() => handleReaction("love")}
          className={userReaction === "love" ? "active" : ""}
        >
          ❤️ Love
        </button>
        <button
          onClick={() => handleReaction("angry")}
          className={userReaction === "angry" ? "active" : ""}
        >
          😡 Angry
        </button>
        <button
          onClick={() => handleReaction("sad")}
          className={userReaction === "sad" ? "active" : ""}
        >
          😢 Sad
        </button>
      </div>

      <div className="reaction-box">
        {Object.entries(reactions).map(([key, value]) => (
          <div
            key={key}
            className={`reaction-item ${userReaction === key ? "active" : ""}`}
          >
            <span className="reaction-label">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
            <span className="reaction-percent">{value}</span>
          </div>
        ))}
      </div>

      {/* ✅ Comments */}
      <div className="comments-box">
        <h3>{comments.length} Comments</h3>

        <div className="comment-input">
        { /* the input box + button to add a new comment. */}
          { /* value {newComment} hatever you type shows up from the state newComment. (Controlled input 
            onChange={(e) => setNewComment(e.target.value)} → updates the state newComment as you type
            onKeyDown={(e) => e.key === "Enter" && handleAddComment()} → if you press Enter,
             it calls handleAddComment() and adds the comment.
            */}
          <input
            type="text"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
          />
          <button onClick={handleAddComment}>➤</button>
        </div>
        
        { /*   {currentComments.map((c) => (
          👉 Loops through all the comments for the current page (currentComments) and shows them.
          {c.profile ? 
          👉 If the comment has a profile link → make the author’s name clickable.
            👉 Otherwise → just show the name as plain text.
           
           <p className="comment-date">{c.date}</p>
          <p className="comment-text">{c.text}</p>
         👉 Shows when the comment was posted and what was written

          */}


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

            {/* ✅ Only Like & Dislike 
            handleLike Dislike logic ->89 line
            */}
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
          { /* 
        Array.from({ length: totalPages })
        Creates an array with numbers = number of pages.
        Example: if totalPages = 3 → [0, 1, 2].
        Displays page number → {i + 1}.
        When clicked → calls setCurrentPage(i + 1) to load that page’s comments.
        
        */}
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
