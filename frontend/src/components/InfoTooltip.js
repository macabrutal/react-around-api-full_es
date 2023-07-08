//un componente de ventana modal que informa al usuario si ha sido registrado exitosamente.

import React from "react";
import Popup from "./Popup";

import successIcon from "../images/succes.png"
import errorIcon from "../images/error.png"

export default function InfoTooltip(props) {

  return (

    <Popup open={props.open} handleClose={props.handleClose}>
      <div className="popup">
        <img className="popup__successIcon"
          src={props.stateInfoToolTip ? successIcon : errorIcon}
          alt="exito"
        />
        <h1 className="popup__successTitle">
          {props.stateInfoToolTip
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}{" "}
        </h1>
      </div>
    </Popup>
  );
}


