// Видаляємо BrowserRouter з імпорту, залишаємо тільки Routes та Route
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Investors from "./pages/investors";
import Market from "./pages/market";
import Header from "./components/header";
import Footer from "./components/footer";
import "./css/main.css";

function App() { 
    return (
        <div className="page">
        <>
            <Header />
            
            {}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/investors" element={<Investors />} />
                <Route path="/market" element={<Market />} />
            </Routes>
            
            <Footer />
            </>
        </div>
    );
}

export default App;