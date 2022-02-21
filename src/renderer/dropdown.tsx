import { Component } from 'react';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const menuClass = `account-dropbox dropdown-menu${
      this.props.open ? ' show' : ''
    }`;
    return (
      <div>
        <div className="dropdown" ref={this.props.re}>
          <button
            id="account-dropdown"
            onClick={() => this.props.setOpen((oldState) => !oldState)}
            type="button"
            className="btn dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="bi bi-person-circle account-icon" />
          </button>
          {this.props.open && (
            <ul className={menuClass} aria-labelledby="account-dropdown">
              <li>
                <a className="dropdown-item" href="/">
                  Account{' '}
                  <span className="bi bi-box-arrow-up-right float-end" />
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
          )}
        </div>
      </div>
    );
  }
}

export default Dropdown;
