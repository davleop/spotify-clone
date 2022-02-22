import { Component } from 'react';

class SpotSDK extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <script src="https://sdk.scdn.co/spotify-player.js" />
      </div>
    );
  }
}

export default SpotSDK;
