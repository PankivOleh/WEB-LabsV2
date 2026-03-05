import ShowChart from "../components/show-chart";

const Home = () => { 
    return (
    <div className="main__container">
        <section className="startup">
          <div className="startup__header">
            <div className="startup__info">
              <h2 className="startup__name" id="name">TechStart</h2>
              <p className="startup__industry" id="industry">Технології</p>
            </div>
            <button className="modal-button button button--primary">
              <svg
                className="button__icon"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
              >
                <use href="./public/img/icons.svg#icon-edit"></use>
              </svg>
              Редагувати
            </button>
          </div>
          <div className="metrics">
            <div className="card card--highlight">
              <div className="card__header">
                <h3 className="card__title">
                  <svg
                    className="card__icon card__icon--violet"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                  >
                    <use href="./public/img/icons.svg#icon-users"></use>
                  </svg>
                  Працівники
                </h3>
              </div>
              <div className="card__content">
                <div className="metric">
                  <div className="metric__value" id="employee-value">25</div>
                  <p className="metric__label metric__label--success">
                    <span id="employee-increase"> +3</span> цього місяця
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card__header">
                <h3 className="card__title">
                  <svg
                    className="card__icon card__icon--green"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                  >
                    <use href="./public/img/icons.svg#icon-dollar"></use>
                  </svg>
                  Дохід
                </h3>
              </div>
              <div className="card__content">
                <div className="metric">
                  <div className="metric__value" id="income-value">$82,000</div>
                  <p className="metric__label metric__label--success">
                    <span id="income-increase">+14.5%</span> від минулого місяця
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card__header">
                <h3 className="card__title">
                  <svg
                    className="card__icon card__icon--orange"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                  >
                    <use href="./public/img/icons.svg#icon-trend-down"></use>
                  </svg>
                  Витрати
                </h3>
              </div>
              <div className="card__content">
                <div className="metric">
                  <div className="metric__value" id="expense-value">$40,000</div>
                  <p className="metric__label">
                    <span id="expense-increase">+5.3%</span> від минулого місяця
                  </p>
                </div>
              </div>
            </div>

            <div className="card card--gradient">
              <div className="card__header">
                <h3 className="card__title">
                  <svg
                    className="card__icon card__icon--violet"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                  >
                    <use href="./public/img/icons.svg#icon-briefcase"></use>
                  </svg>
                  Прибуток
                </h3>
              </div>
              <div className="card__content">
                <div className="metric">
                  <div
                    className="metric__value metric__value--accent"
                    id="profit-value"
                  >
                    $42,000
                  </div>
                  <p className="metric__label metric__label--accent">
                    Маржа <span id="margin">51%</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="charts">
            <ShowChart/>
          </div>

          <div className="info-section">
            <div className="card">
              <div className="card__header">
                <h3 className="card__title card__title--large">
                  <svg
                    className="card__icon card__icon--violet"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <use href="./public/img/icons.svg#icon-pin"></use>
                  </svg>
                  Ринки збуту
                </h3>
              </div>
              <div className="card__content">
                <div className="tags" id="markets-list">
                  <span className="tag tag--accent">Україна</span>
                  <span className="tag tag--accent">Польща</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card__header">
                <h3 className="card__title card__title--large">
                  <svg
                    className="card__icon card__icon--violet"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <use href="./public/img/icons.svg#icon-building"></use>
                  </svg>
                  Офіси
                </h3>
              </div>
              <div className="card__content">
                <div className="tags" id="offices-list">
                  <span className="tag">Київ</span>
                  <span className="tag">Варшава</span>
                </div>
              </div>
            </div>
          </div>
        </section>
    <div className="modal-setting__backdrop visualy-hidden">
      <div className="modal-setting">
        <div className="modal-setting__header">
          <h2 className="modal-setting__title">Налаштування стартапу</h2>
          <button
            className="modal-button modal-setting__close"
            type="button"
            aria-label="Закрити"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor">
              <use href="./public/img/icons.svg#icon-close"></use>
            </svg>
          </button>
        </div>

        <form className="modal-setting__form">
          <div className="form-group">
            <label className="form-group__label" htmlFor="company-name"
              >Назва компанії</label
            >
            <input
              className="form-group__input"
              type="text"
              id="company-name"
              value="TechStart"
            />
          </div>

          <div className="form-group">
            <label className="form-group__label" htmlFor="company-industry"
              >Сфера діяльності</label
            >
            <div className="form-group__select-wrapper">
              <select className="form-group__select" id="company-industry">
                <option value="tech" selected>Технології</option>
                <option value="fintech">Фінтех</option>
                <option value="ecommerce">E-commerce</option>
                <option value="health">Здоров'я</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-group__label" htmlFor="employees"
              >Кількість працівників</label
            >
            <input
              className="form-group__input"
              type="number"
              id="employees"
              value="25"
            />
          </div>

          <div className="form-group">
            <label className="form-group__label" htmlFor="markets">Ринки збуту</label>
            <input
              className="form-group__input"
              type="text"
              id="markets"
              value="Україна, Польща"
            />
          </div>

          <div className="form-group">
            <label className="form-group__label" htmlFor="offices">Офіси</label>
            <input
              className="form-group__input"
              type="text"
              id="offices"
              value="Київ, Варшава"
            />
          </div>

          <div className="modal-setting__footer">
            <button
              className="modal-setting__button button button--primary button--full"
              type="submit"
            >
              Зберегти
            </button>
          </div>
        </form>
      </div>
        </div>
    </div>
    );
}
export default Home;