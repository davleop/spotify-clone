import { Component } from 'react';
import SpotSDK from './spotifysdk';
import './bottombar.css';

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      player: null,
      value: 0,
      repeat: 0,
      volume: 100,
      play: false,
      queue: false,
      lyrics: false,
      devices: false,
      shuffle: false,
      fullscreen: false,
      queue_color: `#cacaca`,
      repeat_color: `#cacaca`,
      lyrics_color: `#cacaca`,
      shuffle_color: `#cacaca`,
      devices_color: `#cacaca`,
      current_repeat_class: `bi bi-arrow-repeat d-flex justify-content-center align-items-center repeat`,
    };

    this.handleQueue = this.handleQueue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRepeat = this.handleRepeat.bind(this);
    this.handleLyrics = this.handleLyrics.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handleDevices = this.handleDevices.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleFullScreen = this.handleFullScreen.bind(this);
    this.handleNewPlayer = this.handleNewPlayer.bind(this);

    window.electron.ipcRenderer.once('get-token', (arg) => {
      if (this.state.token === null) this.setState({ token: arg });
    });
    window.electron.ipcRenderer.getToken();
  }

  handleNewPlayer(val) {
    this.setState({ player: val });
  }

  handlePlayPause(event) {
    if (this.state.play) {
      console.log('paused');
      this.setState({ play: !this.state.play });
    } else {
      console.log('playing');
      this.setState({ play: !this.state.play });
    }
  }

  handleForward(event) {
    console.log('forward');
  }

  handleBackward(event) {
    console.log('backward');
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    const val = event.target.value;
    const { min } = event.target;
    const { max } = event.target;
    const sz = ((val - min) * 100) / (max - min);
    event.target.style.backgroundSize = `${sz}% 100%`;
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleShuffle(event) {
    if (this.state.shuffle) {
      this.setState({ shuffle: false });
      this.setState({ shuffle_color: `#cacaca` });
    } else {
      this.setState({ shuffle: true });
      this.setState({ shuffle_color: `#1db954` });
    }
  }

  handleRepeat(event) {
    switch (this.state.repeat) {
      case 0:
        this.setState({ repeat: (this.state.repeat + 1) % 3 });
        this.setState({ repeat_color: `#1db954` })
        this.setState({ current_repeat_class: `bi bi-arrow-repeat d-flex justify-content-center align-items-center repeat` });
        break;
      case 1:
        this.setState({ repeat: (this.state.repeat + 1) % 3 });
        this.setState({ repeat_color: `#1db954` })
        this.setState({ current_repeat_class: `bi bi-infinity d-flex justify-content-center align-items-center repeat` });
        break;
      case 2:
        this.setState({ repeat: (this.state.repeat + 1) % 3 });
        this.setState({ repeat_color: `#cacaca` })
        this.setState({ current_repeat_class: `bi bi-arrow-repeat d-flex justify-content-center align-items-center repeat` });
        break;
      default:
        break;
    }
  }

  handleLyrics(event) {
    if (this.state.lyrics) {
      this.setState({ lyrics: false });
      this.setState({ lyrics_color: `#cacaca` });
    } else {
      this.setState({ lyrics: true });
      this.setState({ lyrics_color: `#1db954` });
    }
  }

  handleQueue(event) {
    if (this.state.queue) {
      this.setState({ queue: false });
      this.setState({ queue_color: `#cacaca` });
    } else {
      this.setState({ queue: true });
      this.setState({ queue_color: `#1db954` });
    }
  }

  handleDevices(evnet) {
    if (this.state.devices) {
      this.setState({ devices: false });
      this.setState({ devices_color: `#cacaca` });
    } else {
      this.setState({ devices: true });
      this.setState({ devices_color: `#1db954` });
    }
  }

  handleVolumeButton(event) {}

  handleVolume(event) {
    this.setState({ volume: event.target.value });
    const val = event.target.value;
    const { min } = event.target;
    const { max } = event.target;
    const sz = ((val - min) * 100) / (max - min);
    event.target.style.backgroundSize = `${sz}% 100%`;
  }

  handleFullScreen(event) {
    if (this.state.fullscreen) {
      this.setState({ fullscreen: false });
      console.log('fullscreen exit');
    } else {
      this.setState({ fullscreen: true });
      console.log('fullscreen');
    }
    window.electron.ipcRenderer.fullscreen();
  }

  render() {
    const fullscreenClass = `bi ${
      this.state.fullscreen ? 'bi-fullscreen-exit' : 'bi-fullscreen'
    } d-flex justify-content-center align-items-center fullscreen`;
    return (
      <div id="botbar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2" />
            <div className="col-sm-2" />
            <div className="col-sm-4">
              <div className="playpause">
                <button
                  aria-label="Shuffle"
                  id="shuffle"
                  type="button"
                  onClick={this.handleShuffle}
                  style={{ color: this.state.shuffle_color }}
                  className="bi bi-shuffle d-flex justify-content-center align-items-center shuffle"
                />

                <button
                  aria-label="Backward"
                  id="backward"
                  type="button"
                  onClick={this.handleBackward}
                  className="bi bi-skip-start-fill d-flex justify-content-center align-items-center backward"
                />

                <input
                  type="checkbox"
                  value="None"
                  id="playpause"
                  name="check"
                  defaultChecked={true}
                  onChange={this.handlePlayPause}
                />
                <label htmlFor="playpause" tabIndex={1} />

                <button
                  aria-label="Forward"
                  id="forward"
                  type="button"
                  onClick={this.handleForward}
                  className="bi bi-skip-end-fill d-flex justify-content-center align-items-center forward"
                />

                <button
                  aria-label="Repeat"
                  id="repeat"
                  type="button"
                  onClick={this.handleRepeat}
                  style={{ color: this.state.repeat_color }}
                  className={this.state.current_repeat_class}
                />
              </div>
            </div>
            <div className="col-sm-2" />
            <div className="col-sm-2  other-buttons">
              <button
                aria-label="Lyrics"
                id="lyrics"
                type="button"
                onClick={this.handleLyrics}
                style={{ color: this.state.lyrics_color }}
                className="bi bi-chat-square-quote-fill d-flex justify-content-center align-items-center lyrics"
              />
              <button
                aria-label="Queue"
                id="queue"
                type="button"
                onClick={this.handleQueue}
                style={{ color: this.state.queue_color }}
                className="bi bi-music-note-list d-flex justify-content-center align-items-center queue"
              />
              <button
                aria-label="Devices"
                id="devices"
                type="button"
                onClick={this.handleDevices}
                style={{ color: this.state.devices_color }}
                className="bi bi-pc-display d-flex justify-content-center align-items-center devices"
              />
              <button
                aria-label="Fullscreen"
                id="fullscreen"
                type="button"
                onClick={this.handleFullScreen}
                className={fullscreenClass}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-2"></div>
            <div className="col-sm-4">
              <div className="timeline">
                <input
                  id="rangevalue"
                  type="range"
                  min="0"
                  max="0"
                  value={this.state.value}
                  onChange={this.handleChange}
                  defaultValue="0"
                />
              </div>
            </div>
            <div className="col-sm-4 other-buttons">
              <button
                aria-label="VolumeButton"
                id="volume-button"
                type="button"
                onClick={this.handleVolumeButton}
                className="bi bi-volume-up-fill d-flex justify-content-center align-items-center volume-button"
              />
              <div className="volume">
                <input
                  id="rangevolume"
                  type="range"
                  min="0"
                  max="100"
                  value={this.state.volume}
                  onChange={this.handleVolume}
                  defaultValue="100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BottomBar;
