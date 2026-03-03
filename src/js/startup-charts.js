let financeChartInstance = null;

const renderFinanceChart = (dataToRender) => {
  const ctx = document.getElementById("financeChart");
  if (!ctx) return;

  const chartDates = dataToRender.map((it) => {
    const d = new Date(it.date);
    return d.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  });
  const chartIncomes = dataToRender.map((it) => it.income);
  const chartExpenses = dataToRender.map((it) => it.expenses);

  if (financeChartInstance) {
    financeChartInstance.data.labels = chartDates;
    financeChartInstance.data.datasets[0].data = chartIncomes;
    financeChartInstance.data.datasets[1].data = chartExpenses;
    financeChartInstance.update();
    return;
  }

  financeChartInstance = new Chart(ctx.getContext("2d"), {
    type: "line",
    data: {
      labels: chartDates,
      datasets: [
        {
          data: chartIncomes,
          label: "Доходи",
          borderColor: "#a855f7",
          tension: 0.4,
        },
        {
          data: chartExpenses,
          label: "Витрати",
          borderColor: "#f97316",
          backgroundColor: "transparent",
          tension: 0.4,
        },
      ],
    },
    options: { responsive: true, plugins: { tooltip: { enabled: true } } },
  });
};

const historyData = JSON.parse(localStorage.getItem("history")) || [];

renderFinanceChart(historyData);

const dateInputs = document.querySelectorAll(".charts__setting__input");
const startDateInput = dateInputs[0];
const endDateInput = dateInputs[1];

const filterChartByDate = () => {
  const startValue = startDateInput.value;
  const endValue = endDateInput.value;

  if (!startValue || !endValue) {
    renderFinanceChart(historyData);
    return;
  }

  const startDate = new Date(startValue);
  const endDate = new Date(endValue);

  // Фільтруємо масив: залишаємо тільки ті об'єкти, дата яких потрапляє в діапазон
  const filteredHistory = historyData.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });

  renderFinanceChart(filteredHistory);
};

if (startDateInput && endDateInput) {
  startDateInput.addEventListener("change", filterChartByDate);
  endDateInput.addEventListener("change", filterChartByDate);
}
