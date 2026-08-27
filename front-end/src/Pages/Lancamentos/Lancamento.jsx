import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaChartColumn,
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaBars,
    FaXmark,
    FaPlus,
    FaTrash
} from "react-icons/fa6";

import Sidebar from "../componentes/Sidebar";
import "./Lancamento.css";

import { buscarUsuarioLogado } from "../../services/dashboardService";
import lancamentoService from "../../services/transacaoService";
import categoriaService from "../../services/categoriaService";

const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

const formatadorData = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
});

function Lancamentos() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [lancamentos, setLancamentos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [menuAberto, setMenuAberto] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);

    const [filtroTipo, setFiltroTipo] = useState("TODOS");
    const [busca, setBusca] = useState("");

    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState("DESPESA");
    const [categoriaId, setCategoriaId] = useState("");
    const [data, setData] = useState(new Date().toISOString().split("T")[0]);
    const [erroModal, setErroModal] = useState("");

    useEffect(() => {
        const usuarioLogado = buscarUsuarioLogado();

        if (!usuarioLogado) {
            navigate("/login", { replace: true });
            return;
        }

        setUsuario(usuarioLogado);
        carregarDados();
    }, [navigate]);

    const carregarDados = async () => {
        try {
            setCarregando(true);

            // 1. Busca Lançamentos
            let resLancamentos = await lancamentoService.listarTodos();
            
            // Tratamento caso a resposta do Axios venha envelopada em .data
            if (resLancamentos && resLancamentos.data && Array.isArray(resLancamentos.data)) {
                resLancamentos = resLancamentos.data;
            }

            // 2. Busca Categorias (Tratamento de erro isolado para não travar a tela)
            let resCategorias = [];
            try {
                if (categoriaService && typeof categoriaService.listarTodas === "function") {
                    resCategorias = await categoriaService.listarTodas();
                } else if (categoriaService && typeof categoriaService.listarTodos === "function") {
                    resCategorias = await categoriaService.listarTodos();
                }
                
                if (resCategorias && resCategorias.data && Array.isArray(resCategorias.data)) {
                    resCategorias = resCategorias.data;
                }
            } catch (errCat) {
                console.warn("Aviso: Categorias não puderam ser carregadas ou banco não possui registros.", errCat);
            }

            console.log("Lançamentos processados:", resLancamentos);

            setLancamentos(Array.isArray(resLancamentos) ? resLancamentos : []);
            setCategorias(Array.isArray(resCategorias) ? resCategorias : []);
        } catch (erro) {
            console.error("Erro grave ao carregar dados:", erro);
            setLancamentos([]);
        } finally {
            setCarregando(false);
        }
    };

    async function handleSalvarLancamento(e) {
        e.preventDefault();
        setErroModal("");

        if (!descricao || !valor || !data) {
            setErroModal("Preencha os campos obrigatórios.");
            return;
        }

        try {
            await lancamentoService.criar({
                descricao,
                valor: parseFloat(valor),
                tipo,
                data,
                categoryId: categoriaId ? Number(categoriaId) : null
            });

            setDescricao("");
            setValor("");
            setTipo("DESPESA");
            setCategoriaId("");
            setModalAberto(false);

            // Recarrega lista após salvar
            await carregarDados();
        } catch (err) {
            setErroModal(err.message || "Erro ao salvar lançamento.");
        }
    }

    async function handleExcluir(id) {
        if (window.confirm("Deseja realmente excluir este lançamento?")) {
            try {
                await lancamentoService.excluir(id);
                setLancamentos((prev) => prev.filter((item) => item.id !== id));
            } catch (err) {
                alert("Erro ao excluir lançamento.");
            }
        }
    }

    // Filtro tolerante a nulos e variações de maiúsculas/minúsculas
    const lancamentosFiltrados = lancamentos.filter((item) => {
        if (!item) return false;

        const tipoItem = String(item.tipo || item.type || "").toUpperCase();
        const atendeTipo = filtroTipo === "TODOS" || tipoItem === filtroTipo;

        const textoDescricao = String(item.descricao || item.descricao || item.description || "");
        const atendeBusca = textoDescricao.toLowerCase().includes(busca.toLowerCase());

        return atendeTipo && atendeBusca;
    });

    if (carregando) {
        return (
            <div className="dash-tela-carregando">
                <div className="dash-spinner"></div>
                <p>Carregando lançamentos...</p>
            </div>
        );
    }

    return (
        <div className="dash-layout">
            <div className="dash-topbar-mobile">
                <div className="dash-logo">
                    <FaChartColumn />
                    <span>FinDesk</span>
                </div>
                <button
                    className="dash-botao-hamburguer"
                    onClick={() => setMenuAberto(!menuAberto)}
                >
                    {menuAberto ? <FaXmark /> : <FaBars />}
                </button>
            </div>

            {menuAberto && (
                <div
                    className="dash-overlay-mobile"
                    onClick={() => setMenuAberto(false)}
                />
            )}

            <Sidebar
                menuAberto={menuAberto}
                setMenuAberto={setMenuAberto}
                usuario={usuario}
                paginaAtiva="lancamentos"
            />

            <main className="dash-conteudo">
                <header className="dash-cabecalho">
                    <div>
                        <h1>Lançamentos</h1>
                        <p>Gerencie todas as suas entradas e saídas de forma simples.</p>
                    </div>
                </header>

                <div className="lancamentos-acoes-bar">
                    <div className="lancamentos-filtros">
                        <input
                            type="text"
                            className="input-busca"
                            placeholder="Buscar por descrição..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />

                        <select
                            className="select-filtro"
                            value={filtroTipo}
                            onChange={(e) => setFiltroTipo(e.target.value)}
                        >
                            <option value="TODOS">Todos os Tipos</option>
                            <option value="RECEITA">Receitas</option>
                            <option value="DESPESA">Despesas</option>
                        </select>
                    </div>

                    <button
                        className="btn-novo-lancamento"
                        onClick={() => setModalAberto(true)}
                    >
                        <FaPlus /> Novo Lançamento
                    </button>
                </div>

                <section className="dash-lancamentos-container">
                    <h2>Histórico de Transações</h2>
                    <ul className="dash-lista-lancamentos">
                        {lancamentosFiltrados.length === 0 ? (
                            <p style={{ color: "#64748b", marginTop: "10px" }}>
                                Nenhum lançamento encontrado.
                            </p>
                        ) : (
                            lancamentosFiltrados.map((item) => {
                                const tipoFormatado = String(item.tipo || item.type || "").toUpperCase();
                                const isReceita = tipoFormatado === "RECEITA";

                                const textDescricao = item.descricao || item.description || "Sem descrição";
                                const numValor = item.valor ?? item.amount ?? 0;
                                const rawData = item.data || item.date || new Date();

                                return (
                                    <li key={item.id} className="dash-lancamento-item">
                                        <div className={isReceita ? "dash-lancamento-icone dash-icone-receita" : "dash-lancamento-icone dash-icone-despesa"}>
                                            {isReceita ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
                                        </div>

                                        <div className="dash-lancamento-info">
                                            <span className="dash-lancamento-descricao">{textDescricao}</span>
                                            <span className="dash-lancamento-data">
                                                {formatadorData.format(new Date(rawData))}
                                            </span>
                                        </div>

                                        <span className={isReceita ? "dash-lancamento-valor dash-valor-receita" : "dash-lancamento-valor dash-valor-despesa"}>
                                            {isReceita ? "+" : "-"} {formatadorMoeda.format(numValor)}
                                        </span>

                                        <button
                                            className="btn-deletar-item"
                                            onClick={() => handleExcluir(item.id)}
                                            title="Excluir Lançamento"
                                        >
                                            <FaTrash />
                                        </button>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </section>
            </main>

            {modalAberto && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <div className="modal-header">
                            <h2>Novo Lançamento</h2>
                            <button
                                className="modal-fechar"
                                onClick={() => setModalAberto(false)}
                            >
                                <FaXmark />
                            </button>
                        </div>

                        <form onSubmit={handleSalvarLancamento} className="form-modal">
                            <div className="form-group-modal">
                                <label>Descrição</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Aluguel, Salário, Mercado..."
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group-modal">
                                <label>Valor (R$)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="0,00"
                                    value={valor}
                                    onChange={(e) => setValor(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group-modal">
                                <label>Tipo</label>
                                <select
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                >
                                    <option value="DESPESA">Despesa</option>
                                    <option value="RECEITA">Receita</option>
                                </select>
                            </div>

                            <div className="form-group-modal">
                                <label>Categoria</label>
                                <select
                                    value={categoriaId}
                                    onChange={(e) => setCategoriaId(e.target.value)}
                                >
                                    <option value="">Selecione uma categoria...</option>
                                    {categorias
                                        .filter((c) => String(c.tipo || c.type || "").toUpperCase() === tipo)
                                        .map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.nome || cat.name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div className="form-group-modal">
                                <label>Data</label>
                                <input
                                    type="date"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    required
                                />
                            </div>

                            {erroModal && (
                                <p style={{ color: "#dc2626", fontSize: "0.85rem" }}>
                                    {erroModal}
                                </p>
                            )}

                            <div className="modal-acoes">
                                <button
                                    type="button"
                                    className="btn-cancelar"
                                    onClick={() => setModalAberto(false)}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-salvar">
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Lancamentos;