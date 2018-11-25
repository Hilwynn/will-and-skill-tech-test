import React from "react"
import { Link } from "react-router-dom"

class portfolioPage extends React.Component {

  state = {
    cash: null,
    currency: null,
    positions: null
  }

  componentDidMount() {
    this.getPortfolio()
  }

  getPortfolio = () => {
    const { id } = this.props.match.params
    const url = `https://beta.stockzoom.com/api/v1/me/portfolios/${id}/`
    
    fetch(url, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        positions: data.position
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    const { positions } = this.state
    
    return (
      <div className="pp-wrapper">
      
        <Link to="/">&#8592; Back</Link>

        <h1 className="heading">Portfolio Positions</h1>

        {positions ?
          (
            <div className="position-wrapper">
              {positions.map(position => {
                const { company, currency, name, price_today, price_open, price_close, price_high, price_low } = position.instrument
                
                return (
                  <div className="position-container" key={position.id}>
                  
                    <h2>{name}</h2>
                    
                    <p className="position-description">{company && company.description}</p>
                    
                    <div className="position-value">
                    
                      <h3>Price List</h3>
                    
                      <div className="position-value-row">
                        <div className="position-value-key">
                          Today:
                        </div>
                        <div className="position-value-value">
                          {price_today !== null ? `${price_today} ${currency}` : "N/A"}
                        </div>
                      </div>
                      
                      <div className="position-value-row">
                        <div className="position-value-key">
                          Open:
                        </div>
                        <div className="position-value-value">
                          {price_open !== null ? `${price_open} ${currency}` : "N/A"}
                        </div>
                      </div>
                      
                      <div className="position-value-row">
                        <div className="position-value-key">
                          Close:
                        </div>
                        <div className="position-value-value">
                          {price_close !== null ? `${price_close} ${currency}` : "N/A"}
                        </div>
                      </div>
                      
                      <div className="position-value-row">
                        <div className="position-value-key">
                          High:
                        </div>
                        <div className="position-value-value">
                          {price_high !== null ? `${price_high} ${currency}` : "N/A"}
                        </div>
                      </div>
                      
                      <div className="position-value-row">
                        <div className="position-value-key">
                          Low:
                        </div>
                        <div className="position-value-value">
                          {price_low !== null ? `${price_low} ${currency}` : "N/A"}
                        </div>
                      </div>
                      
                    </div>
                    
                  </div>
                )
              })}
            </div>
          )
          :
          <p>Loading...</p>
        }
      </div>
    )
  }
}

export default portfolioPage
