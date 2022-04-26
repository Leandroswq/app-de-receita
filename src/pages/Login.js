import React, { useState, useEffect } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const regEx = /^[\w.-]+@[\w.-]+\.[\w]+(\.[\w]+)?$/i;
    const checkEmail = regEx.test(email);
    const numberMin = 6;
    const checkPassword = password.length >= numberMin;
    setValid(checkEmail === true && checkPassword === true);
  }, [email, password]);

  return (
    <form>
      <label htmlFor="email">
        <input
          data-testid="email-input"
          type="email"
          autoComplete="false"
          id="email"
          onChange={ ({ target }) => setEmail(target.value) }
          placeholder="alguem@alguem.com"
        />
      </label>
      <label htmlFor="senha">
        <input
          data-testid="password-input"
          type="password"
          autoComplete="false"
          id="senha"
          onChange={ ({ target }) => setPassword(target.value) }
          placeholder="******"
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ !valid }
      >
        Enter
      </button>
    </form>
  );
}
