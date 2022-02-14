import { Component } from 'react';
import './navbar.css';

class MainNavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.handlePageForward = this.handlePageForward.bind(this);
    this.handlePageBackward = this.handlePageBackward.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  toggleOpen(_event: unknown) {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handlePageForward(event) {
    console.log('forward page');
  }

  handlePageBackward(event) {
    console.log('backward page');
  }

  render() {
    const menuClass = `account-dropbox dropdown-menu${this.state.isOpen ? " show" : ""}`;
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
            <div className="dropdown">
              <button
                id="account-dropdown"
                onClick={this.toggleOpen}
                type="button"
                className="btn dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="bi bi-person-circle account-icon" />
              </button>
              <ul className={menuClass} aria-labelledby="account-dropdown">
                <li>
                  <a className="dropdown-item" href="/">
                    Account
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Private session
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

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
