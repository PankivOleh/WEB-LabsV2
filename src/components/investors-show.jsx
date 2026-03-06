import React, { useState, useEffect } from "react";

const InvestorCard = ({ investor }) => {
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
                  <h4 className="investor-card__name">{investor.name}</h4>
                </div>
                <span className="badge badge--venture">{investor.type}</span>
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
                    <span className="investor-stat__value">{investor.portfolio}</span>
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
                    <span className="investor-stat__value">{investor.investments}</span>
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
                    <span className="investor-stat__value">{investor.avgCheck}</span>
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
                       {investor.focus.map(it => <span key={it} className="focus-tag">{it}</span>)}           
                  </div>
                </div>
                <div className="investor-card__footer">
                  <p className="investor-card__stage">
                    <strong>Стадія:</strong> {investor.stage}
                  </p>
                  <button className="button button--contact">
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
}

const ShowInvestors = () => {
    const [investors, setInvestors] = useState([]);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("investors")) || [];
        setInvestors(savedData); 
    }, []);

    if (investors.length === 0) {
        return <p>Немає інвесторів для відображення.</p>;
    }

    return (
        <div className="investors-grid">
            {investors.map(it => <InvestorCard key={it.id} investor={it} />)}
       </div>
    );
}

export default ShowInvestors;
