export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-submit",
  inputInvalidClass: "form__input_type_error",
  buttonInvalidClass: "form__button-submit_disabled",
};

//нахождение переменных для редактирования профиля
export const buttonEditProfile = document.querySelector(
  ".profile__edit-button"
);
export const profileForm = document.querySelector(".form_place_profile");
export const nameInput = profileForm.querySelector(".form__input_profile_name");
export const jobInput = profileForm.querySelector(".form__input_profile_job");

//нахождение переменных формы для добавления карточек
export const buttonAddCard = document.querySelector(".profile__add-button");
export const formAddCard = document.querySelector(".form_place_addcards");

//нахождение переменных для добавления начальных и новых карточек
export const newElementName = document.querySelector(
  ".form__input_card_image-name"
);
export const newElementPhoto = document.querySelector(
  ".form__input_card_image-link"
);

export const avatarInput = document.querySelector(
  ".form__input_place_edit-avatar"
);
export const avatarForm = document.querySelector(".form_plase_edit-avatar");
export const avatar = document.querySelector(".profile__avatar-hover");
