import React from "react";
import editButton from "../image/edit-button.svg";
import addButton from "../image/add-button.svg";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onEditAvatar, onAddPlace, cards, onCardClick, onCardDelete, onCardLike }) {
  //запись контекста с информацией о пользователе в переменную
  const currentUser = React.useContext(CurrentUserContext);

  //возвращать разметку основного контента страницы вместе с карточками
  return (
    <div className="content">
      <section className="profile section">
        <div className="profile__avatar-box" onClick={onEditAvatar}>
          <div className="profile__avatar-hover"></div>
          <img
            src={currentUser.avatar}
            className="profile__avatar"
            alt="аватар пользователя"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          >
            <img
              src={editButton}
              className="profile__image-edit"
              alt="кнопка, меняющая форму"
            />
          </button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        >
          <img
            src={addButton}
            className="profile__image-add"
            alt="кнопка, добавляющая картинки"
          />
        </button>
      </section>
      <section className="elements section">
        <ul className="elements__items">
          {cards.map((item) => (
            <Card
              key={item._id}
              onCardClick={onCardClick}
              _id={item._id}
              src={item.link}
              name={item.name}
              likes={item.likes}
              owner={item.owner}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Main;
