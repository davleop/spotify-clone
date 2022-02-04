import { PureComponent } from 'react';
import './navbar.css';

class MainNavBar extends PureComponent {
  render() {
    return (
      <div>
        <ul id="nav">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Search</a>
          </li>
          <li>
            <a href="/">Your Library</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default MainNavBar;
