// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticlePage from "./Pages/Article"; // Article page
import people from "./Pages/components/people/data"; // People data
import PersonProfile from "./Pages/components/people"; // Profile component

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main Article Page */}
        <Route path="/" element={<ArticlePage />} />

        {/* Person Profile Pages (auto-generated from data.js) */}
        {people.map((person) => (
          <Route
            key={person.id}
            path={`/people/${person.id}`}
            element={<PersonProfile person={person} />}
          />
        ))}
      </Routes>
    </Router>
  );
}
