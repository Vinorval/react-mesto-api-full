class Api {
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

  //получение карточек с сервера
  getAllCard(token) {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  //добавление карточки на сервер
  addCard(data, token) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  //удаление карточки с сервера
  removeCard(cardId, token) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  //получение информации о пользователе с сервера
  getProfileInfo(token) {
    return fetch(`${this._url}users/me/`, {
      method: "GET",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  //передача новой информации о пользователе на сервер
  putProfileInfo(data, token) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  //передача нового аватара пользователя на сервера
  putProfileAvatar(data, token) {
    return fetch(`${this._url}users/me/avatar/`, {
      method: "PATCH",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }

  addLike(cardId, token) {
    return fetch(`${this._url}cards/likes/${cardId}/`, {
      method: "PUT",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  //запрос на сервер для удаления лайка
  removeLike(cardId, token) {
    return fetch(`${this._url}cards/likes/${cardId}/`, {
      method: "DELETE",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked) {
      return fetch(`${this._url}cards/${cardId}/likes/`, {
        method: "PUT",
        headers: {
          ...this.headers,
          Authorization: `Bearer ${token}`,
        },
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._url}cards/${cardId}/likes/`, {
        method: "DELETE",
        headers: {
          ...this.headers,
          Authorization: `Bearer ${token}`,
        },
      }).then(this._checkResponse);
    }
  }
}

//запись всего класса Api в переменную и её импорт
const api = new Api({
  url: "http://api.vinorval.mesto.nomoredomains.club/",
  headers: {
    "content-type": "application/json",
  },
});

export default api;
