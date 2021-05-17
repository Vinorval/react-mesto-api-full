import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import auth from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";

function App() {
  //создаём переменные состояния, отвечающие за открытие попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [tooltipData, setTooltipData] = React.useState({
    isOpen: false,
    status: false,
  });
  //создаём переменные состояния, отвечающие за верное отображение папапа с картинкой
  const [linkImage, setLinkImage] = React.useState("");
  const [nameImage, setNameImage] = React.useState("");
  //создаём переменные состояния, отвечающие информацию о пользователе и всех карточек
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [userEmail, setUserEmail] = React.useState("");

  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);

  //выполняем запрос на сервер для проверки токена пользователя
  React.useEffect(() => {
    //взятие статуса токена из локального хранилища
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setUserEmail(res.email);
          setLoggedIn(true);
          //даём доступ к оснавной странице
          history.push("/");
          //показываем все карточки из базы данных
          api.getAllCard(token).then((res) => {
            const items = res.map((item) => {
              return {
                //возвращаем массив с нужными данными для создания начальных карточек
                key: item._id,
                _id: item._id,
                link: item.link,
                name: item.name,
                likes: item.likes,
                owner: item.owner,
              };
            });
            //выполняем запись этого массива в переменную состояния
            setCards(items);
          });
          //возвращаем данные пользователя из базы данных
          api.getProfileInfo(token).then((result) => {
            //выполняем запись полученных данных в переменную состояния
            setCurrentUser(result);
          });
        })
        .catch((err) => {
          alert(err);
          localStorage.removeItem("token");
        });
    }
  }, [history]);

  function handleUpdateUser(data) {
    const token = localStorage.getItem("token");
    //выполняем запрос на сервер для отпраки новой информации о пользователе
    api
      .putProfileInfo(data, token)
      .then((result) => {
        //выполняем запись полученных данных в переменную состояния
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleUpdateAvatar(data) {
    const token = localStorage.getItem("token");
    //выполняем запрос на сервер для отправки новой информации об аватаре пользователя
    api
      .putProfileAvatar(data, token)
      .then((result) => {
        //выполняем запись полученных данных в переменную состояния
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleCardLike(card) {
    const token = localStorage.getItem("token");
    //проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleCardDelete(id) {
    const token = localStorage.getItem("token");
    // Отправляем запрос в API и удаляем карточку
    api
      .removeCard(id, token)
      .then(() => setCards(cards.filter((card) => card._id !== id)))
      .catch((err) => {
        alert(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    const token = localStorage.getItem("token");
    // Отправляем запрос в API и создаёь новую карточку
    api
      .addCard(data, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      });
  }

  //регестрируем нового пользователя
  function registerUser(password, email) {
    auth
      .register(password, email)
      .then(() => {
        setTooltipData({ isOpen: true, status: true });
        history.push("/sign-in");
      })
      .catch(() => {
        setTooltipData({ isOpen: true, status: false });
      });
  }

  //выполняем вход пользователя
  function enterUser(password, email) {
    auth
      .login(password, email)
      .then((res) => {
        if (res.token) {
          setUserEmail(email);
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          history.push("/");
          //возвращаем данные пользователя
          api.getProfileInfo(res.token).then((result) => {
            //выполняем запись полученных данных в переменную состояния
            setCurrentUser(result);
          });
          //показываем все карточки из базы данных
          api.getAllCard(res.token).then((res) => {
            const items = res.map((item) => {
              return {
                //возвращаем массив с нужными данными для создания начальных карточек
                key: item._id,
                _id: item._id,
                link: item.link,
                name: item.name,
                likes: item.likes,
                owner: item.owner,
              };
            });
            //выполняем запись этого массива в переменную состояния
            setCards(items);
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  //выполняем выход пользователя с удалением токена из локального хранилища
  function signOut() {
    localStorage.removeItem("token");
  }

  //слушатель на кнопку изменить профиль
  function handleEdittProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  //слушатель на кнопку изменить аватар
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  //слушатель на кнопку добавить карточку
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  //слушатель нажатия на картинку
  function handleCardClick(link, name) {
    setSelectedCard(!selectedCard);
    setLinkImage(link);
    setNameImage(name);
  }

  //слушатель на кнопку закрыть попап
  function closeAllPopups() {
    if (isEditProfilePopupOpen === true) {
      setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }
    if (isEditAvatarPopupOpen === true) {
      setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }
    if (isAddPlacePopupOpen === true) {
      setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }
    if (selectedCard === true) {
      setSelectedCard(!selectedCard);
    }
    if (tooltipData.isOpen === true) {
      setTooltipData({ ...tooltipData, isOpen: false });
    }
  }

  //возвращаем разметку вместе со всеми блоками и попапами
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header onSignOut={signOut} userEmail={userEmail} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEdittProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-up">
            <Register onRegister={registerUser} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={enterUser} />
          </Route>
        </Switch>
        <Footer />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          linkImage={linkImage}
          nameImage={nameImage}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        {/*попап с формой для удаления карточки*/}
        <PopupWithForm title="Вы уверены?" name="delete-card">
          <button
            type="button"
            className="form__button-submit form__button-submit_place_delete-card"
          >
            Да
          </button>
        </PopupWithForm>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <InfoTooltip
          status={tooltipData.status}
          isOpen={tooltipData.isOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
