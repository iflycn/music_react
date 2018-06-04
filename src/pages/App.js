import React, { Component } from "react"
import { HashRouter as Router, Route } from "react-router-dom"
import "./App.less"
import Home from "./Home"
import Detail from "./Detail"

class App extends Component {
  render() {
    // template
    return (
      <Router>
        <div className="main">
          <Route path="/" exact component={Home} />
          <Route path="/detail/:id" component={Detail} />
        </div>
      </Router>
    );
  }
}

export default App;
