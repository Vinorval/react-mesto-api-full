import React from "react";

function Login({ onLogin }) {
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
    onLogin(password, email);
  }

  return (
    <form onSubmit={handleSubmit} className="login">
      <h2 className="login__title">Вход</h2>
      <input
        type="email"
        name="userEmail"
        className="login__input"
        placeholder="Email"
        value={email}
        required
        onChange={handleChangeEmail}
      ></input>
      <input
        type="password"
        name="userPassword"
        className="login__input"
        placeholder="Пароль"
        value={password}
        required
        onChange={handleChangePassword}
      ></input>
      <button type="submit" className="login__button">
        Войти
      </button>
    </form>
  );
}

export default Login;
