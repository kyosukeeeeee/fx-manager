import { useEffect, useState } from "react";

function App() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/trades")
      .then((res) => res.json())
      .then((data) => setTrades(data));
  }, []);

  return (
    <div>
      <h1>Trades</h1>
      <ul>
        {trades.map((trade) => (
          <li key={trade.id}>
            {trade.symbol} / {trade.side} / {trade.net_profit}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;