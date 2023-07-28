import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

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

  const handleKeyPress = (event) => {
    // Prevent typing the negative sign ("-/+") character
    if (event.key === "-" || event.key === "+") {
      event.preventDefault();
    }
  };

  return (
    <main>
      <div className="amount-field">
        <FormControl fullWidth="true">
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">{/*$*/}</InputAdornment>} label="Amount" defaultValue={amount} type="number" inputProps={{ min: 0 }} onKeyPress={handleKeyPress} onChange={handleAmountChange} />
        </FormControl>
      </div>
      <div className="dropdown-field">
        <div className="from-dropdown-field">
          <FormControl size="small" fullWidth="true">
            <InputLabel id="demo-select-small-label">From</InputLabel>
            <Select labelId="demo-select-small-label" id="demo-select-small" value={currencyFrom} label="From" onChange={(e) => setCurrencyFrom(e.target.value)}>
              {Object.keys(currencyRates).map((currency) => (
                <MenuItem value={currency} key={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="to-dropdown-filed">
          <FormControl size="small" fullWidth="true">
            <InputLabel id="demo-select-small-label">To</InputLabel>
            <Select labelId="demo-select-small-label" id="demo-select-small" value={currencyTo} label="To" onChange={(e) => setCurrencyTo(e.target.value)}>
              {Object.keys(currencyRates).map((currency) => (
                <MenuItem value={currency} key={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
