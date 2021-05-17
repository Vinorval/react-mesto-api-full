import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  //создание переменных состояния, отвечающие за инпуты
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    //отправка данных с инпутов в функцию с запросом на сервер для регистрации
    onRegister(password, email);
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h2 className="register__title">Регистрация</h2>
      <input
        type="email"
        name="userEmail"
        className="register__input"
        placeholder="Email"
        value={email}
        required
        onChange={handleChangeEmail}
      ></input>
      <input
        type="password"
        name="userPassword"
        className="register__input"
        placeholder="Пароль"
        value={password}
        required
        onChange={handleChangePassword}
      ></input>
      <button type="submit" className="register__button">
        Зарегистрироваться
      </button>
      <Link to="/sign-in" className="register__text">
        Уже зарегистрированы? Войти
      </Link>
    </form>
  );
}

export default Register;
