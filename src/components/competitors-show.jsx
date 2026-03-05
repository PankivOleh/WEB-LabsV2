import React, { useState } from 'react';
const CompetitorCard = ({ competitor }) => {
    return (
        <div className="competitor-card">
                <div className="competitor-card__header">
                  <div className="competitor-card__info">
                    <h4 className="competitor-card__name">{competitor.name}</h4>
                    <span className="badge badge--large">{competitor.size}</span>
                  </div>
                  <p className="competitor-card__industry">{competitor.industry}</p>
                </div>
                <div className="competitor-card__content">
                  <div className="competitor-card__stats">
                    <div className="stat">
                      <div className="stat__label">
                        <svg
                          className="stat__icon"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                        >
                          <use href="./public/img/icons.svg#icon-user"></use>
                        </svg>
                        <span>Працівники</span>
                      </div>
                      <span className="stat__value">{competitor.employees}</span>
                    </div>
                    <div className="stat">
                      <div className="stat__label">
                        <svg
                          className="stat__icon"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                        >
                          <use href="./public/img/icons.svg#icon-dollar"></use>
                        </svg>
                        <span>Дохід</span>
                      </div>
                      <span className="stat__value">${competitor.revenue}K</span>
                    </div>
                    <div className="stat">
                      <div className="stat__label">
                        <svg
                          className="stat__icon"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                        >
                          <use
                            href="./public/img/icons.svg#icon-trend-up"
                          ></use>
                        </svg>
                        <span>Зростання</span>
                      </div>
                      <span className="stat__value stat__value--success">+{competitor.growth}%</span>
                    </div>
                  </div>
                  <div className="competitor-card__markets">
                    <div className="markets-label">
                      <svg
                        className="markets-label__icon"
                        width="12"
                        height="12"
                        fill="none"
                        stroke="currentColor"
                      >
                        <use href="./public/img/icons.svg#icon-pin"></use>
                      </svg>
                      <span>Ринки збуту</span>
                    </div>
                    <div className="markets-list">
                      {competitor.markets.map(it => <span key={it} className="market-tag">{it}</span>)}
                    </div>
                  </div>
                </div>
              </div>
    )
} 
const ShowCompetitors = () => {
  const competitors = JSON.parse(localStorage.getItem("competitors"));
  
      const [activeCategory, setActiveCategory] = useState("Всі");  
    if (!competitors || competitors.length === 0) {
        return (<p>Немає даних про конкурентів</p>);
    }


    const filteredCompetitors = competitors.filter(it => {
        if (activeCategory === "Всі") return true;
        else if(it.industry === activeCategory) return true;
        return false;
    })
    return (
        <div>
            <div className="categories-filter">
                <button onClick={() => setActiveCategory("Всі")} className={activeCategory === "Всі" ? "active" : ""}>  Всі</button>
                <button onClick={() => setActiveCategory("Технології")} className={activeCategory === "Технології" ? "active" : ""}>  Технології</button>
                <button onClick={() => setActiveCategory("Фінтех")} className={activeCategory === "Фінтех" ? "active" : ""}>  Фінанси</button>
                <button onClick={() => setActiveCategory("Здоров'я")} className={activeCategory === "Здоров'я" ? "active" : ""}>  Здоров'я</button>
                <button onClick={() => setActiveCategory("Освіта")} className={activeCategory === "Освіта" ? "active" : ""}>  Освіта</button>
                <button onClick={() => setActiveCategory("Маркетинг")} className={activeCategory === "Маркетинг" ? "active" : ""}>  Маркетинг</button>
                <button onClick={() => setActiveCategory("E-commerce")} className={activeCategory === "E-commerce" ? "active" : ""}>  E-commerce</button>
            </div>
            <div className="competitors__grid">
                {filteredCompetitors.map(it => <CompetitorCard competitor = {it} key = {it.id} />)}
            </div>
        </div>
    )
}
export default ShowCompetitors;