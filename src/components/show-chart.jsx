import React, { useEffect, useState } from "react";

const ShowChart = () => {

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        let financeChartInstance = null;
        const ctx = document.getElementById("financeChart");
        if (!ctx || !window.Chart) return;

        const historyData = JSON.parse(localStorage.getItem("history")) || [];

        const renderFinanceChart = (dataToRender) => {
            const chartDates = dataToRender.map((it) => {
                const d = new Date(it.date);
                return d.toLocaleDateString("uk-UA", { day: "numeric", month: "short", year: "numeric" });
            });
            
            const chartIncomes = dataToRender.map((it) => it.income);
            const chartExpenses = dataToRender.map((it) => it.expenses);
            const chartNetProfits = dataToRender.map((it) => it.income - it.expenses); // Третя лінія

            if (financeChartInstance) {
                financeChartInstance.data.labels = chartDates;
                financeChartInstance.data.datasets[0].data = chartIncomes;
                financeChartInstance.data.datasets[1].data = chartExpenses;
                financeChartInstance.data.datasets[2].data = chartNetProfits;
                financeChartInstance.update();
                applyChartVisibility();
                return;
            }

            financeChartInstance = new window.Chart(ctx.getContext("2d"), {
                type: "line",
                data: {
                    labels: chartDates,
                    datasets: [
                        { label: "Доходи", data: chartIncomes, borderColor: "#a855f7", tension: 0.4 },
                        { label: "Витрати", data: chartExpenses, borderColor: "#f97316", backgroundColor: "transparent", tension: 0.4 },
                        { label: "Чистий прибуток", data: chartNetProfits, borderColor: "#10b981", backgroundColor: "transparent", tension: 0.4 },
                    ],
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { tooltip: { enabled: true } } },
            });

            applyChartVisibility();
        };

        const applyChartVisibility = () => {
            if (!financeChartInstance) return;
            const incomeChecked = document.getElementById('chk-income')?.checked ?? true;
            const expenseChecked = document.getElementById('chk-expense')?.checked ?? true;
            const netProfitChecked = document.getElementById('chk-profit')?.checked ?? true;

            financeChartInstance.data.datasets[0].hidden = !incomeChecked;
            financeChartInstance.data.datasets[1].hidden = !expenseChecked;
            financeChartInstance.data.datasets[2].hidden = !netProfitChecked;
            financeChartInstance.update();
        };

        document.querySelectorAll('.chart-filter__checkbox').forEach(chk => {
            chk.addEventListener('change', applyChartVisibility);
        });

        const startDateInput = document.getElementById("chart-start-date");
        const endDateInput = document.getElementById("chart-end-date");

        const filterChartByDate = () => {
            const startValue = startDateInput?.value;
            const endValue = endDateInput?.value;

            if (!startValue || !endValue) {
                renderFinanceChart(historyData);
                return;
            }

            const startDate = new Date(startValue);
            const endDate = new Date(endValue);

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


        renderFinanceChart(historyData);
        return () => {
            if (financeChartInstance) {
                financeChartInstance.destroy(); 
            }
        };
    });

    return (
        <>
            <div className="chart">
                <div className="chart__placeholder">
                    <div style={{ width: "100%", height: "100%" }}>
                        <canvas id="financeChart" style={{ width: "100%", height: "100%" }}></canvas>
                    </div>
                </div>
            </div>

            <div className="charts__controls">
                <div className="charts__setting--interval">
                    <input id="chart-start-date" className="charts__setting__input" type="date" />
                    <input id="chart-end-date" className="charts__setting__input" type="date" />
                </div>

                <div className="chart-filter">
                    <button 
                        className="chart-filter__btn" 
                        type="button" 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                    </button>

                    <div className={`chart-filter__dropdown ${isFilterOpen ? 'is-open' : ''}`}>
                        <h4 className="chart-filter__title">Відображати на графіку:</h4>
                        <label className="chart-filter__option">
                            <input id="chk-income" type="checkbox" defaultChecked value="income" className="chart-filter__checkbox" />
                            Прибуток
                        </label>
                        <label className="chart-filter__option">
                            <input id="chk-expense" type="checkbox" defaultChecked value="expense" className="chart-filter__checkbox" />
                            Витрати
                        </label>
                        <label className="chart-filter__option">
                            <input id="chk-profit" type="checkbox" defaultChecked value="net_profit" className="chart-filter__checkbox" />
                            Чистий прибуток
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShowChart;
