import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext';


export default function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName('');
    setDescription('');
  }, [currentUser]);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  }

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  }

  return (
    <>
      <PopupWithForm
        name={"profile"}
        open={props.open}
        errors={props.errors}
        setErrors={props.setErrors}
        handleClose={props.handleClose}
      >
        <div id="profilePopup">
          <form
            id="form"
            onSubmit={props.handleSubmitProfile}
            action=""
            className="popup"
            name="edit-profile"
            noValidate
          >
            <h4 className="popup__title-popup">Edit profile</h4>
            <fieldset className="popup__fieldset">
              <div className="popup__field">
                <input
                  id="profileTitle"
                  className={`popup__input-popup ${
                    props.errors.profile.name ? "popup__input-popup_error" : ""
                  }`}
                  type="text"
                  placeholder="Nombre"
                  name="name"
                  required
                  minLength="2"
                  maxLength="40"
                  value={name} //muestra el texto a editar en el campo name
                  onChange={handleNameChange} // Manejador para actualizar el estado del nombre
                />
                <span className="popup__error popup__error_name">
                  {props.errors.profile.name}
                </span>
              </div>

              <div className="popup__field">
                <input
                  id="profileSubtitle"
                  className="popup__input-popup"
                  type="text"
                  placeholder="Acerca de mí"
                  name="about"
                  required
                  minLength="2"
                  maxLength="200"
                  value={description}  // muestra el texto a editar en el campo abaut
                  onChange={handleDescriptionChange} // Manejador para actualizar el estado de abaut
                />
                <span className="popup__error popup__error_about">
                  {props.errors.profile.about}
                </span>
              </div>
              <button
                disabled={props.isInvalid("profile")}
                id="save"
                type="submit"
                className={`popup__button-popup ${
                  props.isInvalid("profile")
                    ? "popup__button-popup_inactive"
                    : ""
                }`}
              >
                Guardar
              </button>
            </fieldset>
          </form>
        </div>
      </PopupWithForm>
    </>
  );
}