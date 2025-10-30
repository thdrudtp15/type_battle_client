import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

// 웹 페이지의 설명 등
const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-6xl font-bold mb-8">TypeBattle 🎮</h1>
            <Button onClick={() => navigate('/match/5')}>게임 시작</Button>
        </div>
    );
};

export default Home;
