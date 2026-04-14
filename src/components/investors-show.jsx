import React, { useState, useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 

const formatCurrency = (value) => {
  const num = Number(value);
  if (isNaN(num)) return value; 
  
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(0)}M`;
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(0)}K`;
  }
  return `$${num}`;
};

const InvestorCard = ({ investor }) => {
  const focusArray = typeof investor.Focus === "string" 
    ? investor.Focus.split(",").map(f => f.trim()) 
    : [];

  return (
    <div className="investor-card">
      <div className="investor-card__header">
        <div className="investor-card__brand">
          <div className="investor-logo">
            <svg
              className="investor-logo__icon"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
            >
              <use href="/img/icons.svg#icon-building"></use>
            </svg>
          </div>
          <h4 className="investor-card__name">{investor.Name}</h4>
        </div>
        <span className="badge badge--venture">{investor.Type}</span>
      </div>
      <div className="investor-card__content">
        <div className="investor-card__stats">
          <div className="investor-stat">
            <div className="investor-stat__label">
              <svg
                className="investor-stat__icon"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
              >
                <use href="/img/icons.svg#icon-dollar"></use>
              </svg>
              <span>Портфель</span>
            </div>
            <span className="investor-stat__value">{formatCurrency(investor.Portfolio)}</span>
          </div>
          <div className="investor-stat">
            <div className="investor-stat__label">
              <svg
                className="investor-stat__icon"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
              >
                <use href="/img/icons.svg#icon-trend-up"></use>
              </svg>
              <span>Інвестицій</span>
            </div>
            <span className="investor-stat__value">{investor.Investments}</span>
          </div>
          <div className="investor-stat">
            <div className="investor-stat__label">
              <svg
                className="investor-stat__icon"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
              >
                <use href="/img/icons.svg#icon-briefcase"></use>
              </svg>
              <span>Середній чек</span>
            </div>
            <span className="investor-stat__value">{formatCurrency(investor.AvgCheck)}</span>
          </div>
        </div>
        
        <div className="investor-card__focus">
          <div className="focus-label">
            <svg
              className="focus-label__icon"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
            >
              <use href="/img/icons.svg#icon-user"></use>
            </svg>
            <span>Сфера інтересів</span>
          </div>
          <div className="focus-list">
            {focusArray.map((it) => (
              <span key={it} className="focus-tag">
                {it}
              </span>
            ))}
          </div>
        </div>
        
        <div className="investor-card__footer">
          <p className="investor-card__stage">
            <strong>Стадія:</strong> {investor.Stage}
          </p>
          <button 
            className="button button--contact"
            onClick={() => alert(`Лист надіслано на: ${investor.Contacts}`)}
          >
            <svg
              className="button__icon"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
            >
              <use href="/img/icons.svg#icon-social-2"></use>
            </svg>
            Зв'язатися
          </button>
        </div>
      </div>
    </div>
  );
};

const ShowInvestors = () => {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "investors"));
        const investorsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setInvestors(investorsList);
      } catch (error) {
        console.error("Помилка при завантаженні інвесторів:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestors();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", padding: "20px" }}>Шукаємо інвесторів у базі...</p>;
  }

  if (investors.length === 0) {
    return <p>Немає інвесторів для відображення.</p>;
  }

  return (
    <div className="investors-grid">
      {investors.map((it) => (
        <InvestorCard key={it.id} investor={it} />
      ))}
    </div>
  );
};

export default ShowInvestors;