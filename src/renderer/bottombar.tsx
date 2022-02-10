import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './bottombar.css';

class BottomBar extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    return (
      <div id="botbar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm"></div>
            <div className="col-sm">
              <div className="playpause">
                <input type="checkbox" value="None" id="playpause" name="check" />
                <label htmlFor="playpause" tabIndex={1} />
              </div>
            </div>
            <div className="col-sm"></div>
          </div>

          <div className="row">
            <div className="col-sm"></div>
            <div className="col-sm">
              <div className="timeline">
                <input
                  id="rangevalue"
                  type="range"
                  min="0"
                  max="100"
                  onChange={this.handleChange}
                  defaultValue="0"
                />
              </div>
            </div>
            <div className="col-sm"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default BottomBar;
