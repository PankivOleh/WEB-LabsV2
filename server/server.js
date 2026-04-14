const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose'); // 1. Всі імпорти зверху

const app = express();
const PORT = process.env.PORT || 5000;

// 2. ПІДКЛЮЧЕННЯ ДО БАЗИ ДАНИХ
const MONGO_URI = "mongodb+srv://OwnerPankivOleg:ujHzsykQGTVKQ6cQ@clusterforlabs.olyrjxo.mongodb.net/startupDB?appName=ClusterForLabs";

mongoose.connect(MONGO_URI)
    .then(() => console.log('Успішно підключено до MongoDB'))
    .catch(err => console.error('Помилка підключення до БД:', err));
// 3. СТВОРЕННЯ МОДЕЛІ БАЗИ ДАНИХ (до того, як її викличуть маршрути)
const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    industry: String,
    employees: Number,
    revenue: Number
});
const Company = mongoose.model('Company', companySchema);

// 4. НАЛАШТУВАННЯ EXPRESS
app.use(cors());
app.use(express.json());

// Використовуємо папку dist (для Vite)
app.use(express.static(path.join(__dirname, '../dist')));

// 5. МАРШРУТИ АРІ
app.get('/api/company', async (req, res) => {
    try {
        const company = await Company.findOne();
        if (!company) {
            return res.status(404).json({ message: "Компанію ще не створено" });
        }
        res.json(company);
    } catch (error) {
        res.status(500).json({ error: "Помилка сервера" });
    }
});

app.post('/api/company', async (req, res) => {
    const { name, industry, employees, revenue } = req.body;

    if (!name || name.trim().length < 5) {
        return res.status(400).json({ 
            error: "Помилка валідації: Ім'я компанії має містити мінімум 5 символів!" 
        });
    }

    try {
        let company = await Company.findOne();

        if (company) {
            company.name = name;
            company.industry = industry;
            company.employees = employees;
            company.revenue = revenue;
            await company.save();
        } else {
            company = new Company({ name, industry, employees, revenue });
            await company.save();
        }

        res.status(200).json({ message: "Дані компанії успішно збережено!", company });
    } catch (error) {
        res.status(500).json({ error: "Не вдалося зберегти дані" });
    }
});

// 6. ХОСТИНГ REACT (Всюди використовуємо 'dist')
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// 7. ЗАПУСК СЕРВЕРА
app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});