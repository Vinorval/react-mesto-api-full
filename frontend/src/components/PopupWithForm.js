import buttonClose from "../image/add-button.svg";

function PopupWithForm({ name, isOpen, onClose, onSubmit, title, children}) {
  //возвращения общей разметки для попапов с формой
  return (
    <>
      <section
        className={`popup popup_place_${name} ${
          isOpen && "popup_opened"
        }`}
      >
        <div className="popup__container">
          <button
            type="button"
            className="popup__button-close"
            onClick={onClose}
          >
            <img
              src={buttonClose}
              className="popup__image-close"
              alt="кнопка, закрывающая форму без изменений"
            />
          </button>
          <form
            className={`form form_place_${name}`}
            name="profileform"
            noValidate
            onSubmit={onSubmit}
          >
            <h2 className="form__title">{title}</h2>
            {children}
          </form>
        </div>
      </section>
    </>
  );
}

export default PopupWithForm;
