import { PureComponent } from 'react';
import './bottombar.css';

class BottomBar extends PureComponent {
  render() {
    return (
      <div id="botbar">
        <div className="playpause">
          <input type="checkbox" value="None" id="playpause" name="check" />
          <label htmlFor="playpause" tabIndex={1} />
        </div>
      </div>
    );
  }
}

export default BottomBar;
