import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup(props) {
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
                  value={props.name} // Agregado: muestra el texto a editar en el campo
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
                  value={props.about} // Agregado: muestra el texto a editar en el campo
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
