import Home from './pages/Home';
import Matching from './pages/Matching';
import { Routes, Route } from 'react-router-dom';
import Result from './pages/Result';
import Match from './pages/Match';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/matching" element={<Matching />} />
            <Route path="/result" element={<Result />} />
            <Route path="/match/:matchId" element={<Match />} />
        </Routes>
    );
}

export default App;
