import ShowChart from "../components/show-chart";
import ModalSettings from "../components/modal-setting";
import ShowTablet from "../components/show-tablet";
import { useEffect, useState , useRef } from "react";

const calculateStats = (data) => {
  const marketRegions = [
    {
      name: "North America",
      multiplier: 1.7,
      aliases: [
        "north america",
        "america",
        "usa",
        "сша",
        "америка",
        "canada",
        "канада",
        "united states",
      ],
    },
    {
      name: "Western/Northern Europe",
      multiplier: 1.5,
      aliases: [
        "europe",
        "європа",
        "uk",
        "britain",
        "великобританія",
        "germany",
        "німеччина",
        "france",
        "франція",
        "sweden",
        "швеція",
      ],
    },
    {
      name: "Eastern Europe",
      multiplier: 0.8,
      aliases: [
        "eastern europe",
        "східна європа",
        "ukraine",
        "україна",
        "poland",
        "польща",
        "romania",
        "румунія",
        "czech",
      ],
    },
    {
      name: "Asia",
      multiplier: 1.1,
      aliases: [
        "asia",
        "азія",
        "china",
        "китай",
        "japan",
        "японія",
        "india",
        "індія",
        "korea",
        "корея",
      ],
    },
  ];

  const industryStats = {
    ecommerce: { baseRevenuePerEmp: 3300, avgSalary: 3000, officeCost: 9000 },
    tech: { baseRevenuePerEmp: 4200, avgSalary: 3500, officeCost: 10000 },
    fintech: { baseRevenuePerEmp: 5000, avgSalary: 4500, officeCost: 12000 },
    health: { baseRevenuePerEmp: 4000, avgSalary: 3200, officeCost: 20000 },
  };

  const getRegionMultiplier = (region) => {
    let multiplier = 1;
    const cleanInput = region.trim().toLowerCase();
    const foundRegion = marketRegions.find((r) =>
      r.aliases.includes(cleanInput),
    );
    return foundRegion ? foundRegion.multiplier : multiplier;
  };

  const calculateGeneralMultiplier = (regionsString) => {
    const regionsArray =
      typeof regionsString === "string" ? regionsString.split(",") : [];
    if (regionsArray.length === 0) return 1;

    let multipliers = [];
    for (let region of regionsArray) {
      multipliers.push(getRegionMultiplier(region));
    }
    return (
      multipliers.reduce((avg, current) => avg + current, 0) /
      multipliers.length
    );
  };

  const calculateEmployeeRevenue = (employeeCount, industryData) => {
    return employeeCount * industryData.baseRevenuePerEmp;
  };

  const calculateRevenue = (employees, industry, regions) => {
    const multiplier = calculateGeneralMultiplier(regions);
    const industryData =
      industryStats[industry.toLowerCase()] || industryStats.tech;
    return calculateEmployeeRevenue(employees, industryData) * multiplier;
  };

  const calculateExpenses = (employees, industry, offices) => {
    const industryData =
      industryStats[industry.toLowerCase()] || industryStats.tech;
    let expenses = employees * industryData.avgSalary;
    const officeCount =
      typeof offices === "string" ? offices.split(",").length : 1;
    expenses += officeCount * industryData.officeCost;
    return expenses;
  };

  const income = calculateRevenue(data.employee, data.industry, data.region);
  const expenses = calculateExpenses(
    data.employee,
    data.industry,
    data.offices,
  );
  const profit = income - expenses;
  const margin = income > 0 ? ((profit / income) * 100).toFixed(1) : 0;

  return {
    income: Math.round(income),
    expenses: Math.round(expenses),
    profit: Math.round(profit),
    margin: margin,
  };
};

const cleanNum = (value) => {
  if (typeof value === "number") return value;
  if (!value) return 0;

  return Number(value.replace(/[^0-9.-]+/g, "")) || 0;
};
const createHistory = (data, month) => {
  let history = [
    {
      date: new Date(),
      employees: cleanNum(data.employees),
      income: cleanNum(data.income),
      expenses: cleanNum(data.expenses),
    },
  ];
  let historyDate;
  let tempCount = cleanNum(data.employees);
  let tempIncome = cleanNum(data.income);
  let tempExpenses = cleanNum(data.expenses);
  for (let i = 0; i < month; i++) {
    historyDate = new Date();
    historyDate.setDate(1);
    historyDate.setMonth(historyDate.getMonth() - i);

    let hiredThatMonth = Math.floor(Math.random() * 4);
    tempCount = tempCount - hiredThatMonth;
    if (tempCount < 1) {
      tempCount = 1;
    }

    const randomGrowthRate = Math.random() * 0.08 + 0.02;
    tempIncome = tempIncome / (1 + randomGrowthRate);

    const randomExpensesRate = Math.random() * 0.08 + 0.02;
    tempExpenses = tempExpenses / (1 + randomExpensesRate);

    let tempData = {
      date: historyDate,
      employees: tempCount,
      income: Math.round(tempIncome),
      expenses: Math.round(tempExpenses),
    };
    history.unshift(tempData);
  }
  return history;
};

