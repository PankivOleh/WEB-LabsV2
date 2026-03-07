import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <div className="footer__brand">
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
              <h3 className="footer__title">Startup Simulator</h3>
            </div>
            <p className="footer__description">
              Навчайтеся управляти стартапом у безпечному симуляторному
              середовищі
            </p>
          </div>

          <div className="footer__section">
            <h4 className="footer__heading">Навігація</h4>
            <ul className="footer__list">
              <li className="footer__item">
                <Link to="/" className="footer__link">
                  Мій стартап
                </Link>
              </li>
              <li className="footer__item">
                <Link to="/market" className="footer__link">
                  Ринок
                </Link>
              </li>
              <li className="footer__item">
                <Link to="/investors" className="footer__link">
                  Інвестори
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__heading">Контакти</h4>
            <div className="social">
              <a
                href="https://github.com/PankivOleh/WEB-LabsV2"
                target="_blank"
                className="social__link"
              >
                <svg
                  className="social__icon"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                >
                  <use href="/img/icons.svg#icon-social-1"></use>
                </svg>
              </a>
              <a href="#" className="social__link">
                <svg
                  className="social__icon"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                >
                  <use href="/img/icons.svg#icon-social-2"></use>
                </svg>
              </a>
            </div>
            <a href="mailto:contact@startupsim.com" className="footer__contact">
              contact@startupsim.com
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 Startup Simulator. Всі права захищено.
          </p>
          <div className="footer__legal">
            <a href="#" className="footer__link">
              Умови використання
            </a>
            <a href="#" className="footer__link">
              Політика конфіденційності
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
