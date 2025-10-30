import Home from './pages/Home';

import { Routes, Route } from 'react-router-dom';

import Game from './pages/Game';
import Ranking from './pages/Ranking';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/ranking" element={<Ranking />} />
        </Routes>
    );
}

export default App;
