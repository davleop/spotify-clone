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

const track = {
  name: '',
  album: {
    images: [{ url: '' }],
  },
  artists: [{ name: '' }],
};

const Home = () => {
  const ref = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [currentTrack, setTrack] = useState(track);

  // get that token...
  const [token, setToken] = useState(null);
  window.electron.ipcRenderer.once('get-token', (arg: SetStateAction<null>) => {
    if (token === null) setToken(arg);
  });
  window.electron.ipcRenderer.getToken();

  useEffect(() => {
    const checkIfClickedOutside = (e: { target: any; }) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const play = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb: (arg0: null) => void) => {
          cb(token);
        },
        volume: 1.0,
      });

      setPlayer(play);

      play.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      play.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      play?.addListener(
        'player_state_changed',
        (state: {
          track_window: {
            current_track: SetStateAction<{
              name: string;
              album: { images: { url: string }[] };
              artists: { name: string }[];
            }>;
          };
          paused: boolean | ((prevState: boolean) => boolean);
        }) => {
          if (!state) {
            return;
          }

          setTrack(state.track_window.current_track);
          setPaused(state.paused);

          player
            .getCurrentState()
            .then((state) => {
              !state ? setActive(false) : setActive(true);
            })
            .catch(console.log);
        }
      );
      play.connect();
    };
  }, [player, token]);

  return (
    <div className="">
      <MainNavBar re={ref} open={isMenuOpen} setOpen={setIsMenuOpen} />
      <BottomBar
        player={player}
        isPaused={isPaused}
        isActive={isActive}
        currentTrack={currentTrack}
      />
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
    window.electron.ipcRenderer.once('logged-in', (arg: boolean | ((prevState: boolean) => boolean)) => {
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
