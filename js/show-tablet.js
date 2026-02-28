const history = JSON.parse(localStorage.getItem("history"));
const tablet = document.getElementById("profit-table-body");
let liveRates = {
  UAH: 41,
  EUR: 0.92,
  USD: 1,
};
let currency = 1;
let currencyIcon = "$";

const fetchCurrencyRates = async () => {
  try {
    const Rate = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await Rate.json();
    liveRates.EUR = data.rates.EUR;
    liveRates.UAH = data.rates.UAH;
    console.log("Актуальні курси завантажено:", liveRates);
  } catch (error) {
    console.log("Помилка підвантаження актуального курсу валют");
  }
};

const applyTbletData = (data, currencyIcon) => {
  if (!tablet) {
    return;
  }
  const html = data.map(
    (map) => `
            <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 0; text-transform: capitalize;">${map.monthName}</td>
                <td style="color: #8b5cf6;">${currencyIcon + map.income}</td>
                <td style="color: #f97316;">${currencyIcon + map.expenses}</td>
                <td style = "color:#10b981 "><strong>${currencyIcon + map.profit}</strong></td>
            </tr>
        `,
  );
  tablet.innerHTML = html.join("");
};

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

document.getElementById("euro-button").addEventListener("click", () => {
  currency = liveRates.EUR;
  currencyIcon = "€";
  applyTbletData(createHistoryData(history, currency), currencyIcon);
});
document.getElementById("hryvnia-button").addEventListener("click", () => {
  currency = liveRates.UAH;
  currencyIcon = "₴";
  applyTbletData(createHistoryData(history, currency), currencyIcon);
});
document.getElementById("dollar-button").addEventListener("click", () => {
  currency = liveRates.USD;
  currencyIcon = "$";
  applyTbletData(createHistoryData(history, currency), currencyIcon);
});

fetchCurrencyRates();
applyTbletData(createHistoryData(history, currency), currencyIcon);
