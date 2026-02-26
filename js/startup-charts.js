// 1. Створюємо змінну для зберігання самого графіка, щоб мати змогу його оновлювати
let financeChartInstance = null; 

// 2. Головна функція малювання (тепер вона приймає масив даних як аргумент)
const renderFinanceChart = (dataToRender) => {
    const ctx = document.getElementById('financeChart');
    if (!ctx) return;

    // Витягуємо дані
    const chartDates = dataToRender.map(it => {
        const d = new Date(it.date);
        return d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short', year: 'numeric' }); // Додав рік для наочності
    });
    const chartIncomes = dataToRender.map(it => it.income);
    const chartExpenses = dataToRender.map(it => it.expenses);

    // ЯКЩО ГРАФІК ВЖЕ ІСНУЄ - просто підміняємо дані і плавно оновлюємо
    if (financeChartInstance) {
        financeChartInstance.data.labels = chartDates;
        financeChartInstance.data.datasets[0].data = chartIncomes;
        financeChartInstance.data.datasets[1].data = chartExpenses;
        financeChartInstance.update(); 
        return; // Виходимо, щоб не створювати новий
    }

    // ЯКЩО ГРАФІКА ЩЕ НЕМАЄ (перше завантаження) - створюємо його
    financeChartInstance = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: chartDates,
            datasets: [
                {
                    data: chartIncomes,
                    label: 'Доходи',
                    borderColor: '#a855f7',     
                    tension: 0.4,
                  
                },
                {
                    data: chartExpenses,
                    label: 'Витрати',
                    borderColor: '#f97316', 
                    backgroundColor: 'transparent',
                    tension: 0.4,
                }
            ]
        },
        options: { responsive: true, plugins: { tooltip: { enabled: true } } }
    });
};

// ==========================================
// ЛОГІКА ФІЛЬТРАЦІЇ ПО ДАТАХ
// ==========================================

const historyData = JSON.parse(localStorage.getItem("history")) || [];

// Малюємо графік з усіма даними одразу при завантаженні сторінки
renderFinanceChart(historyData);

// Знаходимо ваші інпути дат з HTML (через клас)
const dateInputs = document.querySelectorAll('.charts__setting__input');
const startDateInput = dateInputs[0];
const endDateInput = dateInputs[1];

// Функція, яка спрацьовує, коли користувач обирає дату
const filterChartByDate = () => {
    const startValue = startDateInput.value;
    const endValue = endDateInput.value;

    // Якщо користувач ще не вибрав обидві дати або стер їх - показуємо всю історію
    if (!startValue || !endValue) {
        renderFinanceChart(historyData);
        return;
    }

    const startDate = new Date(startValue);
    const endDate = new Date(endValue);

    // Фільтруємо масив: залишаємо тільки ті об'єкти, дата яких потрапляє в діапазон
    const filteredHistory = historyData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
    });

    // Віддаємо відфільтрований шматок історії у графік
    renderFinanceChart(filteredHistory);
};

// Вішаємо "слухачів" подій: щойно дата змінюється в календарику, запускається фільтр
if (startDateInput && endDateInput) {
    startDateInput.addEventListener('change', filterChartByDate);
    endDateInput.addEventListener('change', filterChartByDate);
}