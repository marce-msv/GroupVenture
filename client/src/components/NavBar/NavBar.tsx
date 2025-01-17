import './NavBar.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUID } from '../../customHooks';
import useSound from 'use-sound';
import elevatorSfx from './ElevatorMusic.wav';
import { FaPlay, FaPause } from 'react-icons/fa';

export default function NavBar() {
  const uid = useUID();
  const [showLogin, setShowLogin] = useState<boolean>(uid ? false : true);
  const [playing, setPlaying] = useState(false);
  const [play, { stop }] = useSound(elevatorSfx);

  useEffect(() => {
    uid ? setShowLogin(false) : setShowLogin(true);
  }, [uid]);

  return (
    <div className="navbar">
      <nav id="nav">
        <div
          className="app-name"
          style={{
            fontFamily: 'Orbit',
            fontStyle: 'sans-serif',
            fontWeight: 'cursive',
          }}
        >
          <Link to="/">
            <h2>GroupVenture</h2>
          </Link>
          <span className="material-symbols-outlined">diversity_3</span>
        </div>
        <li>
          <Link to="/">Home</Link>
        </li>
        {showLogin ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to={`/profile/${uid}`}>Profile</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        )}
      </nav>

      {playing ? (
        <FaPause
          className="music-btn"
          onClick={() => {
            playing ? stop() : play();
            setPlaying(!playing);
          }}
        />
      ) : (
        <FaPlay
          className="music-btn"
          onClick={() => {
            playing ? stop() : play();
            setPlaying(!playing);
          }}
        />
      )}
    </div>
  );
}
