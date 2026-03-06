import ShowCompetitors from "../components/competitors-show";
const Market = () => { 
    return (  
      <main className="main">
      <div className="main__container">
        <section className="market">
          <div className="market__header">
            <h2 className="market__title">Аналіз ринку</h2>
            <p className="market__subtitle">
              Моніторинг конкурентів та ринкових трендів
            </p>
          </div>

          <div className="trends">
            <div className="trends__header">
              <svg
                className="trends__icon"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
              >
                <use href="/img/icons.svg#icon-trend-up"></use>
              </svg>
              <h3 className="trends__title">Ринкові тренди</h3>
            </div>

            <div className="trends__grid">
              <div className="trend-card">
                <div className="trend-card__header">
                  <h4 className="trend-card__title">AI та машинне навчання</h4>
                  <span className="badge badge--high">Високий</span>
                </div>
                <div className="trend-card__content">
                  <p className="trend-card__description">
                    Зростання попиту на AI-рішення у бізнесі
                  </p>
                  <div className="trend-card__growth">
                    <svg
                      className="trend-card__icon"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                    >
                      <use href="/img/icons.svg#icon-bar-chart"></use>
                    </svg>
                    <span className="trend-card__percentage">Зростання: +156%</span>
                  </div>
                </div>
              </div>

              <div className="trend-card">
                <div className="trend-card__header">
                  <h4 className="trend-card__title">Зелені технології</h4>
                  <span className="badge badge--medium">Середній</span>
                </div>
                <div className="trend-card__content">
                  <p className="trend-card__description">
                    Екологічні стартапи отримують більше інвестицій
                  </p>
                  <div className="trend-card__growth">
                    <svg
                      className="trend-card__icon"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                    >
                      <use href="/img/icons.svg#icon-bar-chart"></use>
                    </svg>
                    <span className="trend-card__percentage">Зростання: +89%</span>
                  </div>
                </div>
              </div>

              <div className="trend-card">
                <div className="trend-card__header">
                  <h4 className="trend-card__title">Цифрова медицина</h4>
                  <span className="badge badge--high">Високий</span>
                </div>
                <div className="trend-card__content">
                  <p className="trend-card__description">
                    Телемедицина та онлайн-консультації
                  </p>
                  <div className="trend-card__growth">
                    <svg
                      className="trend-card__icon"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                    >
                      <use href="/img/icons.svg#icon-bar-chart"></use>
                    </svg>
                    <span className="trend-card__percentage">Зростання: +124%</span>
                  </div>
                </div>
              </div>

              <div className="trend-card">
                <div className="trend-card__header">
                  <h4 className="trend-card__title">Фінансова інклюзія</h4>
                  <span className="badge badge--medium">Середній</span>
                </div>
                <div className="trend-card__content">
                  <p className="trend-card__description">
                    Фінтех для малого бізнесу
                  </p>
                  <div className="trend-card__growth">
                    <svg
                      className="trend-card__icon"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                    >
                      <use href="/img/icons.svg#icon-bar-chart"></use>
                    </svg>
                    <span className="trend-card__percentage">Зростання: +67%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="competitors">
            <div className="competitors__header">
              <svg
                className="competitors__icon"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
              >
                <use href="/img/icons.svg#icon-building"></use>
              </svg>
              <h3 className="competitors__title">Конкуренти</h3>
            </div>

            <div className="competitors__grid" id="competitors-container">
              
            </div>
          </div>
          <div>
            <h3>React Competitor</h3>

                    <div id="react-competitors-root">
                        <ShowCompetitors />
            </div>
          </div>
        </section>
      </div>
    </main>
    );
}
export default Market;
