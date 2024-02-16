import React, { useState} from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [symbolInput, setSymbolInput] = useState('');
  const [stockData, setStockData] = useState(null);

  const fetchStockData = async (symbol) => {
    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=cn7fs9pr01qgjtj4jbs0cn7fs9pr01qgjtj4jbsg`
      );
      setStockData(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const handleInputChange = (event) => {
    setSymbolInput(event.target.value);
  };

  const handleSearch = () => {
    if (symbolInput) {
      fetchStockData(symbolInput);
    }
  };

  const handleRefresh = () => {
    if (symbolInput) {
      fetchStockData(symbolInput);
    }
  };

  return (
    <div>
      <h1>Stock Data (For US Companies)</h1>
      <div>
        <label>Company Symbol: </label>
        <input type="text" value={symbolInput} onChange={handleInputChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {stockData && (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Current Price</th>
              <th>High Price</th>
              <th>Low Price</th>
              <th>Open Price</th>
              <th>Previous Close</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{symbolInput}</td>
              <td>{stockData.c} $</td>
              <td>{stockData.h} $</td>
              <td>{stockData.l} $</td>
              <td>{stockData.o} $</td>
              <td>{stockData.pc} $</td>
            </tr>
          </tbody>
        </table>
      )}
      {stockData && (
        <div>
          <button onClick={handleRefresh}>Refresh Data</button>
        </div>
      )}
    </div>
  );
};

export default App;
