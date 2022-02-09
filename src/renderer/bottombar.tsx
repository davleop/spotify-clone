import { PureComponent } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './bottombar.css';

class BottomBar extends PureComponent {
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
                <input id="rangevalue" type="range" min="0" max="100" />
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
