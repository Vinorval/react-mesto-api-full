import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
  // Создание переменных состояния для названия и ссылки на картинку карточки
  const [name, setName] = React.useState();
  const [link, setLink] = React.useState();

  //изменение названия карточки, в зависимости от значения инпута
  function handleChangeName(event) {
    setName(event.target.value);
  }

  //изменение ссылки картинки карточки, в зависимости от значения инпута
  function handleChangeLink(event) {
    setLink(event.target.value);
  }

  //события при создании новой карточки
  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name,
      link,
    });
  }

  return (
    <>
      <PopupWithForm
        title="Новое место"
        name="addcards"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <label className="form__label">
          <input
            type="text"
            name="imageneme"
            className="form__input form__input_place_addcards form__input_card_image-name"
            id="name-card"
            placeholder="Название"
            value={name || ''}
            required
            minLength="2"
            maxLength="30"
            onChange={handleChangeName}
          />
          <span
            id="name-card-error"
            className="form__input-error form__input-error_place_addcards form__input-error_active"
          ></span>
        </label>
        <label className="form__label">
          <input
            type="url"
            name="imagelink"
            className="form__input form__input_place_addcards form__input_card_image-link"
            id="url-card"
            placeholder="Ссылка на картинку"
            value={link || ''}
            required
            onChange={handleChangeLink}
          />
          <span
            id="url-card-error"
            className="form__input-error form__input-error_place_addcards form__input-error_active"
          ></span>
        </label>
        <button
          type="submit"
          className="form__button-submit form__button-submit_place_addcards"
        >
          Создать
        </button>
      </PopupWithForm>
    </>
  );
}

export default AddPlacePopup;
