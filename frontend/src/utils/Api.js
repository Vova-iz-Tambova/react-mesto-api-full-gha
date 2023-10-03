class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    // this._headers = options.headers
  }
  // Проверка ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  // Получение данныех пользователя с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse);
  }
  // отправка новых данных пользователя на сервер
  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(this._checkResponse)
  }
  // отправка нового аватара на сервер
  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(this._checkResponse)
  }
  // Получение списка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }
  // Отправка на сервер новой карточки
  setNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse)
  }
  // Удаление своей карточки с сервера
  delMyCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse)
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }

}

const api = new Api({
  baseUrl: 'https://mesto-69.nomoredomainsrocks.ru',
})

export default api
