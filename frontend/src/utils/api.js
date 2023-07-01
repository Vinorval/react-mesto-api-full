class Api {
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

  //получение карточек с сервера
  getAllCard(token) {
    return this._createRequest(`${this._url}cards`, "GET", { ...this.headers, Authorization: `Bearer ${token}` }).then(this._checkResponse);
  }

  //добавление карточки на сервер
  addCard(data, token) {
    return this._createRequest(`${this._url}cards`, "POST", { ...this.headers, Authorization: `Bearer ${token}` }, JSON.stringify({name: data.name, link: data.link})).then(this._checkResponse);
  }

  //удаление карточки с сервера
  removeCard(cardId, token) {
    return this._createRequest(`${this._url}cards/${cardId}`, "DELETE", { ...this.headers, Authorization: `Bearer ${token}` }).then(this._checkResponse);
  }

  //получение информации о пользователе с сервера
  getProfileInfo(token) {
    return this._createRequest(`${this._url}users/me/`, "GET", { ...this.headers, Authorization: `Bearer ${token}` }).then(this._checkResponse);
  }

  //передача новой информации о пользователе на сервер
  putProfileInfo(data, token) {
    return this._createRequest(`${this._url}users/me`, "PATCH", { ...this.headers, Authorization: `Bearer ${token}` }, JSON.stringify({name: data.name, about: data.about})).then(this._checkResponse);
  }

  //передача нового аватара пользователя на сервера
  putProfileAvatar(data, token) {
    return this._createRequest(`${this._url}users/me/avatar`, "PATCH", { ...this.headers, Authorization: `Bearer ${token}` }, JSON.stringify({avatar: data.avatar})).then(this._checkResponse);
  }

  addLike(cardId, token) {
    return this._createRequest(`${this._url}cards/likes/${cardId}/`, "PUT", { ...this.headers, Authorization: `Bearer ${token}` }).then(this._checkResponse);
  }

  //запрос на сервер для удаления лайка
  removeLike(cardId, token) {
    return this._createRequest(`${this._url}cards/likes/${cardId}/`, "DELETE", { ...this.headers, Authorization: `Bearer ${token}` }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked) {
      return this._createRequest(`${this._url}cards/${cardId}/likes/`, "PUT", { ...this.headers, Authorization: `Bearer ${token}` }).then(this._checkResponse);
    } else {
      return this._createRequest(`${this._url}cards/${cardId}/likes/`, "DELETE", { ...this.headers, Authorization: `Bearer ${token}` }).then(this._checkResponse);
    }
  }
}

//запись всего класса Api в переменную и её импорт
const api = new Api({
  url: "https://api.vinorval.mesto.nomoredomains.club/",
  headers: {
    "content-type": "application/json",
  },
});

export default api;
