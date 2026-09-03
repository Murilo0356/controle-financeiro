import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import "./MudarSenha.css";
import { redefinirSenha } from "../../services/AuthService";

function MudarSenha() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token"); 
    const navigate = useNavigate();

    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const [carregando, setCarregando] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setErro("");

        if (!token) {
            setErro("Token de redefinição ausente ou inválido.");
            return;
        }

        if (!novaSenha) {
            setErro("Preencha a nova senha.");
            return;
        }

        if (novaSenha.length < 6) {
            setErro("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        setCarregando(true);

        redefinirSenha(token, novaSenha)
            .then(() => {
                setSucesso(true);
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            })
            .catch((err) => {
                setErro(
                    err.response?.data?.mensagem || 
                    "Falha ao redefinir a senha. O token pode ter expirado."
                );
            })
            .finally(() => {
                setCarregando(false);
            });
    }

    return (
        <div className="container-recuperar-senha">
            <h1>Redefinir Senha</h1>
            <h2>Digite e confirme a sua nova senha</h2>

            {sucesso ? (
                <div>
                    <p className="mensagem-neutra">
                        Senha alterada com sucesso! Você será redirecionado para a tela de login...
                    </p>
                    <p style={{ marginTop: "25px" }}>
                        <Link to="/login">Ir para o login agora</Link>
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group-recuperar-senha">
                        <label>Nova Senha</label>
                        <input
                            type="password"
                            placeholder="Digite sua nova senha"
                            value={novaSenha}
                            disabled={carregando}
                            onChange={(e) => setNovaSenha(e.target.value)}
                        />
                    </div>

                    <div className="form-group-recuperar-senha">
                        <label>Confirmar Nova Senha</label>
                        <input
                            type="password"
                            placeholder="Confirme a nova senha"
                            value={confirmarSenha}
                            disabled={carregando}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                        />
                    </div>

                    {erro && (
                        <p className="erro-recuperar-senha">
                            {erro}
                        </p>
                    )}

                    <button type="submit" disabled={carregando}>
                        {carregando ? "Salvando..." : "Redefinir Senha"}
                    </button>

                    <p>
                        Lembrou sua senha?{" "}
                        <Link to="/login">Fazer login</Link>
                    </p>
                </form>
            )}
        </div>
    );
}

export default MudarSenha;