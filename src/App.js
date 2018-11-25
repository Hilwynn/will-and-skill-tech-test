import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LandingPage from "./pages/landingPage"
import PortfolioPage from "./pages/portfolioPage"

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <Router>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/portfolios/:id" component={PortfolioPage} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
