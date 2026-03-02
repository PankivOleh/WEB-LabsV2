const marketRegions = [
    {
        name: "North America",
        multiplier: 1.7,
        aliases: ["north america", "america", "usa", "сша", "америка", "canada", "канада", "united states"]
    },
    {
        name: "Western/Northern Europe",
        multiplier: 1.5,
        aliases: ["europe", "європа", "uk", "britain", "великобританія", "germany", "німеччина", "france", "франція", "sweden", "швеція"]
    },
    {
        name: "Eastern Europe",
        multiplier: 0.8,
        aliases: ["eastern europe", "східна європа", "ukraine", "україна", "poland", "польща", "romania", "румунія", "czech"]
    },
    {
        name: "Asia",
        multiplier: 1.1,
        aliases: ["asia", "азія", "china", "китай", "japan", "японія", "india", "індія", "korea", "корея"]
    }
];

const industryStats = {
    'ecommerce': { baseRevenuePerEmp: 3300, avgSalary: 3000, officeCost: 9000 },
    'tech': { baseRevenuePerEmp: 4200, avgSalary: 3500, officeCost: 10000 },
    'fintech': { baseRevenuePerEmp: 5000, avgSalary: 4500, officeCost: 12000 },
    'health': { baseRevenuePerEmp: 4000, avgSalary: 3200, officeCost: 20000 }
};


const getRegionMultiplier = (region) => {
    let multiplier = 1;
    const cleanInput = region.trim().toLowerCase();
    const foundRegion = marketRegions.find(r => r.aliases.includes(cleanInput));
    return foundRegion ? foundRegion.multiplier : multiplier;
}

const calculateGeneralMultiplier = (regions) => {
    let multipliers = [];
    for ( let i in regions) {
        multipliers.push(getRegionMultiplier(regions[i]));
    }
    return multipliers.reduce((avg , current)=> avg+current, 0) / multipliers.length;
}

const calculateEmployeeRevenue = (employeeCount, industryData) => { 
    let employeeRevenue = 0;
    employeeRevenue = employeeCount * industryData.baseRevenuePerEmp;
    return employeeRevenue;

}



const calculateRevenue = (employees, industry, regions) => {
    let revenue = 0;
    const multiplier = calculateGeneralMultiplier(regions);
    const industryData = industryStats[industry.toLowerCase()];
    revenue = calculateEmployeeRevenue(employees, industryData) * multiplier;
    return revenue;
}

const calculateExpenses = (employees, industry, offices) => {
    const industryData = industryStats[industry.toLowerCase()];
    let expenses = 0;
    expenses += employees * industryData.avgSalary;
    expenses += offices.length * industryData.officeCost;
    return expenses;
}
let employees, industry, regions, offices;

if (localStorage.getItem("settings") === null) {
    employees = document.getElementById("employee-value").textContent;
    industry = document.getElementById("industry").textContent.toLowerCase();
    const marketsText = Array.from(document.querySelectorAll("#markets-list .tag:not(.tag--dashed)"))
        .map(tag => tag.textContent);
    regions = marketsText.length > 0 ? marketsText : ["ukraine"];
    const officesText = Array.from(document.querySelectorAll("#offices-list .tag:not(.tag--dashed)"))
        .map(tag => tag.textContent);
    offices = officesText.length > 0 ? officesText : ["kyiv"];
}
 else {
    const settings = JSON.parse(localStorage.getItem("settings"))
    employees = settings.employees;
    industry = settings.industry;
    regions = settings.markets.split(",").map(m => m.trim());
    offices = settings.offices.split(",").map(o => o.trim());
}

const revenue = calculateRevenue(Number(employees), industry, regions);
const expenses = calculateExpenses(Number(employees), industry, offices);
const profit = revenue - expenses;

const financialData = {
    revenue: revenue,
    expenses: expenses,
    profit: profit
}

localStorage.setItem("financialData", JSON.stringify(financialData));

const applyFinancialData = () => { 
    if (localStorage.getItem("financialData") === null) {
        return;
    }
    const financialData = JSON.parse(localStorage.getItem("financialData"));
    document.getElementById("income-value").textContent = financialData.revenue.toFixed(2);
    document.getElementById("expense-value").textContent = financialData.expenses.toFixed(2);
    document.getElementById("profit-value").textContent = financialData.profit.toFixed(2);
    document.getElementById("margin").textContent = ((financialData.profit / financialData.revenue) * 100).toFixed(1) + "%";
}
applyFinancialData();