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

    /*window.electron.ipcRenderer.once('login-spotify', (arg) => {
      this.setState({ url: arg });
    });
    window.electron.ipcRenderer.popup();*/

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    window.electron.ipcRenderer.popup();
  }

  render() {
    return (
      <div className="box-holder">
        <div className="overlay" />
        <div className="login-form">
          <Link
            to={{ pathname: '/callback' }}
            role="button"
            className="butt go-spotify"
            onClick={this.handleLogin}
          >
            Login
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
