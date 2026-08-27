import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaChartColumn,
    FaBars,
    FaXmark,
    FaPlus,
    FaTrash,
    FaTag
} from "react-icons/fa6";

import Sidebar from "../componentes/Sidebar";
import "./Categoria.css";

import { buscarUsuarioLogado } from "../../services/dashboardService";
import categoriaService from "../../services/categoriaService";

function Categorias() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [menuAberto, setMenuAberto] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);

    const [filtroTipo, setFiltroTipo] = useState("TODOS");
    const [busca, setBusca] = useState("");

    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("DESPESA");
    const [cor, setCor] = useState("#2563eb");
    const [icone, setIcone] = useState("tag");
    const [erroModal, setErroModal] = useState("");

    useEffect(() => {
        const usuarioLogado = buscarUsuarioLogado();

        if (!usuarioLogado) {
            navigate("/login", { replace: true });
            return;
        }

        setUsuario(usuarioLogado);
        carregarCategorias();
    }, [navigate]);

    async function carregarCategorias() {
        setCarregando(true);
        try {
            const lista = await categoriaService.listarTodos();
            setCategorias(lista || []);
        } catch (erro) {
            console.error("Erro ao carregar categorias:", erro);
        } finally {
            setCarregando(false);
        }
    }

    async function handleSalvarCategoria(e) {
        e.preventDefault();
        setErroModal("");

        if (!nome.trim()) {
            setErroModal("Informe o nome da categoria.");
            return;
        }

        try {
            await categoriaService.cadastrar({
                nome: nome.trim(),
                tipo,
                cor,
                icone
            });

            setNome("");
            setTipo("DESPESA");
            setCor("#2563eb");
            setIcone("tag");
            setModalAberto(false);

            await carregarCategorias();
        } catch (err) {
            setErroModal(err.message || "Erro ao salvar categoria.");
        }
    }

    async function handleExcluir(id) {
        if (window.confirm("Deseja realmente excluir esta categoria?")) {
            try {
                await categoriaService.excluir(id);
                setCategorias((prev) => prev.filter((cat) => cat.id !== id));
            } catch (err) {
                alert(err.message || "Não foi possível excluir a categoria.");
            }
        }
    }

    const categoriasFiltradas = categorias.filter((cat) => {
        const atendeTipo = filtroTipo === "TODOS" || cat.tipo === filtroTipo;
        const atendeBusca = cat.nome.toLowerCase().includes(busca.toLowerCase());
        return atendeTipo && atendeBusca;
    });

    if (carregando) {
        return (
            <div className="categoria-tela-carregando">
                <div className="categoria-spinner"></div>
                <p>Carregando categorias...</p>
            </div>
        );
    }

    return (
        <div className="categoria-layout">
            <div className="categoria-topbar-mobile">
                <div className="categoria-logo">
                    <FaChartColumn />
                    <span>FinDesk</span>
                </div>
                <button
                    className="categoria-botao-hamburguer"
                    onClick={() => setMenuAberto(!menuAberto)}
                >
                    {menuAberto ? <FaXmark /> : <FaBars />}
                </button>
            </div>

            {menuAberto && (
                <div
                    className="categoria-overlay-mobile"
                    onClick={() => setMenuAberto(false)}
                />
            )}

            <Sidebar
                menuAberto={menuAberto}
                setMenuAberto={setMenuAberto}
                usuario={usuario}
                paginaAtiva="categorias"
            />

            <main className="categoria-conteudo">
                <header className="categoria-cabecalho">
                    <div>
                        <h1>Categorias</h1>
                        <p>Organize suas receitas e despesas por tipos customizados.</p>
                    </div>
                </header>

                <div className="categoria-acoes-bar">
                    <div className="categoria-filtros">
                        <input
                            type="text"
                            className="categoria-input-busca"
                            placeholder="Buscar categoria..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />

                        <select
                            className="categoria-select-filtro"
                            value={filtroTipo}
                            onChange={(e) => setFiltroTipo(e.target.value)}
                        >
                            <option value="TODOS">Todos os Tipos</option>
                            <option value="RECEITA">Receita</option>
                            <option value="DESPESA">Despesa</option>
                        </select>
                    </div>

                    <button
                        className="categoria-btn-nova"
                        onClick={() => setModalAberto(true)}
                    >
                        <FaPlus /> Nova Categoria
                    </button>
                </div>

                <section className="categoria-grid-container">
                    {categoriasFiltradas.length === 0 ? (
                        <div className="categoria-vazia">
                            <p>Nenhuma categoria encontrada.</p>
                        </div>
                    ) : (
                        <div className="categoria-cards-grid">
                            {categoriasFiltradas.map((cat) => {
                                const isReceita = cat.tipo === "RECEITA";
                                return (
                                    <div key={cat.id} className="categoria-card">
                                        <div className="categoria-card-header">
                                            <div
                                                className="categoria-card-badge-cor"
                                                style={{ backgroundColor: cat.cor || "#2563eb" }}
                                            >
                                                <FaTag />
                                            </div>
                                            <button
                                                className="categoria-btn-deletar"
                                                onClick={() => handleExcluir(cat.id)}
                                                title="Excluir Categoria"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>

                                        <div className="categoria-card-info">
                                            <h3>{cat.nome}</h3>
                                            <span
                                                className={
                                                    isReceita
                                                        ? "categoria-badge categoria-badge-receita"
                                                        : "categoria-badge categoria-badge-despesa"
                                                }
                                            >
                                                {cat.tipo}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>

            {modalAberto && (
                <div className="categoria-modal-overlay">
                    <div className="categoria-modal-card">
                        <div className="categoria-modal-header">
                            <h2>Nova Categoria</h2>
                            <button
                                className="categoria-modal-fechar"
                                onClick={() => setModalAberto(false)}
                            >
                                <FaXmark />
                            </button>
                        </div>

                        <form onSubmit={handleSalvarCategoria} className="categoria-form-modal">
                            <div className="categoria-form-group">
                                <label>Nome da Categoria</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Alimentação, Transporte, Lazer..."
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="categoria-form-group">
                                <label>Tipo</label>
                                <select
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                >
                                    <option value="DESPESA">Despesa</option>
                                    <option value="RECEITA">Receita</option>
                                </select>
                            </div>

                            <div className="categoria-form-group">
                                <label>Cor de Identificação</label>
                                <div className="categoria-color-picker-wrapper">
                                    <input
                                        type="color"
                                        className="categoria-input-cor"
                                        value={cor}
                                        onChange={(e) => setCor(e.target.value)}
                                    />
                                    <span>{cor}</span>
                                </div>
                            </div>

                            {erroModal && (
                                <p className="categoria-erro-modal">
                                    {erroModal}
                                </p>
                            )}

                            <div className="categoria-modal-acoes">
                                <button
                                    type="button"
                                    className="categoria-btn-cancelar"
                                    onClick={() => setModalAberto(false)}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className="categoria-btn-salvar">
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

export default Categorias;