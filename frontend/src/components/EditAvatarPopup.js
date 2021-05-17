import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  //создание рефа для инпута с ссылкой на картинку аватара
  const avatarRef = React.useRef();

  //события при сохранении изменения аватара
  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения ссылки на новый аватар во внешний обработчик
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <>
      <PopupWithForm
        title="Обновить аватар"
        name="edit-avatar"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <label className="form__label">
          <input
            ref={avatarRef}
            type="url"
            name="avatarlink"
            className="form__input form__input_place_edit-avatar"
            id="url-avatar"
            placeholder="Ссылка на картинку"
            required
          />
          <span
            id="url-avatar-error"
            className="form__input-error form__input-error_place_edit-avatar form__input-error_active"
          ></span>
        </label>
        <button
          type="submit"
          className="form__button-submit form__button-submit_place_edit-avatar"
        >
          Сохранить
        </button>
      </PopupWithForm>
    </>
  );
}

export default EditAvatarPopup;
