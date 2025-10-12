
import './App.css';
import {BrowserRouter, Routes, Route, HashRouter} from 'react-router-dom'; // Добавили BrowserRouter
import Enter from "./pages/Enter";
import School from "./pages/School";
import Cours from "./pages/cours/Cours";
import Topic from "./pages/topic/Topic";
function App() {
  return (
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Enter />} />
              <Route path="/school" element={<School />} />
              <Route path="/cours" element={<Cours />} />
              <Route path="/topic" element={<Topic />} />
          </Routes>
        </div>
      </HashRouter>
);
}

export default App;
