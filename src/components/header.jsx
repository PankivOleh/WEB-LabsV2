import { NavLink } from "react-router-dom";

const Header = () => {
  const getNavClass = ({ isActive }) =>
    `nav__item ${isActive ? "nav__item--active" : ""}`;

  return (
    <header className="header">
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
              <use href="/img/icons.svg#icon-rocket"></use>
            </svg>
          </div>
          <h1 className="header__title">Startup Simulator</h1>
        </div>

        <nav className="nav">
          <NavLink to="/" className={getNavClass}>
            <svg
              className="nav__icon"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
            >
              <use href="/img/icons.svg#icon-rocket"></use>
            </svg>
            <span className="nav__text">Мій стартап</span>
          </NavLink>
          <NavLink to="/market" className={getNavClass}>
            <svg
              className="nav__icon"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
            >
              <use href="/img/icons.svg#icon-trend-up"></use>
            </svg>
            <span className="nav__text">Ринок</span>
          </NavLink>
          <NavLink to="/investors" className={getNavClass}>
            <svg
              className="nav__icon"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
            >
              <use href="/img/icons.svg#icon-user"></use>
            </svg>
            <span className="nav__text">Інвестори</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
export default Header;
