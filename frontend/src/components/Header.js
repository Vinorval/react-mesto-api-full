import headerLogo from "../image/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ userEmail, onSignOut }) {
  const location = useLocation();

  //возвращать разметку для шапки
  return (
    <div className="header">
      <img
        src={headerLogo}
        className="header__logo"
        alt="логотип мeста России"
      ></img>
      {/*в зависимости от лакации шапка сайта меняется*/}
      {location.pathname === "/sign-up" && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
      {location.pathname === "/sign-in" && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === "/" && (
        <div className="header__conteiner">
          <p className="header__email">{userEmail}</p>
          <Link
            to="/sign-in"
            className="header__link header__link_place_home"
            onClick={onSignOut}
          >
            Выход
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
