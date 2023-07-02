export const BASE_URL = "https://vinorval.mesto.nomoredomains.club/";

class Auth {
  constructor(config) {
    this._url = config.url;
    this.headers = config.headers;
  }

  _createRequest(url, method, headers, body) {
    return fetch(url, {
      method: method,
      headers: headers,
      body: body
    })
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  //запрос на регистрацию пользователя
  register(password, email) {
    return this._createRequest(`${this._url}/signup`, "POST", this.headers, JSON.stringify({ password, email })).then(this._checkResponse);
  }

  //запрос на вход пользователя
  login(password, email) {
    return this._createRequest(`${this._url}/signin`, "POST", this.headers, JSON.stringify({ password, email })).then(this._checkResponse);
  }

  //запрос на проверку токена пользователя
  checkToken(token) {
    return this._createRequest(`${this._url}/users/me`, "GET", { ...this.headers, Authorization: `Bearer ${token}` }).then(this._checkResponse);
  }
}

const auth = new Auth({
  url: "https://api.vinorval.mesto.nomoredomains.club",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default auth;
