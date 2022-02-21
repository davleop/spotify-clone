import { NONAME } from 'dns';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    window.electron.ipcRenderer.openPopup();
  }

  render() {
    return (
      <div className="box-holder">
        <div className="overlay" />
        <div className="login-form">
          <a
            href="/home"
            role="button"
            className="butt go-spotify"
            onClick={this.handleLogin}
          >
            Login
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
