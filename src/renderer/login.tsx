import { Component } from 'react';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {}

  render() {
    return (
      <div className="box-holder">
        <div className="overlay" />
        <div className="login-form">
          <button
            type="button"
            className="go-spotify"
            data-mdb-ripple-color="dark"
            onClick={this.handleClick}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
