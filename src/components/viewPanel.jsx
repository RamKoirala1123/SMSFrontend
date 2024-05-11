import React, { Component } from "react";

class ViewPanel extends Component {
  render() {
    return (
      <div className="container-fluid view-panel">{this.props.children}</div>
    );
  }
}

class LeftPanel extends Component {
  render() {
    return (
      <div className="d-none d-md-block container-fluid w-100" id="left-panel">
        {this.props.children}
      </div>
    );
  }
}

class RightPanel extends Component {
  render() {
    return (
      <div className="container-fluid" id="right-panel">
        {this.props.children}
      </div>
    );
  }
}

export { LeftPanel, RightPanel, ViewPanel };
