import { useState } from "react";
import "./Login.css";

import { validarEmail } from "../../utils/validarEmail";

function Login({ onMudarParaCadastro }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [carregando, setCarregando] = useState(false);

    function handleSubmit(e) {

        e.preventDefault();

        setErro("");
        setSucesso("");

        if (!email || !senha) {
            setErro("Preencha todos os campos.");
            return;
        }

        if (!validarEmail(email)) {
            setErro("E-mail inválido.");
            return;
        }

        // simulacao de login 
        const usuario = {
            email: "teste@gmail.com",
            senha: "123456"
        };

        if (
            email !== usuario.email ||
            senha !== usuario.senha
        ) {
            setErro("E-mail ou senha inválidos.");
            return;
        }

        setCarregando(true);

        setTimeout(() => {

            setCarregando(false);

            setSucesso("Login realizado com sucesso!");

        }, 1500);

    }

    return (

        <div className="container-login">

            <h1>FinDesk</h1>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

                <div>

                    <label>E-mail</label>

                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>

                <div>

                    <label>Senha</label>

                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                </div>

                {erro &&
                    <p className="erro">
                        {erro}
                    </p>
                }

                {sucesso &&
                    <p className="sucesso">
                        {sucesso}
                    </p>
                }

                <button
                    type="submit"
                    disabled={carregando}
                >
                    {carregando
                        ? "Entrando..."
                        : "Entrar"}
                </button>

            </form>

            <p>
                <a href="#">
                    Esqueci minha senha
                </a>
            </p>

            <p>

                Não possui uma conta?{" "}

                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onMudarParaCadastro();
                    }}
                >
                    Cadastre-se
                </a>

            </p>

        </div>

    );

}

export default Login;