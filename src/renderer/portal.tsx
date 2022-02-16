import { Component } from 'react';
import ReactDOM from 'react-dom';

class Portal extends Component {
  nativeWindowObject: null | undefined;

  componentDidMount() {
    this.nativeWindowObject = window.open('');
  }

  render() {
    return this.nativeWindowObject
      ? ReactDOM.createPortal(
          this.props.children,
          this.nativeWindowObject.document.body
        )
      : null;
  }
}

export default Portal;
