import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
import './App.css';
import MainNavBar from './navbar';
import BottomBar from './bottombar';

const LetsGo = () => {
  return (
    <div className="">
      <MainNavBar />
      <BottomBar />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LetsGo />} />
      </Routes>
    </Router>
  );
}
