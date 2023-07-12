import React from "react";

import "../index.css";

import Header from "./Header";
import Footer from "./Footer";
import api from "../utils/api";
import ImagePopup from "./ImagePopup"; //Antes: PopupWithImage
import PopupWithForm from "./PopupWithForm";
import Main from "./Main";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

import Login from "./Login";
import Register from "./Register";
import { Route, Switch, Redirect, withRouter, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip"

function App() {
  const [cards, setCards] = React.useState([]); //estado de usuarios

  const [openPopup, setOpenPopup] = React.useState('');

  const [selectedCard, setSelectedCard] = React.useState(''); //para saber que card esta seleccionada

  const [errors, setErrors] = React.useState({
    profile: {},
    addCard: {},
    avatar: {},
  });

  const [currentUser, setCurrentUser] = React.useState({});

  //Proyecto 15
  const [email, setEmail] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [stateInfoToolTip, setStateInfoToolTip] = React.useState(false);
  const history = useHistory();

  //proyecto 16
  const [token, setToken] = useState('');

  useEffect(() => {
    function tokenCheck() {
      setToken(localStorage.getItem('token'));
      if (token) {
        auth.getContent(token).then((res) => {
          setIsLoggedIn(true);
          setEmail(res.user.email);
        });
      }
    }
    tokenCheck();
  }, [token, email, isLoggedIn]);


  React.useEffect(() => {
    api
      .getInitialCards()
      .then((json) => {
        setCards(json);
      })
      .catch((error) => { });
  }, []);

  //para comprobar el token del usuario almacenado en localStorage.setItem('jwt') de auth.js
  React.useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    } else {
      getProfile();
      authorizeUser();
    }

  }, [history, isLoggedIn]);

  function getProfile() {
    api
      .getProfileInfo()
      .then((json) => {
        setCurrentUser(json);
      })
      .catch((error) => { });
  }

  function authorizeUser() {
    const token = localStorage.getItem("jwt");

    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
        });
    }
  }

  const imageRef = React.useRef();

  function handleLikeCard(cardId) {
    const card = cards.find((item) => {
      return item._id === cardId;
    });

    // Verifica una vez más si a esta tarjeta ya le han dado like
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Envía una petición a la API y obtén los datos actualizados de la tarjeta
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  // 3 HANDLE PARA CARD
  function handleClickImage(cardId) {
    setOpenPopup("popupImage");
    const card = cards.find((item) => {
      return item._id === cardId;
    });
    setSelectedCard(card);
  }

  function handleDeleteCard(cardId) {
    setOpenPopup("confirmation");
    const card = cards.find((item) => {
      return item._id === cardId;
    });
    setSelectedCard(card);
  }

  // 3 HANDLE PARA UserInfo
  function handleEditAvatar() {
    setOpenPopup("avatar");
  }

  function handleEditProfile() {
    setOpenPopup("profile");
  }

  function handleClickAdd() {
    setOpenPopup("addCard");
  }

  function handleClosePopup() {
    setOpenPopup("");
  }

  // envía el form de EDIT PROFILE y lo cierra:
  function handleSubmitProfile(event) {
    event.preventDefault();
    api
      .editProfile(
        event.target.elements["name"].value,
        event.target.elements["about"].value
      )
      .then((json) => {
        setCurrentUser(json);
        handleClosePopup();
      });
    event.target.reset(); //resetear los inputs
  }

  function handleSubmitAvatar(event) {
    event.preventDefault();
    const linkValue = imageRef.current.value;
    api.newAvatar(linkValue).then((json) => {
      setCurrentUser(json);
      handleClosePopup();
    });
    event.target.reset(); //resetear los inputs
  }

  // envía el form de ADD CARD y lo cierra:
  function handleSubmitAddCard(event) {
    event.preventDefault();

    const titleValue = event.target.elements["title"].value;
    const imageValue = event.target.elements["image"].value;
    api.addNewCard(titleValue, imageValue).then((data) => {
      setCards([data, ...cards]);
      handleClosePopup();
    });
    event.target.reset(); //resetear los inputs
  }

  // envía el form Confirmation y lo cierra:
  function handleSubmitConfirmation(event) {
    event.preventDefault();
    api.deleteCard(selectedCard._id).finally(() => {
      setOpenPopup("");
      api
        .getInitialCards()
        .then((json) => {
          setCards(json);
        })
        .catch((error) => { });
    }); //borra la card seleccionada
  }

  function isInvalid(form) {
    if (!errors[form]) return false;
    return Object.keys(errors[form]).some((item) => {
      return errors[form][item] !== "";
    });
  }

  function handleLogin() {
    authorizeUser();
  }

  function handleLogout() {
    setEmail('');
    setIsLoggedIn(false);
    setCurrentUser({});
    setToken(localStorage.removeItem("token"));
  }


  //HAMDLE PARA InfoTooltip (EXITO & ERROR)
  function handleStateInfo(infoStatus) {
    setStateInfoToolTip(infoStatus);
    setOpenPopup("popupInfoTooltip");
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header handleLogout={handleLogout} email={email} />

        <Switch>
          <Route exact path="/signin">
            <Login handleLogin={handleLogin} handleStateInfo={handleStateInfo} />
          </Route>

          <Route path="/signup">
            <Register handleStateInfo={handleStateInfo} />
          </Route>

          <ProtectedRoute path="/" isLoggedIn={isLoggedIn}>
            <Main
              cards={cards}
              handelOpenPopup={() => {
                setOpenPopup("profile");
              }}
              handleEditAvatar={handleEditAvatar}
              handleEditProfile={handleEditProfile}
              handleClickAdd={handleClickAdd}
              handleClickImage={handleClickImage}
              handleLikeCard={handleLikeCard}
              handleDeleteCard={handleDeleteCard}
            />
          </ProtectedRoute>

          <Route exact path="/">
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
      </CurrentUserContext.Provider>

      <Footer />

      {/* CONFIRMATION (DELETE) */}
      <PopupWithForm
        name={"confirmation"}
        open={openPopup === "confirmation"}
        errors={errors}
        setErrors={setErrors}
        handleClose={handleClosePopup}
      >
        <div id="popupDelete">
          <form
            id="formDelete"
            onSubmit={handleSubmitConfirmation}
            action=""
            className="popup popup_question"
            name="delete-card"
            noValidate
          >
            <h4 className="popup__title-popup">¿Estás seguro?</h4>
            <input
              type="hidden"
              name="card_id"
              className="popup__input-popup popup__hidden"
            />
            <fieldset className="popup__fieldset">
              <button
                id="saveDelete"
                type="submit"
                className="popup__button-popup"
              >
                Si
              </button>
            </fieldset>
          </form>
        </div>
      </PopupWithForm>

      {/* EDIT PROFILE*/}
      <EditProfilePopup
        name={"profile"}
        open={openPopup === "profile"}
        errors={errors}
        setErrors={setErrors}
        handleClose={handleClosePopup}
        isInvalid={isInvalid}
        handleSubmitProfile={handleSubmitProfile}
      />

      {/* AVATAR */}
      <EditAvatarPopup
        name={"avatar"}
        open={openPopup === "avatar"}
        errors={errors}
        setErrors={setErrors}
        handleClose={handleClosePopup}
        isInvalid={isInvalid}
        handleSubmitAvatar={handleSubmitAvatar}
        setCurrentUser={setCurrentUser}
      />

      {/* ADD CARD */}
      <AddPlacePopup
        name={"addCard"}
        open={openPopup === "addCard"}
        errors={errors}
        setErrors={setErrors}
        handleClose={handleClosePopup}
        handleSubmitAddCard={handleSubmitAddCard}
        isInvalid={isInvalid}
      />

      {/* IMAGE POPUP */}
      <ImagePopup
        name={"popupImage"}
        open={openPopup === "popupImage"}
        selectedCard={selectedCard}
        handleClose={handleClosePopup}
      />

      {/* POPUP EXITO & ERROR */}
      <InfoTooltip
        name={"popupInfoTooltip"}
        open={openPopup === "popupInfoTooltip"}
        handleClose={handleClosePopup}
        stateInfoToolTip={stateInfoToolTip}
      />
    </div>
  );
}

export default withRouter(App);
