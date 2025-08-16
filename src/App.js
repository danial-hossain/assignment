// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticlePage from "./Pages/Article";
import Profile from "./Pages/Author";
import people from "./Pages/components/people/data";

import PersonProfile from "./Pages/components/people";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Article */}
        <Route path="/" element={<ArticlePage />} />

        {/* Author Profile */}
        <Route path="/author" element={<Profile />} />

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
