import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ResumeEditor from "./pages/ResumeEditor";
import SavedResumes from "./pages/SavedResumes";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20 bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<ResumeEditor />} />
          <Route path="/editor/:id" element={<ResumeEditor />} />
          <Route path="/saved" element={<SavedResumes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
