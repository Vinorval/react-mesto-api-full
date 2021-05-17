import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  //запись контекста с информацией о пользователе в переменную
  const currentUser = React.useContext(CurrentUserContext);

  //проверка id создателя карточки с id пользователя, для верного отображения кнопки удаления карточки
  const isOwn = props.owner === currentUser._id;
  //проверка id человека, который поставил like, с id пользователя, для верного отображения книпки like
  const isLiked = props.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__button-like ${
    isLiked ? "element__button-like_active" : ""
  }`;

  const cardClick = () => props.onCardClick(props.src, props.name);
  const cardLike = () => props.onCardLike(props);
  const cardDelete = () => props.onCardDelete(props._id);

  //возвращать уже созданную разметку для всех карточек
  return (
    <li className="element">
      <img
        src={props.src}
        className="element__image"
        alt={props.name}
        onClick={cardClick}
      />
      <div className="element__rectangle">
        <h2 className="element__title">{props.name}</h2>
        <div>
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={cardLike}
          ></button>
          <p className="element__number-like">{props.likes.length}</p>
        </div>
        <button
          type="button"
          className={` element__button-delete ${
            isOwn ? "" : "element__button-delete_off"
          }`}
          onClick={cardDelete}
        ></button>
      </div>
    </li>
  );
}

export default Card;
