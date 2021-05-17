import buttonClose from "../image/add-button.svg";
import success from "../image/Union.svg";
import unsuccess from "../image/Unionnein.svg";

function InfoTooltip({ isOpen, onClose, status }) {
  return (
    <>
      <section
        className={`popup popup_place_register ${
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
          <form className="form form_place_register">
            <img
              src={`${status ? success : unsuccess}`}
              className="popup__image-status"
              alt="картинка статуса"
            />
            <h2 className="form__title form__title_place_register">
              {`${
                status
                  ? "Вы успешно зарегистрировались!"
                  : "Что-то пошло не так! Попробуйте ещё раз."
              }`}
            </h2>
          </form>
        </div>
      </section>
    </>
  );
}

export default InfoTooltip;
