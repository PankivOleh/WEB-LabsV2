import { Link } from "react-router-dom";

const Header = () => { 
    return (<header className="header">
      <div className="header__container">
        <div className="header__brand">
          <div className="logo">
            <svg
              className="logo__icon"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
            >
              <use href="./public/img/icons.svg#icon-rocket"></use>
            </svg>
          </div>
          <h1 className="header__title">Startup Simulator</h1>
        </div>

        <nav className="nav">
          <Link to="/" className="nav__item nav__item--active">
            <svg
              className="nav__icon"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
            >
              <use href="./public/img/icons.svg#icon-rocket"></use>
            </svg>
            <span className="nav__text">Мій стартап</span>
          </Link>
          <Link to="/market" className="nav__item">
            <svg
              className="nav__icon"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
            >
              <use href="./public/img/icons.svg#icon-trend-up"></use>
            </svg>
            <span className="nav__text">Ринок</span>
          </Link>
          <Link to="/investors" className="nav__item">
            <svg
              className="nav__icon"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
            >
              <use href="./public/img/icons.svg#icon-user"></use>
            </svg>
            <span className="nav__text">Інвестори</span>
          </Link>
        </nav>
      </div>
    </header>);
}
export default Header;