const percentChange = (current, previous) => {
  if (previous === 0) {
    return "N/A";
  }
  let procent = ((current - previous) / previous) * 100;
  if (procent > 0) {
    return +procent.toFixed(1);
  }
  return procent.toFixed(1);
};
const intChange = (current, previous) => {
  if (current > previous) {
    return +(current - previous);
  } else if (current < previous) {
    return previous - current;
  } else {
    return "0";
  }
};

const applyHistory = (history) => {
  const current = history[history.length - 1];
  const previous = history[history.length - 2];

  const employeeIncrease = intChange(current.employees, previous.employees);
  const incomeIncrease = percentChange(current.income, previous.income);
  const expenseIncrease = percentChange(current.expenses, previous.expenses);
  const increaseData = {
    employeeIncrease: employeeIncrease,
    incomeIncrease: incomeIncrease,
    expenseIncrease: expenseIncrease,
  };
  return increaseData;
};

function initStartupHistory(employees, income, expenses) {
  const curentData = {
    employees: employees,
    income: income,
    expenses: expenses,
  };

  if (!curentData.employees || !curentData.income || !curentData.expenses) {
    console.warn("DOM elements for startup data not found yet");
    return;
  }

  let month = 12;

  const simulatedHistory = createHistory(curentData, month);
  return simulatedHistory;
}

