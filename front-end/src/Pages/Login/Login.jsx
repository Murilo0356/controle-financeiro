import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { validarEmail } from "../../utils/validarEmail";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function handleSubmit(e) {
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

        setCarregando(true);

        try {
            const usuario = await authService.login(email, senha);

            if (usuario) {
                setSucesso("Login realizado com sucesso!");

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            } else {
                setErro("E-mail ou senha inválidos.");
            }
        } catch (err) {
            setErro(err.message || "E-mail ou senha inválidos.");
        } finally {
            setCarregando(false);
        }
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

                {erro && <p className="erro">{erro}</p>}
                {sucesso && <p className="sucesso">{sucesso}</p>}

                <button type="submit" disabled={carregando}>
                    {carregando ? "Entrando..." : "Entrar"}
                </button>
            </form>

            <p>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/recuperar-senha");
                    }}
                >
                    Esqueci minha senha
                </a>
            </p>

            <p>
                Não possui uma conta?{" "}
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/cadastro");
                    }}
                >
                    Cadastre-se
                </a>
            </p>
        </div>
    );
}

export default Login;