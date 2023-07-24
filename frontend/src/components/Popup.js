import React from "react";

export default function Popup(props) {
  // Agregamos un manejador de eventos para cerrar el Popup al presionar 'Esc'
  React.useEffect(() => {
    function handleEscKey(event) {
      if (event.key === "Escape") {
        props.handleClose();
      }
    }

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [props.handleClose]);

  return (
    <div
      className={`popup-container ${
        props.open ? "popup-container_show" : ""
      }`}
    >
      <button
        onClick={props.handleClose}
        className="popup-container__close-popup"
      ></button>
      {props.children}
    </div>
  );
}


