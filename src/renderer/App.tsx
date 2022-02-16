import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
// import icon from '../../assets/icon.svg';
import './App.css';
import MainNavBar from './navbar';
import BottomBar from './bottombar';
import Login from './login';
import Portal from './portal';

const LetsGo = () => {
  const ref = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="">
      <MainNavBar re={ref} open={isMenuOpen} setOpen={setIsMenuOpen} />
      <BottomBar />
    </div>
  );
};

const LetsLogin = () => {
  return (
    <div className="">
      <Login />
      <MainNavBar />
      <BottomBar />
    </div>
  );
};

const SpotifyPage = () => {
  return (
    <Portal>
      <h1>bar</h1>
    </Portal>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LetsLogin />} />
        <Route path="/login" element={<SpotifyPage />} />
        <Route path="/callback" element={<LetsGo />} />
      </Routes>
    </Router>
  );
}
