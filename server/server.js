const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose'); 

const app = express();
const PORT = process.env.PORT || 5000;

// ПІДКЛЮЧЕННЯ ДО БАЗИ ДАНИХ
const MONGO_URI = "mongodb+srv://OwnerPankivOleg:ujHzsykQGTVKQ6cQ@clusterforlabs.olyrjxo.mongodb.net/startupDB?appName=ClusterForLabs";

mongoose.connect(MONGO_URI)
    .then(() => console.log('Успішно підключено до MongoDB'))
    .catch(err => console.error('Помилка підключення до БД:', err));
//  СТВОРЕННЯ МОДЕЛІ БАЗИ ДАНИХ (до того, як її викличуть маршрути)
const companySchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    name: { type: String, required: true },
    industry: String,
    employees: Number,
    revenue: Number,     
    expenses: Number,   
    profit: Number,     
    region: String,      
    offices: String     
});
const Company = mongoose.model('Company', companySchema);

//  НАЛАШТУВАННЯ EXPRESS
app.use(cors());
app.use(express.json());

// Використовуємо папку dist (для Vite)
app.use(express.static(path.join(__dirname, '../dist')));

//  МАРШРУТИ АРІ

app.get('/api/company/:email', async (req, res) => {
    try {
        const userEmail = req.params.email; 
        const company = await Company.findOne({ userEmail: userEmail }); 
        
        if (!company) {
            return res.status(404).json({ message: "Компанію ще не створено" });
        }
        res.json(company);
    } catch (error) {
        res.status(500).json({ error: "Помилка сервера" });
    }
});

app.post('/api/company', async (req, res) => {

    const { userEmail, name, industry, employees, revenue, expenses, profit, region, offices } = req.body;

    if (!userEmail) return res.status(400).json({ error: "Необхідно авторизуватися!" });
    if (!name || name.trim().length < 5) {
        return res.status(400).json({ error: "Ім'я компанії має містити мінімум 5 символів! Дані не були збережені!" });
    }

    try {
        let company = await Company.findOne({ userEmail: userEmail });

        if (company) {
            company.name = name;
            company.industry = industry;
            company.employees = employees;
            company.revenue = revenue;
            company.expenses = expenses;
            company.profit = profit;
            company.region = region;
            company.offices = offices;
            await company.save();
        } else {

            company = new Company({ userEmail, name, industry, employees, revenue, expenses, profit, region, offices });
            await company.save();
        }

        res.status(200).json({ message: "Дані компанії успішно збережено!", company });
    } catch (error) {
        res.status(500).json({ error: "Не вдалося зберегти дані" });
    }
});

// ХОСТИНГ REACT
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// ЗАПУСК СЕРВЕРА
app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});