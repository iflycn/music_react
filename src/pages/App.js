import React, { Component } from "react"
import { HashRouter as Router, Route } from "react-router-dom"
import { Provider } from "rectx"
import "./App.less"
import Home from "./Home"
import Detail from "./Detail"
import Audio from "../components/Audio"

class App extends Component {
  render() {
    // template
    return (
      <Provider>
        <Router>
          <div className="main">
            <Route path="/" exact component={Home} />
            <Route path="/detail/:id" component={Detail} />
            <Audio />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
