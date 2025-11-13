import Home from './pages/Home';

import { Routes, Route } from 'react-router-dom';
import Ranking from './pages/Ranking';

import Header from './components/ui/Header';
import Footer from './components/ui/Footer';

function App() {
    return (
        <div className="bg-[#323437] px-6">
            <div className="max-w-4xl mx-auto flex flex-col min-h-screen ">
                <Header />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/ranking" element={<Ranking />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;
