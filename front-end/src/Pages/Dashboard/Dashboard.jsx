import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

import {
    FaChartColumn,
    FaMoneyBillTrendUp,
    FaTags,
    FaArrowRightFromBracket,
    FaCircleUser,
    FaHouse,
    FaWallet,
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaBars,
    FaXmark
} from "react-icons/fa6";
import "./Dashboard.css";

import {
    buscarDadosDashboard,
    fazerLogout
} from "../../services/dashboardService";

const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

const formatadorData = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit"
});

function Dashboard() {
    const navigate = useNavigate();

    const [dados, setDados] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [menuAberto, setMenuAberto] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        buscarDadosDashboard()
            .then((resultado) => {
                setDados(resultado);
            })
            .catch((erro) => {
                console.error("Erro ao carregar dados do dashboard:", erro);
                navigate("/login", { replace: true });
            })
            .finally(() => {
                setCarregando(false);
            });
    }, [navigate]);

    function handleLogout() {
        fazerLogout();
        navigate("/login", { replace: true });
    }

    if (carregando) {
        return (
            <div className="dash-tela-carregando">
                <div className="dash-spinner"></div>
                <p>Carregando seu painel financeiro...</p>
            </div>
        );
    }

    const { usuario, resumo, grafico, lancamentos } = dados;

    const mesAtual = new Date().toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric"
    });

    return (
        <div className="dash-layout">
            {/* Topbar visível apenas em telas menores */}
            <div className="dash-topbar-mobile">
                <div className="dash-logo">
                    <FaChartColumn />
                    <span>FinDesk</span>
                </div>
                <button
                    className="dash-botao-hamburguer"
                    onClick={() => setMenuAberto(!menuAberto)}
                    aria-label="Abrir menu de navegação"
                >
                    {menuAberto ? <FaXmark /> : <FaBars />}
                </button>
            </div>

            {/* Fundo escuro ao abrir o menu mobile */}
            {menuAberto && (
                <div
                    className="dash-overlay-mobile"
                    onClick={() => setMenuAberto(false)}
                />
            )}

            {/* Sidebar (fixa no Desktop, Gaveta/Drawer no Mobile) */}
            <aside className={`dash-sidebar ${menuAberto ? "aberto" : ""}`}>
                <div className="dash-logo dash-logo-sidebar">
                    <FaChartColumn />
                    <span>FinDesk</span>
                </div>

                <nav className="dash-nav">
                    <button
                        className="dash-nav-item dash-nav-item-ativo"
                        onClick={() => setMenuAberto(false)}
                    >
                        <FaHouse />
                        <span>Dashboard</span>
                    </button>

                    <button className="dash-nav-item" disabled>
                        <FaMoneyBillTrendUp />
                        <span>Transações</span>
                        <span className="dash-badge-em-breve">Em breve</span>
                    </button>

                    <button className="dash-nav-item" disabled>
                        <FaTags />
                        <span>Categorias</span>
                        <span className="dash-badge-em-breve">Em breve</span>
                    </button>
                </nav>

                <div className="dash-usuario">
                    <div className="dash-avatar">
                        <FaCircleUser />
                    </div>
                    <div className="dash-usuario-info">
                        <span className="dash-usuario-nome">{usuario.nome}</span>
                        <span className="dash-usuario-email">{usuario.email}</span>
                    </div>
                </div>

                <button className="dash-botao-sair" onClick={handleLogout}>
                    <FaArrowRightFromBracket />
                    <span>Sair</span>
                </button>
            </aside>

            <main className="dash-conteudo">
                <header className="dash-cabecalho">
                    <div>
                        <h1>Olá, {usuario.nome.split(" ")[0]}</h1>
                        <p>Aqui está o resumo financeiro referente a {mesAtual}.</p>
                    </div>
                </header>

                <section className="dash-cards-resumo">
                    <div className="dash-card dash-card-saldo">
                        <div className="dash-card-topo">
                            <div className="dash-card-icon dash-icon-saldo">
                                <FaWallet />
                            </div>
                            <span className="dash-card-rotulo">Saldo Atual</span>
                        </div>
                        <span className="dash-card-valor">
                            {formatadorMoeda.format(resumo.saldoAtual)}
                        </span>
                    </div>

                    <div className="dash-card dash-card-receita">
                        <div className="dash-card-topo">
                            <div className="dash-card-icon dash-icon-receita">
                                <FaArrowTrendUp />
                            </div>
                            <span className="dash-card-rotulo">Receitas</span>
                        </div>
                        <span className="dash-card-valor">
                            {formatadorMoeda.format(resumo.totalReceitas)}
                        </span>
                    </div>

                    <div className="dash-card dash-card-despesa">
                        <div className="dash-card-topo">
                            <div className="dash-card-icon dash-icon-despesa">
                                <FaArrowTrendDown />
                            </div>
                            <span className="dash-card-rotulo">Despesas</span>
                        </div>
                        <span className="dash-card-valor">
                            {formatadorMoeda.format(resumo.totalDespesas)}
                        </span>
                    </div>
                </section>

                <section className="dash-inferior">
                    <div className="dash-grafico-container">
                        <h2>Evolução Financeira</h2>
                        <ResponsiveContainer width="100%" height={330}>
                            <BarChart data={grafico} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#edf1f7" />
                                <XAxis dataKey="mes" stroke="#64748b" />
                                <YAxis stroke="#64748b" tickFormatter={(valor) => `R$${valor / 1000}k`} />
                                <Tooltip formatter={(valor) => formatadorMoeda.format(valor)} />
                                <Legend />
                                <Bar dataKey="receitas" name="Receitas" fill="#22c55e" radius={[8, 8, 0, 0]} />
                                <Bar dataKey="despesas" name="Despesas" fill="#ef4444" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="dash-lancamentos-container">
                        <h2>Últimos Lançamentos</h2>
                        <ul className="dash-lista-lancamentos">
                            {lancamentos.map((lancamento) => (
                                <li key={lancamento.id} className="dash-lancamento-item">
                                    <div className={lancamento.tipo === "receita" ? "dash-lancamento-icone dash-icone-receita" : "dash-lancamento-icone dash-icone-despesa"}>
                                        {lancamento.tipo === "receita" ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
                                    </div>
                                    <div className="dash-lancamento-info">
                                        <span className="dash-lancamento-descricao">{lancamento.descricao}</span>
                                        <span className="dash-lancamento-data">
                                            {formatadorData.format(new Date(lancamento.data))}
                                        </span>
                                    </div>
                                    <span className={lancamento.tipo === "receita" ? "dash-lancamento-valor dash-valor-receita" : "dash-lancamento-valor dash-valor-despesa"}>
                                        {lancamento.tipo === "receita" ? "+" : "-"} {formatadorMoeda.format(lancamento.valor)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;