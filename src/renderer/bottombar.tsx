import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/bootstrap-icons.svg';
import './bottombar.css';
import internal from 'stream';

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shuffle: false,
      repeat: 0,
      shuffle_color: `#cacaca`,
      repeat_color: `#cacaca`,
      current_repeat_class: `bi bi-arrow-repeat d-flex justify-content-center align-items-center repeat`,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleForward = this.handleForward.bind(this);
    this.handleBackward = this.handleBackward.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
    this.handleRepeat = this.handleRepeat.bind(this);
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

  handleForward(event) {
    //
  }

  handleBackward(event) {
    //
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

  render() {
    return (
      <div id="botbar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <div className="playpause">
                <button
                  aria-label="Shuffle"
                  id="shuffle"
                  type="submit"
                  onClick={this.handleShuffle}
                  style={{ color: this.state.shuffle_color }}
                  className="bi bi-shuffle d-flex justify-content-center align-items-center shuffle"
                />

                <button
                  aria-label="Back"
                  id="backward"
                  type="submit"
                  onClick={this.handleForward}
                  className="bi bi-skip-start-fill d-flex justify-content-center align-items-center backward"
                />

                <input
                  type="checkbox"
                  value="None"
                  id="playpause"
                  name="check"
                />
                <label htmlFor="playpause" tabIndex={1} />

                <button
                  aria-label="Fore"
                  id="foward"
                  type="submit"
                  onClick={this.handleBackward}
                  className="bi bi-skip-end-fill d-flex justify-content-center align-items-center forward"
                />

                <button
                  aria-label="Repeat"
                  id="repeat"
                  type="submit"
                  onClick={this.handleRepeat}
                  style={{ color: this.state.repeat_color }}
                  className={this.state.current_repeat_class}
                />
              </div>
            </div>
            <div className="col-sm-4"></div>
          </div>

          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <div className="timeline">
                <input
                  id="rangevalue"
                  type="range"
                  min=""
                  max=""
                  onChange={this.handleChange}
                  defaultValue="0"
                />
              </div>
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default BottomBar;
