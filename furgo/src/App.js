import logo from './logo.svg';
import './App.css';
import BottomNavbar from './BNav';
import BottomNav from './BNav';
import TopNavbar from './TNav';
import ThreeCards from './three';
import About from './about';

function App() {
  return (
    <div className="App">
      <BottomNav />
      <TopNavbar />
      <ThreeCards />
      <About />
    </div>
  );
}

export default App;
