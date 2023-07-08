import React, { useState } from 'react';
import * as auth from '../utils/auth';
import { Link, useHistory } from 'react-router-dom';

export default function Register(props) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

    //LLAMAMOS A AUTH:
  const handleSubmit = (e) => {
    e.preventDefault();
    auth.register({ email, password })
      .then((res) => {
        if (res.error) {
          props.handleStateInfo(false);  
        } else {
          history.push('/signin'); // Redirige al Login después del registro exitoso
          props.handleStateInfo(true);
        }
      })
      .catch((err) => {
        props.handleStateInfo(false);
      });
  };

  return (
    <div className="login">
      <p className="login__welcome">Regístrate</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__field">
          <input
            className="form__input"
            placeholder="Correo electrónico"
            name="email"
            type="email"
            minLength="2"
            maxLength="50"
            value={email}
            onChange={handleChangeEmail}
            required
          />
        </div>

        <div className="form__field">
          <input
            className="form__input"
            placeholder="Contraseña"
            name="password"
            type="password"
            minLength="2"
            maxLength="50"
            value={password}
            onChange={handleChangePassword}
            required
          />
        </div>
        <button onClick={handleSubmit}  type="submit" className="form__button">
          Registrarse
        </button>
      </form>

      <Link to="/signin" className="login__link">
        ¿Ya eres miembro? Inicia sesión aquí
      </Link>
    </div>
  );
}
