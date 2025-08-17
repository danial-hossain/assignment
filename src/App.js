import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Router is the container for all your routes
//react-router-dom → lets you define routes (Route) and wrap them with a router (Router)
//What is react-router-dom?
//It’s a library that helps you add routing to a React app.
//Routing means: when the URL changes, the app shows a different component — without reloading the page.
//Instead of refreshing, React swaps out components.

/* In the internet world, a router (like the device in your home) decides where data should go.
In React, it’s very similar:
The Router decides which page/component to show depending on the URL.
Example:
If URL is /about → show the About Page.
If URL is /contact → show the Contact Page.*/


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
