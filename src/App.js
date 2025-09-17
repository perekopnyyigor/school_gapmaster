
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Добавили BrowserRouter
import Enter from "./pages/Enter";
import Courses from "./pages/Courses";
import Topics from "./pages/Topics";
import Cards from "./pages/Cards";
function App() {
  return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Enter />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/cards" element={<Cards />} />
          </Routes>
        </div>
      </BrowserRouter>
);
}

export default App;
