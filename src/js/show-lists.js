const investorsList = JSON.parse(localStorage.getItem("investors"));
const investorsContainer = document.getElementById("investors-container");

const renderInvestors = (investors) => {
    if (!investorsContainer) return;
    if (investors === null||investors.length === 0) {
        investorsContainer.innerHTML = "<p>Немає даних про інвесторів. Будь ласка, заповніть інформацію у налаштуваннях.</p>";
        return;
    }
    const html = investors.map(investor => ` <div class="investor-card">
              <div class="investor-card__header">
                <div class="investor-card__brand">
                  <div class="investor-logo">
                     <svg
                      class="investor-logo__icon"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <use href="./public/img/icons.svg#icon-building"></use>
                    </svg>
                  </div>
                  <h4 class="investor-card__name">${investor.name}</h4>
                </div>
                <span class="badge badge--venture">${investor.type}</span>
              </div>
              <div class="investor-card__content">
                <div class="investor-card__stats">
                  <div class="investor-stat">
                    <div class="investor-stat__label">
                      <svg
                        class="investor-stat__icon"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                      >
                        <use href="./public/img/icons.svg#icon-dollar"></use>
                      </svg>
                      <span>Портфель</span>
                    </div>
                    <span class="investor-stat__value">${investor.portfolio}</span>
                  </div>
                  <div class="investor-stat">
                    <div class="investor-stat__label">
                      <svg
                        class="investor-stat__icon"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                      >
                        <use href="./public/img/icons.svg#icon-trend-up"></use>
                      </svg>
                      <span>Інвестицій</span>
                    </div>
                    <span class="investor-stat__value">${investor.investments}</span>
                  </div>
                  <div class="investor-stat">
                    <div class="investor-stat__label">
                      <svg
                        class="investor-stat__icon"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                      >
                        <use href="./public/img/icons.svg#icon-briefcase"></use>
                      </svg>
                      <span>Середній чек</span>
                    </div>
                    <span class="investor-stat__value">${investor.avgCheck}</span>
                  </div>
                </div>
                <div class="investor-card__focus">
                  <div class="focus-label">
                    <svg
                      class="focus-label__icon"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                    >
                      <use href="./public/img/icons.svg#icon-user"></use>
                    </svg>
                    <span>Сфера інтересів</span>
                  </div>
                  <div class="focus-list">
                    ${investor.focus.map(focus => `<span class="focus-tag">${focus}</span>`).join("")}
                  </div>
                </div>
                <div class="investor-card__footer">
                  <p class="investor-card__stage">
                    <strong>Стадія:</strong> ${investor.stage}
                  </p>
                  <button class="button button--contact">
                    <svg
                      class="button__icon"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                    >
                      <use href="./public/img/icons.svg#icon-social-2"></use>
                    </svg>
                    Зв'язатися
                  </button>
                </div>
              </div>
            </div>`);
    investorsContainer.innerHTML = html.join("");
}

const competitorsList = JSON.parse(localStorage.getItem("competitors"));
const competitorsContainer = document.getElementById("competitors-container");
const renderCompetitors = (competitors) => { 
     if (!competitorsContainer) return;
    if (competitors === null||competitors.length === 0) {
        competitorsContainer.innerHTML = "<p>Немає даних про конкурентів. Будь ласка, заповніть інформацію у налаштуваннях.</p>";
        return;
    }
    const html = competitors.map(competitor => ` <div class="competitor-card">
                <div class="competitor-card__header">
                  <div class="competitor-card__info">
                    <h4 class="competitor-card__name">${competitor.name}</h4>
                    <span class="badge badge--large">${competitor.size}</span>
                  </div>
                  <p class="competitor-card__industry">${competitor.industry}</p>
                </div>
                <div class="competitor-card__content">
                  <div class="competitor-card__stats">
                    <div class="stat">
                      <div class="stat__label">
                        <svg
                          class="stat__icon"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                        >
                          <use href="./public/img/icons.svg#icon-user"></use>
                        </svg>
                        <span>Працівники</span>
                      </div>
                      <span class="stat__value">${competitor.employees}</span>
                    </div>
                    <div class="stat">
                      <div class="stat__label">
                        <svg
                          class="stat__icon"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                        >
                          <use href="./public/img/icons.svg#icon-dollar"></use>
                        </svg>
                        <span>Дохід</span>
                      </div>
                      <span class="stat__value">$${competitor.revenue}K</span>
                    </div>
                    <div class="stat">
                      <div class="stat__label">
                        <svg
                          class="stat__icon"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                        >
                          <use href="./public/img/icons.svg#icon-trend-up"></use>
                        </svg>
                        <span>Зростання</span>
                      </div>
                      <span class="stat__value stat__value--success">+28%</span>
                    </div>
                  </div>
                  <div class="competitor-card__markets">
                    <div class="markets-label">
                      <svg
                        class="markets-label__icon"
                        width="12"
                        height="12"
                        fill="none"
                        stroke="currentColor"
                      >
                        <use href="./public/img/icons.svg#icon-pin"></use>
                      </svg>
                      <span>Ринки збуту</span>
                    </div>
                    <div class="markets-list">
                      ${competitor.markets.map( market => `<span class="market-tag">${market}</span>`).join("")}
                    </div>
                  </div>
                </div>
              </div>`).join("");
    competitorsContainer.innerHTML = html;
}




renderInvestors(investorsList);
renderCompetitors(competitorsList);