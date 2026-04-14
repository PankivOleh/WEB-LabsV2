import { Routes, Route } from "react-router-dom";

import Home from "./pages/home.jsx";
import Investors from "./pages/investors.jsx";
import Market from "./pages/market.jsx";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import "./css/main.css";
import { useEffect } from "react";

function App() { 

    // useEffect(() => {
    //     initializeFirebaseData();
    // })
    
    return (
        <div className="page">
            <Header />
            
            <Routes>
                <Route path="/" element={
                   <ProtectedRoute><Home /></ProtectedRoute> } />
                <Route path="/investors" element={<Investors />} />
                <Route path="/market" element={<Market />} />
            </Routes>
            
            <Footer />
        </div>
    );
}

export default App;
