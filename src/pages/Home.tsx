import Button from '../components/ui/Button';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-6xl font-bold mb-8">TypeBattle 🎮</h1>
            <Button>게임 시작</Button>
        </div>
    );
};

export default Home;
