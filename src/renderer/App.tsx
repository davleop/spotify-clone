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

const callback = (setter: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }, comp: JSX.Element) => {
  window.electron.ipcRenderer.closePopup();
  const code = new URL(window.location.href).searchParams.get('code');

  if (code !== null) {
    console.log(`FROM THE OUTSIDE ${code}`);
    window.electron.ipcRenderer.setCode('set-code', code);
    setter(true);
  }

  return comp;
};

const NoMatch = () => {
  return <div className="">404 Page</div>;
};

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    //
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <LetsLogin />}
        />
        <Route path="/home" element={<Home />} />
        <Route
          path="/callback"
          element={callback(setLoggedIn, <Navigate to="/" />)}
        />
        <Route path="/*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}
