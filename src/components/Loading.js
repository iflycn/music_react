import React, { Component } from "react";
import "./Loading.less"

class Loading extends Component {
  render() {
    // template
    return (
      <div className="loading">
        <span>
          <svg viewBox="25 25 50 50">
            <circle cx="50" cy="50" r="20" fill="none"></circle>
          </svg>
        </span>
      </div>
    );
  }
}

export default Loading;
