import { PureComponent } from 'react';
import './navbar.css';

class MainNavBar extends PureComponent {
  render() {
    return (
      <div id="nav">
        <a href="/">
          <span className="bi bi-house-door-fill bicon" />
          Home
        </a>
        <a href="/">
          <span className="bi bi-search bicon" />
          Search
        </a>
        <a href="/">
          <span className="bi bi-collection-fill bicon" />
          Your Library
        </a>

        <hr />

        <div id="playlists">
          <a href="/">
            <span className="bi bi-plus-square-fill bicon" />
            Create Playlist
          </a>

          <div id="overlay_content">
            <div id="recently_played" />

            <hr />

            <div id="friends_list" />
          </div>
        </div>
      </div>
    );
  }
}

export default MainNavBar;