const Home = () => {
  const [companyData, submitData] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("financialData"));
    if (saved) {
      return saved;
    } else {
      return {
        name: "TechStart",
        industry: "tech",
        employee: 25,
        region: "Україна, Польща",
        offices: "Київ, Варшава",
      };
    }
  });

  const stats = calculateStats(companyData);


  const displayIndustry =
    {
      tech: "Технології",
      fintech: "Фінтех",
      ecommerce: "E-commerce",
      health: "Здоров'я",
    }[companyData.industry] || companyData.industry;

  const isFirstRender = useRef(true)

 const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("history");
    if (savedHistory) {
      return JSON.parse(savedHistory);
    } else {
      const newHistory = initStartupHistory(companyData.employee, stats.income, stats.expenses);
      localStorage.setItem("history", JSON.stringify(newHistory));
      return newHistory;
    }
  });

  const [increaseData, setIncreaseData] = useState(() => applyHistory(history));

  // 1. ПРАВИЛЬНИЙ GET-ЗАПИТ
  useEffect(() => {
    fetch('http://localhost:5000/api/company')
        .then(res => res.json())
        .then(data => {
            if (!data.message && data.name) {
                // Використовуємо submitData, бо так ти назвав функцію у useState
                const serverData = {
                  name: data.name,
                  industry: data.industry || companyData.industry,
                  employee: data.employees || companyData.employee,
                  region: companyData.region, 
                  offices: companyData.offices 
                };
                submitData(serverData);
                localStorage.setItem("financialData", JSON.stringify(serverData));
            }
        })
        .catch(err => console.error("Помилка підключення до сервера:", err));
  }, []);

  // 2. ОБ'ЄДНАНА ФУНКЦІЯ ЗБЕРЕЖЕННЯ (Локально + на Сервер)
  const handleSavedData = async (newData) => {
    // Спочатку зберігаємо локально
    submitData(newData);
    localStorage.setItem("financialData", JSON.stringify(newData));

    const newStats = calculateStats(newData);
    const newHistory = initStartupHistory(newData.employee, newStats.income, newStats.expenses);
    
    setHistory(newHistory);
    localStorage.setItem("history", JSON.stringify(newHistory));
    setIncreaseData(applyHistory(newHistory));

    // А ТЕПЕР ВІДПРАВЛЯЄМО В MONGODB
    try {
        const response = await fetch('http://localhost:5000/api/company', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
                userEmail: currentUserEmail, 
                name: newData.name,
                industry: newData.industry,
                employees: newData.employee,
                revenue: newStats.income,
                expenses: newStats.expenses, 
                profit: newStats.profit,    
                region: newData.region,    
                offices: newData.offices     
})
        });

        const result = await response.json();

        if (!response.ok) {
            // Якщо ім'я коротше 5 символів - показуємо помилку
            alert(result.error); 
            return;
        }

        console.log("Успішно збережено на сервері!");
    } catch (error) {
        console.error("Помилка сервера:", error);
    }
  };
  return (
    <main className="main">
      <div className="main__container">
        <section className="startup">
          <div className="startup__header">
            <div className="startup__info">
              <h2 className="startup__name" id="name">
                {companyData.name}
              </h2>
              <p className="startup__industry" id="industry">
                {companyData.industry}
              </p>
            </div>

            <ModalSettings companyData={companyData} onSave={handleSavedData} />
          </div>
          <div className="metrics">
            <div className="card card--highlight">
              <div className="card__header">
                <h3 className="card__title">
                  <svg
                    className="card__icon card__icon--violet"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                  >
                    <use href="/img/icons.svg#icon-users"></use>
                  </svg>
                  Працівники
                </h3>
              </div>
              <div className="card__content">
                <div className="metric">
                  <div className="metric__value" id="employee-value">
                    {companyData.employee}
                  </div>
                  <p className="metric__label metric__label--success">
                    <span id="employee-increase">
                      {" "}
                      {increaseData.employeeIncrease}
                    </span>{" "}
                    цього місяця
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card__header">
                <h3 className="card__title">
                  <svg
                    className="card__icon card__icon--green"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                  >
                    <use href="/img/icons.svg#icon-dollar"></use>
                  </svg>
                  Дохід
                </h3>
              </div>
              <div className="card__content">
                <div className="metric">
                  <div className="metric__value" id="income-value">
                    ${stats.income}
                  </div>
                  <p className="metric__label metric__label--success">
                    <span id="income-increase">
                      +{increaseData.incomeIncrease}%
                    </span>{" "}
                    від минулого місяця
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card__header">
                <h3 className="card__title">
                  <svg
                    className="card__icon card__icon--orange"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                  >
                    <use href="/img/icons.svg#icon-trend-down"></use>
                  </svg>
                  Витрати
                </h3>
              </div>
              <div className="card__content">
                <div className="metric">
                  <div className="metric__value" id="expense-value">
                    ${stats.expenses.toLocaleString()}
                  </div>
                  <p className="metric__label">
                    <span id="expense-increase">
                      +{increaseData.expenseIncrease}%
                    </span>{" "}
                    від минулого місяця
                  </p>
                </div>
              </div>
            </div>

            <div className="card card--gradient">
              <div className="card__header">
                <h3 className="card__title">
                  <svg
                    className="card__icon card__icon--violet"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                  >
                    <use href="/img/icons.svg#icon-briefcase"></use>
                  </svg>
                  Прибуток
                </h3>
              </div>
              <div className="card__content">
                <div className="metric">
                  <div
                    className="metric__value metric__value--accent"
                    id="profit-value"
                  >
                    ${stats.profit.toLocaleString()}
                  </div>
                  <p className="metric__label metric__label--accent">
                    Маржа <span id="margin">{stats.margin}%</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="charts">
            <ShowChart
              historyData={JSON.parse(localStorage.getItem("history"))}
            />
          </div>
          <div className="tablet">
            <ShowTablet />
          </div>

          <div className="info-section">
            <div className="card">
              <div className="card__header">
                <h3 className="card__title card__title--large">
                  <svg
                    className="card__icon card__icon--violet"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <use href="/img/icons.svg#icon-pin"></use>
                  </svg>
                  Ринки збуту
                </h3>
              </div>
              <div className="card__content">
                <div className="tags" id="markets-list">
                  {companyData.region.split(",").map((item) => (
                    <span key={item} className="tag tag--accent">
                      {item.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card__header">
                <h3 className="card__title card__title--large">
                  <svg
                    className="card__icon card__icon--violet"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <use href="/img/icons.svg#icon-building"></use>
                  </svg>
                  Офіси
                </h3>
              </div>
              <div className="card__content">
                <div className="tags" id="offices-list">
                  {companyData.offices.split(",").map((item) => (
                    <span key={item} className="tag">
                      {item.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
export default Home;
