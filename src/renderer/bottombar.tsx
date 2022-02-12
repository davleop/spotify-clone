import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/bootstrap-icons.svg';
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
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <div className="playpause">
                <button
                  aria-label="Back"
                  id="backward skip-start-fill"
                  type="submit"
                  onClick={this.handleSubmit}
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
                  onClick={this.handleSubmit}
                  className="bi bi-skip-end-fill d-flex justify-content-center align-items-center forward"
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
