import { PureComponent } from 'react';
import './navbar.css';

class MainNavBar extends PureComponent {
  render() {
    return (
      <div id="nav">
        <a href="/">Home</a>
        <a href="/">Search</a>
        <a href="/">Your Library</a>

        <hr />

        <div id="playlists">
          <a href="/">Create Playlist</a>

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
