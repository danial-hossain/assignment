import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ArticlePage from "./Pages/Article";
import AuthorPage from "./Pages/Author";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route redirects to /article */}
          <Route path="/" element={<Navigate to="/article" />} />

          {/* Pages */}
          <Route path="/article" element={<ArticlePage />} />
          <Route path="/author" element={<AuthorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
