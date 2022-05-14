import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const tickers = {
    "BTC": {
      "id": "btc-usd", 
      "name": "Bitcoin",
      "ticker": "BTC"
    },
    "ETH": {
      "id": "eth-usd", 
      "name": "Ethereum",
      "ticker": "ETH"
    }
  }

  return (
    <>
    <div>Dashboard</div>
    {Object.values(tickers).map(({id, name}) => (
      <li key={id}>
        <Link to={`/charts/${id}`} >{name}</Link>
      </li>
    ))}
    </>
  )
}

export default Dashboard