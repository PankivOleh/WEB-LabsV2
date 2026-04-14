// import { collection, addDoc, getDocs } from "firebase/firestore";
// import { db } from "../firebase";

// export const initializeFirebaseData = async () => {
//   try {

//     const investorsSnapshot = await getDocs(collection(db, "investors"));
    
//     if (investorsSnapshot.empty) {
//       console.log("Завантажуємо інвесторів у Firebase...");
      

//       const investorsList = [
//         { Name: "Global Scale Ventures", Type: "Венчурний фонд", Portfolio: 40000000, Investments: 53, AvgCheck: 700000, Focus: "SaaS, B2B", Stage: "Series A, Series B", Contacts: "contact@global-scale.com", Interests: "" },
//         { Name: "Capital Ventures", Type: "Венчурний фонд", Portfolio: 25000000, Investments: 45, AvgCheck: 500000, Focus: "Технології, Фінтех", Stage: "Seed, Series A", Contacts: "contact@capital-ventures.com", Interests: "" },
//         { Name: "Innovation Partners", Type: "Приватний інвестор", Portfolio: 12000000, Investments: 28, AvgCheck: 350000, Focus: "E-commerce, SaaS", Stage: "Pre-seed, Seed", Contacts: "contact@innovation-partners.com", Interests: "" },
//         { Name: "TechGrowth Fund", Type: "Венчурний фонд", Portfolio: 50000000, Investments: 62, AvgCheck: 800000, Focus: "Технології, AI/ML", Stage: "Series A, Series B", Contacts: "contact@techgrowth.com", Interests: "" },
//         { Name: "Green Future Capital", Type: "Венчурний фонд", Portfolio: 18000000, Investments: 31, AvgCheck: 450000, Focus: "Зелені технології, Енергетика", Stage: "Seed, Series A", Contacts: "contact@green-future.com", Interests: "" },
//         { Name: "Digital Health Investors", Type: "Спеціалізований фонд", Portfolio: 22000000, Investments: 38, AvgCheck: 550000, Focus: "Здоров'я, Медтех", Stage: "Seed, Series A", Contacts: "contact@digital-health.com", Interests: "" },
//         { Name: "EduTech Partners", Type: "Приватний інвестор", Portfolio: 8000000, Investments: 19, AvgCheck: 300000, Focus: "Освіта, E-learning", Stage: "Pre-seed, Seed", Contacts: "contact@edutech-partners.com", Interests: "" },
//         { Name: "Smart Money Angels", Type: "Ангельський фонд", Portfolio: 6000000, Investments: 24, AvgCheck: 200000, Focus: "Технології, Маркетинг", Stage: "Pre-seed", Contacts: "contact@smartmoneyangels.com", Interests: "" }
//       ];

//       for (const investor of investorsList) {
//         await addDoc(collection(db, "investors"), investor);
//       }
//       console.log("Інвесторів успішно додано!");
//     } else {
//       console.log("Інвестори вже існують у базі.");
//     }

//     const competitorsSnapshot = await getDocs(collection(db, "competitors"));
    
//     if (competitorsSnapshot.empty) {
//       console.log("Завантажуємо конкурентів у Firebase...");
 
//       const competitorsList = [
//         { name: "InnovateTech", size: "Велика", industry: "Технології", employees: 150, revenue: 2400, growth: 28, markets: "Україна, Польща, Німеччина" },
//         { name: "FinanceFlow", size: "Середня", industry: "Фінтех", employees: 80, revenue: 1200, growth: 15, markets: "Україна, Чехія" },
//         { name: "EduPro", size: "Мала", industry: "Освіта", employees: 35, revenue: 450, growth: 42, markets: "Україна" },
//         { name: "HealthHub", size: "Середня", industry: "Здоров'я", employees: 65, revenue: 980, growth: 19, markets: "Україна, Румунія" },
//         { name: "MarketMaster", size: "Мала", industry: "Маркетинг", employees: 28, revenue: 380, growth: 31, markets: "Україна, Польща" },
//         { name: "ShopSmart", size: "Велика", industry: "E-commerce", employees: 200, revenue: 3500, growth: 22, markets: "Україна, Польща, Литва, Естонія" }
//       ];

//       for (const competitor of competitorsList) {
//         await addDoc(collection(db, "competitors"), competitor);
//       }
//       console.log("Конкурентів успішно додано!");
//     } else {
//       console.log("Конкуренти вже існують у базі.");
//     }

//   } catch (error) {
//     console.error("Помилка завантаження даних:", error);
//   }
// };