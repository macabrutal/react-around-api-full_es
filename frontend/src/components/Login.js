import React, { useState } from 'react';
import * as auth from '../utils/auth';
import { Link, useHistory } from 'react-router-dom';


export default function Login(props) {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.authorize({ email, password })
      .then((res) => {
        if (res.error) {
          props.handleStateInfo(false);
        } else {
          props.handleLogin()
          history.push('/'); // Redirige al main
        }
      })
      .catch((err) => {
        console.log(err);
        props.handleStateInfo(false);
      });
  };

  return (
    <div className="login">
      <p className="login__welcome">Inicia sesión</p>
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
        <button onClick={handleSubmit} type="submit" className="form__button">
          Iniciar sesión
        </button>

      </form>

      < Link to="/signup" className="login__link">
        ¿Aún no eres miembro? Regístrate aquí
      </Link>

    </div>
  );
}
