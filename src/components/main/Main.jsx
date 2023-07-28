import axios from "axios";
import { useEffect, useState } from "react";

const Main = () => {
  const [currencyRates, setCurrencyRates] = useState([]);
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const host = "https://api.frankfurter.app/latest";

  useEffect(() => {
    axios
      .get(host)
      .then(function (response) {
        const { rates } = response.data;
        setCurrencyRates(rates);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const convertCurrency = () => {
      if (currencyFrom === currencyTo) {
        setConvertedAmount(amount);
        return;
      }

      if (currencyRates[currencyFrom] && currencyRates[currencyTo]) {
        const rateFrom = currencyRates[currencyFrom];
        const rateTo = currencyRates[currencyTo];
        const convertedValue = (amount / rateFrom) * rateTo;
        setConvertedAmount(convertedValue);
      }
    };

    convertCurrency();
  }, [amount, currencyFrom, currencyTo, currencyRates]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(value > 0 ? value : 1);
  };

  return (
    <main>
      <div className="amount-field">
        <label>Amount</label>
        <input type="number" Value={amount} min={1} onChange={handleAmountChange} />
      </div>
      <div className="dropdown-field">
        <div className="from-dropdown-field">
          <label>From</label>
          <select value={currencyFrom} onChange={(e) => setCurrencyFrom(e.target.value)}>
            {Object.keys(currencyRates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="to-dropdown-filed">
          <label>To</label>
          <select value={currencyTo} onChange={(e) => setCurrencyTo(e.target.value)}>
            {Object.keys(currencyRates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="output-filed">
        <p className="output">
          {amount} {currencyFrom} = {convertedAmount.toFixed(2)} {currencyTo}
        </p>
      </div>
    </main>
  );
};

export default Main;
