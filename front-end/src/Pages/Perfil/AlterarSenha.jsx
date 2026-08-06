import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaChartColumn, FaBars, FaXmark } from "react-icons/fa6";

import SideBar from "../Componentes/SideBar";
import { forcaSenha, corForcaSenha } from "../../utils/ValidarSenha";
import { buscarUsuarioLogado, fazerLogout } from "../../services/dashboardService";
import { alterarSenha } from "../../services/authService";

import "./AlterarSenha.css";

function AlterarSenha() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [menuAberto, setMenuAberto] = useState(false);

    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
    const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

    const [erro, setErro] = useState("");
    const [erroSenhaAtual, setErroSenhaAtual] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    const token = localStorage.getItem("token");

    if (!usuarioSalvo && !token) {
        navigate("/login", { replace: true });
        return;
    }

    setUsuario(buscarUsuarioLogado());
}, [navigate]);
    function handleLogout() {
        fazerLogout();
        navigate("/login", { replace: true });
    }

    function handleSubmit(e) {
        e.preventDefault();

        setErro("");
        setErroSenhaAtual("");
        setSucesso("");

        if (!senhaAtual || !novaSenha || !confirmarSenha) {
            setErro("Preencha todos os campos.");
            return;
        }

        if (novaSenha.length < 6) {
            setErro("A nova senha deve possuir pelo menos 6 caracteres.");
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setErro("A confirmação não coincide com a nova senha.");
            return;
        }

        setCarregando(true);

        alterarSenha(usuario?.id, senhaAtual, novaSenha)
            .then(() => {
                setSucesso("Senha alterada com sucesso!");
                setSenhaAtual("");
                setNovaSenha("");
                setConfirmarSenha("");
            })
            .catch((err) => {
                if (err.message?.toLowerCase().includes("atual")) {
                    setErroSenhaAtual(err.message);
                } else {
                    setErro(err.message || "Erro ao alterar a senha.");
                }
            })
            .finally(() => {
                setCarregando(false);
            });
    }

    if (!usuario) {
        return (
            <div className="alt-tela-carregando">
                <div className="alt-spinner" />
                <p>Verificando sessão...</p>
            </div>
        );
    }

    return (
        <div className="alt-layout">
            <div className="alt-topbar-mobile">
                <div className="alt-logo">
                    <FaChartColumn />
                    <span>FinDesk</span>
                </div>
                <button
                    className="alt-botao-hamburguer"
                    onClick={() => setMenuAberto(!menuAberto)}
                    aria-label="Abrir menu de navegação"
                >
                    {menuAberto ? <FaXmark /> : <FaBars />}
                </button>
            </div>

            {menuAberto && (
                <div
                    className="alt-overlay-mobile"
                    onClick={() => setMenuAberto(false)}
                />
            )}

            <SideBar
                menuAberto={menuAberto}
                setMenuAberto={setMenuAberto}
                usuario={usuario}
                paginaAtiva="senha"
                onLogout={handleLogout}
            />

            <main className="alt-conteudo">
                <header className="alt-cabecalho">
                    <h1>Alterar senha</h1>
                    <p>Atualize a senha de acesso da sua conta</p>
                </header>

                <div className="alt-card">
                    <form onSubmit={handleSubmit}>
                        <div className="alt-form-group">
                            <label htmlFor="senhaAtual">Senha atual</label>
                            <div className="alt-campo-senha-wrapper">
                                <input
                                    id="senhaAtual"
                                    type={mostrarSenhaAtual ? "text" : "password"}
                                    placeholder="Digite sua senha atual"
                                    value={senhaAtual}
                                    disabled={carregando}
                                    onChange={(e) => setSenhaAtual(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="alt-botao-olho"
                                    onClick={() => setMostrarSenhaAtual(!mostrarSenhaAtual)}
                                    tabIndex={-1}
                                    aria-label="Alternar visibilidade da senha"
                                >
                                    {mostrarSenhaAtual ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>
                            {erroSenhaAtual && (
                                <p className="alt-erro-campo">{erroSenhaAtual}</p>
                            )}
                        </div>

                        <div className="alt-form-group">
                            <label htmlFor="novaSenha">Nova senha</label>
                            <div className="alt-campo-senha-wrapper">
                                <input
                                    id="novaSenha"
                                    type={mostrarNovaSenha ? "text" : "password"}
                                    placeholder="Digite a nova senha"
                                    value={novaSenha}
                                    disabled={carregando}
                                    onChange={(e) => setNovaSenha(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="alt-botao-olho"
                                    onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                                    tabIndex={-1}
                                    aria-label="Alternar visibilidade da senha"
                                >
                                    {mostrarNovaSenha ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div
                            className="alt-forca-senha"
                            style={{ color: corForcaSenha(novaSenha) }}
                        >
                            Força da senha: {novaSenha ? forcaSenha(novaSenha) : "---"}
                        </div>

                        <div className="alt-form-group">
                            <label htmlFor="confirmarSenha">Confirmar nova senha</label>
                            <div className="alt-campo-senha-wrapper">
                                <input
                                    id="confirmarSenha"
                                    type={mostrarConfirmarSenha ? "text" : "password"}
                                    placeholder="Confirme a nova senha"
                                    value={confirmarSenha}
                                    disabled={carregando}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="alt-botao-olho"
                                    onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                                    tabIndex={-1}
                                    aria-label="Alternar visibilidade da senha"
                                >
                                    {mostrarConfirmarSenha ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>
                        </div>

                        {erro && <p className="alt-erro-geral">{erro}</p>}
                        {sucesso && <p className="alt-sucesso">{sucesso}</p>}

                        <button type="submit" disabled={carregando}>
                            {carregando ? "Salvando..." : "Alterar senha"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default AlterarSenha;