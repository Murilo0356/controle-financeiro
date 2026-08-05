import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Cadastro.css";

import { forcaSenha, corForcaSenha } from "../../utils/ValidarSenha";
import { validarEmail } from "../../utils/ValidarEmail";

function Cadastro() {

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [carregando, setCarregando] = useState(false);

    const emailsCadastrados = [
        "teste@gmail.com",
        "admin@gmail.com"
    ];

    function handleSubmit(e) {

        e.preventDefault();

        setErro("");
        setSucesso("");

        if (!nome || !email || !senha || !confirmarSenha) {
            setErro("Preencha todos os campos.");
            return;
        }

        if (!validarEmail(email)) {
            setErro("E-mail inválido.");
            return;
        }

        if (emailsCadastrados.includes(email.toLowerCase())) {
            setErro("Este e-mail já está cadastrado.");
            return;
        }

        if (senha.length < 6) {
            setErro("A senha deve possuir pelo menos 6 caracteres.");
            return;
        }

        if (senha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        setCarregando(true);

        setTimeout(() => {

            setCarregando(false);

            setSucesso("Cadastro realizado com sucesso!");

            setNome("");
            setEmail("");
            setSenha("");
            setConfirmarSenha("");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        }, 1500);

    }

    return (

        <div className="container-cadastro">

            <h1>Novo Cadastro</h1>

            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>Nome</label>

                    <input
                        type="text"
                        placeholder="Digite seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                </div>

                <div className="form-group">

                    <label>E-mail</label>

                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>

                <div className="form-group">

                    <label>Senha</label>

                    <div className="campo-senha-wrapper-cadastro">

                        <input
                            type={mostrarSenha ? "text" : "password"}
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        <button
                            type="button"
                            className={`botao-mostrar-senha-cadastro ${mostrarSenha ? "ativo" : ""}`}
                            onClick={() => setMostrarSenha(!mostrarSenha)}
                        >
                            {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                        </button>

                    </div>

                </div>

                <div
                    className="forca-senha"
                    style={{
                        color: corForcaSenha(senha)
                    }}
                >
                    Força da senha: {senha ? forcaSenha(senha) : "---"}
                </div>

                <div className="form-group">

                    <label>Confirmar Senha</label>

                    <div className="campo-senha-wrapper-cadastro">

                        <input
                            type={mostrarSenha ? "text" : "password"}
                            placeholder="Confirme sua senha"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                        />

                        <button
                            type="button"
                            className={`botao-mostrar-senha-cadastro ${mostrarSenha ? "ativo" : ""}`}
                            onClick={() => setMostrarSenha(!mostrarSenha)}
                        >
                            {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                        </button>

                    </div>

                </div>

                {erro && (
                    <p className="erro">
                        {erro}
                    </p>
                )}

                {sucesso && (
                    <p className="sucesso">
                        {sucesso}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={carregando}
                >
                    {carregando
                        ? "Cadastrando..."
                        : "Cadastrar"}
                </button>

            </form>

            <p style={{ marginTop: "20px" }}>
                Já possui uma conta?{" "}

                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/login");
                    }}
                >
                    Fazer Login
                </a>

            </p>

        </div>

    );

}

export default Cadastro;