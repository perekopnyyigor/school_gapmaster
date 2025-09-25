
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Добавили BrowserRouter
import Enter from "./pages/Enter";
import School from "./pages/School";
import Cours from "./pages/Cours";
import Topic from "./pages/Topic";
function App() {
  return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Enter />} />
              <Route path="/school" element={<School />} />
              <Route path="/cours" element={<Cours />} />
              <Route path="/topic" element={<Topic />} />
          </Routes>
        </div>
      </BrowserRouter>
);
}

export default App;
