import { useState } from 'react'
import './style/Login.css'

function Login() {
  return (
    <div className="container-login">
      <h1>FinDesk</h1>
      <h2>Login</h2>

      <form>
        <div>
          <label>E-mail</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
          />
        </div>

        <div>
          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
          />
        </div>

        <button type="submit">
          Entrar
        </button>
      </form>

      <p>
        <a href="#">Esqueci minha senha</a>
      </p>

      <p>
        Não possui uma conta? <a href="#">Cadastre-se</a>
      </p>
    </div>
  );
}

export default Login;