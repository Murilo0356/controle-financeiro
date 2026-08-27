import { useNavigate } from "react-router-dom";
import { FaUser, FaHouse, FaMoneyBillTransfer,FaWallet, FaTags, FaRightFromBracket, FaChartColumn, FaBars, FaXmark } from "react-icons/fa6";
import "./SideBar.css";

function Sidebar({ menuAberto, setMenuAberto, usuario, paginaAtiva, onLogout }) {
    const navigate = useNavigate();

    function irPara(caminho) {
        if (setMenuAberto) setMenuAberto(false);
        navigate(caminho);
    }

    function iniciaisDoNome(nome) {
        if (!nome) return "U";
        return nome
            .trim()
            .split(" ")
            .slice(0, 2)
            .map((parte) => parte[0])
            .join("")
            .toUpperCase();
    }

    function classeItem(pagina) {
        return `sb-nav-item ${paginaAtiva === pagina ? "sb-nav-item-ativo" : ""}`;
    }

    return (
        <>
            <div className="sb-topbar-mobile">
                <div className="sb-logo-mobile">
                    <FaChartColumn />
                    <span>FinDesk</span>
                </div>
                <button
                    className="sb-hamburguer"
                    onClick={() => setMenuAberto(!menuAberto)}
                    aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
                >
                    {menuAberto ? <FaXmark /> : <FaBars />}
                </button>
            </div>

            <aside className={`sb-sidebar ${menuAberto ? "sb-aberto" : ""}`}>
                <div className="sb-logo">
                    <FaChartColumn />
                    <span>FinDesk</span>
                </div>

                <nav className="sb-nav">
                    <button
                        className={classeItem("dashboard")}
                        onClick={() => irPara("/dashboard")}
                    >
                        <FaHouse />
                        <span>Dashboard</span>
                    </button>

                    <button
                        className={classeItem("lancamento")}
                        onClick={() => irPara("/lancamento")}
                    >
                        <FaMoneyBillTransfer />
                        <span>Transações</span>
                    </button>

                    <button
                        className={classeItem("categoria")}
                        onClick={() => irPara("/categoria")}>
                        <FaTags />
                        <span>Categorias</span>
                    </button>

                     <button
                        className={classeItem("carteira")}
                        onClick={() => irPara("/carteira")}>
                        <FaWallet />
                        <span>Carteira</span>
                    </button>

                    <button
                        className={classeItem("senha") || classeItem("perfil")}
                        onClick={() => irPara("/perfil")}
                    >
                        <FaUser />
                        <span>Meu Perfil</span>
                    </button>
                </nav>

                {usuario && (
                    <div className="sb-usuario">
                        <div className="sb-avatar">
                            {iniciaisDoNome(usuario.nome)}
                        </div>
                        <div className="sb-usuario-info">
                            <span className="sb-usuario-nome">{usuario.nome}</span>
                            <span className="sb-usuario-email">{usuario.email}</span>
                        </div>
                    </div>
                )}

                <button className="sb-botao-sair" onClick={onLogout}>
                    <FaRightFromBracket />
                    <span>Sair</span>
                </button>
            </aside>

            {menuAberto && (
                <div
                    className="sb-overlay"
                    onClick={() => setMenuAberto(false)}
                />
            )}
        </>
    );
}

export default Sidebar;