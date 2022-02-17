import { NONAME } from 'dns';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: null,
    };

    window.electron.ipcRenderer.once('login-spotify', (arg) => {
      this.setState({ url: arg });
    });
    window.electron.ipcRenderer.spotifyLogin();

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    window.electron.ipcRenderer.popup();
  }

  render() {
    const { url } = this.state;
    return (
      <div className="box-holder">
        <div className="overlay" />
        <div className="login-form">
          <a
            href={url}
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
