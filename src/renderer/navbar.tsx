import { Component } from 'react';
import Dropdown from './dropdown';
import Playlists from './playlists';
import FriendsList from './friends';
import './navbar.css';

class MainNavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handlePageForward = this.handlePageForward.bind(this);
    this.handlePageBackward = this.handlePageBackward.bind(this);
  }

  handlePageForward(event) {
    console.log('forward page');
  }

  handlePageBackward(event) {
    console.log('backward page');
  }

  render() {
    return (
      <div id="nav">
        <div className="row">
          <div className="col-sm-1" />
          <div className="col-sm-2">
            <button
              aria-label="PageBack"
              id="page-back"
              type="button"
              onClick={this.handlePageBackward}
              className="bi bi-arrow-left-circle d-flex justify-content-center align-items-center back-page"
            />
          </div>
          <div className="col-sm-2">
            <button
              aria-label="PageForward"
              id="page-forward"
              type="button"
              onClick={this.handlePageForward}
              className="bi bi-arrow-right-circle d-flex justify-content-center align-items-center back-page"
            />
          </div>
          <div className="col-sm">
            <Dropdown
              re={this.props.re}
              open={this.props.open}
              setOpen={this.props.setOpen}
            />
          </div>
        </div>

        <a className="norm-btn" href="/">
          <span className="bi bi-house-door-fill bicon" />
          Home
        </a>
        <a className="norm-btn" href="/">
          <span className="bi bi-search bicon" />
          Search
        </a>
        <a className="norm-btn" href="/">
          <span className="bi bi-collection-fill bicon" />
          Your Library
        </a>

        <hr />

        <div id="playlists">
          <a className="norm-btn" href="/">
            <span className="bi bi-plus-square-fill bicon" />
            Create Playlist
          </a>

          <div id="overlay_content">
            <Playlists />

            <hr />

            <FriendsList />
          </div>
        </div>
      </div>
    );
  }
}

export default MainNavBar;
