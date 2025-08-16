import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticlePage from "./Pages/Article";
import Profile from "./Pages/Author";
import people from "./Pages/components/people/data";
import PersonProfile from "./Pages/components/people";
import "./Pages/Author/profile.js";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home (can show default article or landing page) */}
        <Route path="/" element={<ArticlePage />} />

        {/* Author Profile */}
        <Route path="/author" element={<Profile />} />

        {/* Dynamic Article Pages */}
        <Route path="/article/:id" element={<ArticlePage />} />

        {/* People Profiles (dynamic) */}
        {people.map((p) => (
          <Route
            key={p.id}
            path={`/people/${p.id}`}
            element={<PersonProfile person={p} />}
          />
        ))}
      </Routes>
    </Router>
  );
}
