export const BASE_URL = "https://vinorval.mesto.nomoredomains.club/";

class Auth {
  constructor(config) {
    this._url = config.url;
    this.headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  //запрос на регистрацию пользователя
  register(password, email) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ password, email }),
    }).then(this._checkResponse);
  }

  //запрос на вход пользователя
  login(password, email) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ password, email }),
    }).then(this._checkResponse);
  }

  //запрос на проверку токена пользователя
  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

const auth = new Auth({
  url: "http://vinorval.mesto.nomoredomains.club",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default auth;
