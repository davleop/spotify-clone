import {
  MemoryRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { useRef, useEffect, useState, SetStateAction } from 'react';
// import icon from '../../assets/icon.svg';
import './App.css';
import MainNavBar from './navbar';
import BottomBar from './bottombar';
import Login from './login';

const Home = () => {
  const ref = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
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

const callback = (comp) => {
  const code = new URL(window.location.href).searchParams.get('code');
  if (code !== null) {
    window.electron.ipcRenderer.closePopup();
    window.electron.ipcRenderer.setCode('set-code', code);
    window.electron.ipcRenderer.reload();
  }
  return comp;
};

const NoMatch = () => {
  return <div className="">404 Page</div>;
};

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    window.electron.ipcRenderer.once('logged-in', (arg) => {
      console.log(`LOGGED INTERNAL? ${arg}`);
      if (arg === true) setLoggedIn(arg);
    });
    window.electron.ipcRenderer.isLoggedIn();
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <LetsLogin />} />
        <Route path="/callback" element={callback(<Navigate to="/" />)} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}
