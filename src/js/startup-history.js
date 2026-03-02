const curentData = {
    employees: document.getElementById("employee-value").textContent,
    income: document.getElementById("income-value").textContent,
    expenses: document.getElementById("expense-value").textContent
}
const cleanNum = (str) => Number(str.replace(/[^0-9.-]+/g, "")) || 0;
const createHistory = (data , month) => { 
    let history = [{
        date: new Date(),
        employees: cleanNum(data.employees),
        income: cleanNum(data.income),
        expenses: cleanNum(data.expenses)
    }]
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

        const randomGrowthRate = (Math.random() * 0.08) + 0.02;
        tempIncome = tempIncome / (1 + randomGrowthRate);

        const randomExpemsesRate = (Math.random() * 0.08) + 0.02;
        tempExpenses = tempExpenses / (1 + randomExpemsesRate);

        let tempData = {
            date: historyDate,
            employees: tempCount,
            income: Math.round(tempIncome),
            expenses: Math.round(tempExpenses)
       }
       history.unshift(tempData);
    }
    return history; 
}


const procentChange = (current, previous) => {
    if (previous === 0) {
        return "N/A";
    }
    procent = ((current - previous) / previous) * 100;
    if (procent > 0) {
        return "+" + procent.toFixed(1) + "%";
    }
        return  procent.toFixed(1) + "%";
}
const intChange = (current, previous) => {
    if (current > previous) {
        return "+" + (current - previous);
    } else if (current < previous) {
        return (previous - current);
    } else {
        return "0";
    }
}

const applyHistory = () => {
    if (localStorage.getItem("history") === null) {
        console.log("No history data found.");
        return;
    }
    const history = JSON.parse(localStorage.getItem("history"));
    const current = history[history.length - 1];
    const previous = history[history.length - 2];
    document.getElementById("employee-increase").textContent = intChange(current.employees, previous.employees);
    document.getElementById("income-increase").textContent = procentChange(current.income, previous.income);
    document.getElementById("expense-increase").textContent = procentChange(current.expenses, previous.expenses);
}
let month = 12;
if (localStorage.getItem("history") === null ||localStorage.getItem("history") === undefined) {
    const simulatedHistory = createHistory(curentData, month);
    localStorage.setItem("history", JSON.stringify(simulatedHistory));
    console.log(simulatedHistory);
}
applyHistory();