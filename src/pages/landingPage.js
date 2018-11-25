import React, { Component } from "react"
import { Link } from "react-router-dom"

class LandingPage extends Component {
  state = {
    email: "",
    password: "",
    userPortfolios: null
  }
  
  componentDidMount() {
    if (sessionStorage.getItem("token")) {
      this.getUserPortfolios()
    }
  }
  
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  handleLogin = event => {
    event.preventDefault()
    
    const { email, password } = this.state
    const user = { email, password }
    
    fetch("https://beta.stockzoom.com/api-token-auth/", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      sessionStorage.setItem("token", data.token)
      this.getUserPortfolios()
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  handleLogout = () => {
    sessionStorage.removeItem("token")
    this.setState({
      userPortfolios: null
    })
  }
  
  getUserPortfolios = () => {
    const url = "https://beta.stockzoom.com/api/v1/me/portfolios/"
    
    fetch(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        userPortfolios: data.results
      })
    })
    .catch(err => {
      console.log(err)
    })
  }


  render() {
    const { email, password, userPortfolios } = this.state

    if (sessionStorage.getItem("token")) {
      console.log(userPortfolios)
      return (
        <div className="lp-wrapper">
          {userPortfolios ?
            (
              <div className="user-profile">
              
              <button onClick={this.handleLogout}>Log out</button>
              
                <h1 className="heading">{userPortfolios[0].user.first_name}'s Portfolios</h1>
                
                <div className="user-portfolios">
                  
                  {userPortfolios && userPortfolios.map((listing, index) => (
                    <Link
                      key={listing.id}
                      to={`/portfolios/${listing.id}`}>

                      <div className="user-portfolios-link-container">
                        <p className="user-portfolios-link">
                          Portfolio {index + 1}: {listing.available_cash} {listing.currency}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                
              </div>
            )
            : 
            <p>Loading...</p>
          }
        </div>
      )
    } else {
      return (
        <div className="lp-wrapper">
        
          <h1 className="heading">Log In</h1>
          
          <form className="login-form" name="loginForm" onSubmit={this.handleLogin}>

            <div className="input-container">
              <label className="input-label" htmlFor="email"><p>Email</p></label>
              <input
                className="input-field"
                name="email"
                onChange={this.handleChange}
                placeholder="Email"
                type="email"
                value={email}
                required />
            </div>

            <div className="input-container">
              <label className="input-label" htmlFor="password"><p>Password</p></label>
              <input
                className="input-field"
                name="password"
                onChange={this.handleChange}
                placeholder="Password"
                type="password"
                value={password}
                required />
            </div>

            <button type="submit">Sign in</button>

          </form>
          
        </div>
      )
    }
  }
}

export default LandingPage
