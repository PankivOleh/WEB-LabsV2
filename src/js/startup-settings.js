const confirmButton = document.querySelector(".modal-setting__button");
DataconfirmButton = confirmButton.addEventListener("click", () => {
    let input = document.getElementById("company-name");
    const companyName = input.value;
    input = document.getElementById("company-industry");
    const industry = input.value;
    input = document.getElementById("employees");
    const employees = input.value;
    input = document.getElementById("markets");
    const markets = input.value;
    input = document.getElementById("offices");
    const offices = input.value;
    let settings = {
        companyName: companyName,
        industry: industry,
        employees: employees,
        markets: markets,
        offices: offices
    }
    localStorage.setItem("settings", JSON.stringify(settings));
    if (localStorage.getItem("history") !== null) {
        localStorage.removeItem("history");
    }
}
)
const marketsHTML = (markets) => {
    return markets.map(market => `<span class="tag tag--accent">${market}</span>`).join("");
}
const applyMarkets = (markets) => {
    const marketsContainer = document.getElementById("markets-list");
    marketsContainer.innerHTML = marketsHTML(markets);
}
const officesHTML = (offices) => {
    return offices.map(office => `<span class="tag">${office}</span>`).join("");
}
const applyOffices = (offices) => {
    const officesContainer = document.getElementById("offices-list");
    officesContainer.innerHTML = officesHTML(offices);
}

const applySettings = () => {
    if (localStorage.getItem("settings") === null) {
    }
    const settings = JSON.parse(localStorage.getItem("settings"));
    document.getElementById("employee-value").textContent = settings.employees;
    document.getElementById("name").textContent = settings.companyName;
    document.getElementById("industry").textContent = settings.industry;
    const markets = settings.markets.split(",").map(m => m.trim());
    applyMarkets(markets);
    const offices = settings.offices.split(",").map(o => o.trim());
    applyOffices(offices);

}       
applySettings();