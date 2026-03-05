import ShowInvestors from "../components/investors-show";

const Investors = () => {
    return (
         <div className="main__container">
        <section className="investors">
          <div className="investors__header">
            <h2 className="investors__title">Інвестори</h2>
            <p className="investors__subtitle">
              Потенційні інвестори для вашого стартапу
            </p>
          </div>

          <div className="investors-stats">
            <div className="stats-card stats-card--violet">
              <div className="stats-card__header">
                <h3 className="stats-card__title">Всього інвесторів</h3>
              </div>
              <div className="stats-card__content">
                <div className="stats-card__value">9</div>
              </div>
            </div>

            <div className="stats-card stats-card--blue">
              <div className="stats-card__header">
                <h3 className="stats-card__title">Загальний портфель</h3>
              </div>
              <div className="stats-card__content">
                <div className="stats-card__value">$211M</div>
              </div>
            </div>

            <div className="stats-card stats-card--green">
              <div className="stats-card__header">
                <h3 className="stats-card__title">Середній чек</h3>
              </div>
              <div className="stats-card__content">
                <div className="stats-card__value">$494K</div>
              </div>
            </div>
          </div>

          <div className="investors-grid" id="investors-container">
            
          </div>
          <div className="react-investors-section">
            <h3>React-інвестори</h3>
            <div id="react-investors-container">
                <ShowInvestors />
            </div>
          </div>
        </section>
    </div>
    );
}
 export default Investors;