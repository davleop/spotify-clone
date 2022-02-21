import {
  MemoryRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
// import icon from '../../assets/icon.svg';
import './App.css';
import MainNavBar from './navbar';
import BottomBar from './bottombar';
import Login from './login';

let loggedIn = window.electron.ipcRenderer.isLoggedIn();

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

const callback = (comp: JSX.Element) => {
  window.electron.ipcRenderer.closePopup();
  const code = new URL(window.location.href).searchParams.get('code');

  if (code !== null) {
    console.log(`FROM THE OUTSIDE ${code}`);
    window.electron.ipcRenderer.setCode('set-code', code);
    loggedIn = window.electron.ipcRenderer.isLoggedIn();
    console.log(`Logged in? ${loggedIn}`);
  }

  return comp;
};

const NoMatch = () => {
  return <div className="">404 Page</div>;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <Navigate to="/home" /> : <LetsLogin />}
        >
          <Route path="home" element={<Home />} />
          <Route path="callback" element={callback(<Navigate to="/home" />)} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
  );
}
