import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  //создание переменных состояния для хранения имени и информации о пользователе
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  //создание контекста о пользователе
  const currentUser = React.useContext(CurrentUserContext);

  //изменение имени, в зависимости от значения инпута
  function handleChangeName(event) {
    setName(event.target.value);
  }

  //изменение информации о пользователе, в зависимости от значения инпута
  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  React.useEffect(() => {
    // запись имени и информации о пользователе из контекста
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  //события при сохранении новой информации о пользователе
  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <>
      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <label className="form__label">
          <input
            type="text"
            name="profileneme"
            className="form__input form__input_profile_name"
            id="profile-name"
            placeholder="Имя"
            value={name || ""}
            required
            minLength="2"
            maxLength="40"
            onChange={handleChangeName}
          />
          <span
            id="profile-name-error"
            className="form__input-error form__input-error_active"
          ></span>
        </label>
        <label className="form__label">
          <input
            type="text"
            name="profilejob"
            className="form__input form__input_profile_job"
            id="profile-job"
            placeholder="О себе"
            value={description || ""}
            required
            minLength="2"
            maxLength="200"
            onChange={handleChangeDescription}
          />
          <span
            id="profile-job-error"
            className="form__input-error form__input-error_active"
          ></span>
        </label>
        <button
          type="submit"
          className="form__button-submit form__button-submit_place_profile"
        >
          Сохранить
        </button>
      </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;
