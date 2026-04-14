// const CURRENT_INVESTORS_VERSION = "1.0.1";

// const initializeInvestors = () => {
//   if (
//     localStorage.getItem("investors_version") != CURRENT_INVESTORS_VERSION ||
//     localStorage.getItem("investors") === null
//   ) {
//     const investorsList = [
//       {
//         id: 1,
//         name: "Global Scale Ventures",
//         type: "Венчурний фонд",
//         portfolio: "$40M",
//         investments: "53",
//         avgCheck: "$700K",
//         focus: ["SaaS", "B2B"],
//         stage: "Series A, Series B",
//         contacts: "contact@global-scale.com",
//       },
//       {
//         id: 2,
//         name: "Capital Ventures",
//         type: "Венчурний фонд",
//         portfolio: "$25M",
//         investments: "45",
//         avgCheck: "$500K",
//         focus: ["Технології", "Фінтех"],
//         stage: "Seed, Series A",
//         contacts: "contact@capital-ventures.com",
//       },
//       {
//         id: 3,
//         name: "Innovation Partners",
//         type: "Приватний інвестор",
//         portfolio: "$12M",
//         investments: "28",
//         avgCheck: "$350K",
//         focus: ["E-commerce", "SaaS"],
//         stage: "Pre-seed, Seed",
//         contacts: "contact@innovation-partners.com",
//       },
//       {
//         id: 4,
//         name: "TechGrowth Fund",
//         type: "Венчурний фонд",
//         portfolio: "$50M",
//         investments: "62",
//         avgCheck: "$800K",
//         focus: ["Технології", "AI/ML"],
//         stage: "Series A, Series B",
//         contacts: "contact@techgrowth.com",
//       },
//       {
//         id: 5,
//         name: "Green Future Capital",
//         type: "Венчурний фонд",
//         portfolio: "$18M",
//         investments: "31",
//         avgCheck: "$450K",
//         focus: ["Зелені технології", "Енергетика"],
//         stage: "Seed, Series A",
//         contacts: "contact@green-future.com",
//       },
//       {
//         id: 6,
//         name: "Digital Health Investors",
//         type: "Спеціалізований фонд",
//         portfolio: "$22M",
//         investments: "38",
//         avgCheck: "$550K",
//         focus: ["Здоров'я", "Медтех"],
//         stage: "Seed, Series A",
//         contacts: "contact@digital-health.com",
//       },
//       {
//         id: 7,
//         name: "EduTech Partners",
//         type: "Приватний інвестор",
//         portfolio: "$8M",
//         investments: "19",
//         avgCheck: "$300K",
//         focus: ["Освіта", "E-learning"],
//         stage: "Pre-seed, Seed",
//         contacts: "contact@edutech-partners.com",
//       },
//       {
//         id: 9,
//         name: "Smart Money Angels",
//         type: "Ангельський фонд",
//         portfolio: "$6M",
//         investments: "24",
//         avgCheck: "$200K",
//         focus: ["Технології", "Маркетинг"],
//         stage: "Pre-seed",
//         contacts: "contact@smartmoneyangels.com",
//       },
  
//     ];
//     localStorage.setItem("investors", JSON.stringify(investorsList));
//     localStorage.setItem("investors_version", CURRENT_INVESTORS_VERSION);
//   }
// };

// const CURRENT_COMPETITORS_VERSION = "1.0.1";
// const initializeCompetitor = () => {
//   if (
//     localStorage.getItem("competitors_version") !=
//       CURRENT_COMPETITORS_VERSION ||
//     localStorage.getItem("competitors") === null
//   ) {
//     const competitorsList = [
//       {
//         id: 1,
//         name: "InnovateTech",
//         size: "Велика",
//         industry: "Технології",
//         employees: "150",
//         revenue: "2400",
//         growth: "28",
//         markets: ["Україна", "Польща", "Німеччина"],
//       },
//       {
//         id: 2,
//         name: "FinanceFlow",
//         size: "Середня",
//         industry: "Фінтех",
//         employees: "80",
//         revenue: "1200",
//         growth: "15",
//         markets: ["Україна", "Чехія"],
//       },
//       {
//         id: 3,
//         name: "EduPro",
//         size: "Мала",
//         industry: "Освіта",
//         employees: "35",
//         revenue: "450",
//         growth: "42",
//         markets: ["Україна"],
//       },
//       {
//         id: 4,
//         name: "HealthHub",
//         size: "Середня",
//         industry: "Здоров'я",
//         employees: "65",
//         revenue: "980",
//         growth: "19",
//         markets: ["Україна", "Румунія"],
//       },
//       {
//         id: 5,
//         name: "MarketMaster",
//         size: "Мала",
//         industry: "Маркетинг",
//         employees: "28",
//         revenue: "380",
//         growth: "31",
//         markets: ["Україна", "Польща"],
//       },
//       {
//         id: 6,
//         name: "ShopSmart",
//         size: "Велика",
//         industry: "E-commerce",
//         employees: "200",
//         revenue: "3500",
//         growth: "22",
//         markets: ["Україна", "Польща", "Литва", "Естонія"],
//       },
//     ];
//     console.log(competitorsList);
//     localStorage.setItem("competitors", JSON.stringify(competitorsList));
//     localStorage.setItem("competitors_version", CURRENT_COMPETITORS_VERSION);
//   }
// };
// initializeInvestors();
// initializeCompetitor();
