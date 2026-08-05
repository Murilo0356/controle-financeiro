import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./RedefinirSenha.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { forcaSenha, corForcaSenha } from "../../utils/ValidarSenha";
import { redefinirSenha } from "../../services/authService";

function RedefinirSenha() {

    const { token } = useParams();
    const navigate = useNavigate();

    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [carregando, setCarregando] = useState(false);

    
    if (!token) {
        return (
            <div className="container-redefinir-senha">
                <div className="container-erro-token-redefinir">
                    <div className="icone-erro-redefinir">⚠️</div>
                    <h1>Link inválido</h1>
                    <p>
                        O link de redefinição de senha está incompleto ou
                        inválido. Solicite uma nova recuperação de senha.
                    </p>
                    <Link to="/recuperar-senha">
                        Solicitar novo link
                    </Link>
                </div>
            </div>
        );
    }

    function handleSubmit(e) {

        e.preventDefault();

        setErro("");
        setSucesso("");

        if (!novaSenha || !confirmarSenha) {
            setErro("Preencha todos os campos.");
            return;
        }

        if (novaSenha.length < 6) {
            setErro("A senha deve possuir pelo menos 6 caracteres.");
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        setCarregando(true);

        redefinirSenha(token, novaSenha)
            .then(() => {
                setSucesso("Senha redefinida com sucesso! Redirecionando para o login...");

                setNovaSenha("");
                setConfirmarSenha("");

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            })
            .catch((err) => {
         
                setErro(err.message);
            })
            .finally(() => {
                setCarregando(false);
            });
    }

    return (
        <div className="container-redefinir-senha">

            <h1>Redefinir Senha</h1>
            <h2>Escolha uma nova senha para sua conta</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group-redefinir-senha">
                    <label>Nova senha</label>

                    <div className="campo-senha-wrapper-redefinir">
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            placeholder="Digite sua nova senha"
                            value={novaSenha}
                            disabled={carregando || sucesso}
                            onChange={(e) => setNovaSenha(e.target.value)}
                        />

                       <button
                            type="button"
                            className="botao-mostrar-senha-redefinir"
                            onClick={() => setMostrarSenha(!mostrarSenha)}
                            tabIndex={-1}
                            >
                                 {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <div
                    className="forca-senha-redefinir"
                    style={{
                        color: corForcaSenha(novaSenha)
                    }}
                >
                    Força da senha: {novaSenha ? forcaSenha(novaSenha) : "---"}
                </div>

                <div className="form-group-redefinir-senha">
                    <label>Confirmar nova senha</label>

                    <input
                        type={mostrarSenha ? "text" : "password"}
                        placeholder="Confirme sua nova senha"
                        value={confirmarSenha}
                        disabled={carregando || sucesso}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                </div>

                {erro && (
                    <p className="erro-redefinir-senha">
                        {erro}
                    </p>
                )}

                {sucesso && (
                    <p className="sucesso-redefinir-senha">
                        {sucesso}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={carregando || sucesso}
                >
                    {carregando
                        ? "Salvando..."
                        : "Redefinir senha"}
                </button>

            </form>

        </div>
    );
}

export default RedefinirSenha;