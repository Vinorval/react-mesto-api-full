import buttonClose from "../image/add-button.svg";

function ImagePopup({ card, onClose, linkImage, nameImage }) {
  //возвращать разметку для попапа с картинкой карточки
  return (
    <section
      className={`popup popup_place_image ${card && "popup_opened"}`}
    >
      <div className="popup__holder">
        <button
          type="button"
          className="popup__button-close popup__button-close_place_addcards popup__button-close_place_image"
          onClick={onClose}
        >
          <img
            src={buttonClose}
            className="popup__image-close popup__image-close_place_addcards"
            alt="кнопка, закрывающая форму без изменений"
          />
        </button>
        <img
          src={linkImage}
          className="popup__image"
          alt={linkImage}
        />
        <h2 className="popup__title">{nameImage}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
