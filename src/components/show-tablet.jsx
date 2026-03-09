
import { useState, useEffect } from "react";

const ShowTablet = () => {
  const [liveRates, setLiveRates] = useState({
    UAH: 41,
    EUR: 0.92,
    USD: 1,
  });

  const [currencyIcon, setCurrencyIcon] = useState("$");
  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        const Rate = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await Rate.json();
        setLiveRates({
          UAH: data.rates.UAH,
          EUR: data.rates.EUR,
          USD: 1,
        });
        console.log("Актуальні курси завантажено:", liveRates);
      } catch (error) {
        console.log("Помилка підвантаження актуального курсу валют");
      }
    };
    fetchCurrencyRates();
  }, []);

  const createHistoryData = (history, currency) => {
    if (!history) return [];
    const historyData = [];

    for (let i = 0; i < history.length; i++) {
      const dateObj = new Date(history[i].date);

      const monthName = dateObj.toLocaleDateString("uk-UA", { month: "long" });

      const income = history[i].income * currency;
      const expenses = history[i].expenses * currency;
      const profit = income - expenses;

      let data = {
        monthName: monthName,
        income: income.toFixed(2),
        expenses: expenses.toFixed(2),
        profit: profit.toFixed(2),
      };

      historyData.unshift(data);
    }

    return historyData;
  };

  const [currency, setCurrency] = useState(1);

  const CreateTabletRows = ({ currency, currencyIcon }) => {
    const data = createHistoryData(
      JSON.parse(localStorage.getItem("history")),
      currency,
    );
    return data.map((map, index) => (
      <tr key={index} style={{ borderBottom: " 1px solid #f0f0f0" }}>
        <td style={{ padding: "12px 0", textTransform: "capitalize" }}>
          {map.monthName}
        </td>
        <td style={{ color: "#8b5cf6" }}>{currencyIcon + map.income}</td>
        <td style={{ color: "#f97316" }}>{currencyIcon + map.expenses}</td>
        <td style={{ color: "#10b981" , paddingLeft: "24px"}}>
          <strong>{currencyIcon + map.profit}</strong>
        </td>
      </tr>
    ));
  };

  return (
    <div className="card">
      <div className="card__header">
        <h3 className="card__title">Динаміка чистого прибутку</h3>
      </div>
      <div className="card__content">
        <table
          className="market-table"
          style={{
            width: " 100%",
            textAlign: "left",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #eee" }}>
              <th style={{ padding: "10px 0" }}>Місяць</th>
              <th>Доходи</th>
              <th>Витрати</th>
              <th>Чистий прибуток</th>
            </tr>
          </thead>
          <tbody id="profit-table-body">
            <CreateTabletRows currency={currency} currencyIcon={currencyIcon} />
          </tbody>
        </table>
        <div
          className="charts__setting--currency"
          style={{
            display: "flex",
            gap: "16px",
            borderTop: "2px solid #eee",
            paddingTop: "16px",
            marginTop: "16px",
          }}
        >
          <button
            type="button"
            className="currency-button"
            onClick={() => {
              setCurrency(1);
              setCurrencyIcon("$");
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor">
              <use href="./public/img/icons.svg#icon-hryvnia"></use>
              <use href="./public/img/icons.svg#icon-hryvnia"></use>
            </svg>
          </button>
          <button
            type="button"
            className="currency-button"
            onClick={() => {
              setCurrency(liveRates.UAH);
              setCurrencyIcon("₴");
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor">
              <use href="./public/img/icons.svg#icon-dollar-sign"></use>
              <use href="./public/img/icons.svg#icon-dollar-sign"></use>
            </svg>
          </button>
          <button
            type="button"
            className="currency-button"
            onClick={() => {
              setCurrency(liveRates.EUR);
              setCurrencyIcon("€");
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor">
              <use href="./public/img/icons.svg#icon-euro"></use>
              <use href="./public/img/icons.svg#icon-euro"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ShowTablet;
