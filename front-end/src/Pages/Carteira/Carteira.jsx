import React, { useState, useEffect } from 'react';
import carteiraService from "../../services/carteiraService";
import Sidebar from "../Componentes/Sidebar"; // Import da Sidebar igual ao das outras páginas
import './Carteira.css';

const Carteira = () => {
  const [carteiras, setCarteiras] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState('');
  const [saldo, setSaldo] = useState('');
  const [carregando, setCarregando] = useState(false);

  const carregarCarteiras = async () => {
    try {
      setCarregando(true);
      const dados = await carteiraService.listarTodos();
      setCarteiras(dados || []);
    } catch (erro) {
      console.error('Erro ao carregar carteiras:', erro);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarCarteiras();
  }, []);

  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!nome.trim() || saldo === '') return;

    try {
      await carteiraService.cadastrar({
        nome: nome.trim(),
        saldo: parseFloat(saldo)
      });
      setNome('');
      setSaldo('');
      setModalAberto(false);
      carregarCarteiras();
    } catch (erro) {
      console.error('Erro ao salvar carteira:', erro);
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm('Deseja realmente excluir esta carteira?')) {
      try {
        await carteiraService.excluir(id);
        carregarCarteiras();
      } catch (erro) {
        console.error('Erro ao excluir carteira:', erro);
      }
    }
  };

  const carteirasFiltradas = carteiras.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <Sidebar />
      <div className="carteira-page" style={{ flex: 1 }}>
        <div className="carteira-header">
          <h1>Carteira</h1>
          <p>Gerencie suas contas e saldos disponíveis.</p>
        </div>

        <div className="carteira-top-bar">
          <div className="carteira-filters">
            <input
              type="text"
              placeholder="Buscar carteira..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="carteira-search-input"
            />
          </div>
          <button
            className="carteira-btn-nova"
            onClick={() => setModalAberto(true)}
          >
            + Nova Carteira
          </button>
        </div>

        {carregando ? (
          <p className="carteira-feedback">Carregando carteiras...</p>
        ) : carteirasFiltradas.length === 0 ? (
          <p className="carteira-feedback">Nenhuma carteira encontrada.</p>
        ) : (
          <div className="carteira-grid">
            {carteirasFiltradas.map((c) => (
              <div key={c.id} className="carteira-card">
                <div className="carteira-card-header">
                  <div className="carteira-icon-box">
                    <span className="carteira-icon">💳</span>
                  </div>
                  <button
                    className="carteira-btn-delete"
                    onClick={() => handleExcluir(c.id)}
                    title="Excluir"
                  >
                    🗑️
                  </button>
                </div>
                <div className="carteira-card-body">
                  <h3>{c.nome}</h3>
                  <span className="carteira-saldo-badge">
                    R$ {Number(c.saldo || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {modalAberto && (
          <div className="carteira-modal-overlay">
            <div className="carteira-modal">
              <h2>Nova Carteira</h2>
              <form onSubmit={handleSalvar}>
                <div className="carteira-form-group">
                  <label>Nome da Carteira</label>
                  <input
                    type="text"
                    placeholder="Ex: Conta Corrente, Dinheiro"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                <div className="carteira-form-group">
                  <label>Saldo Inicial (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={saldo}
                    onChange={(e) => setSaldo(e.target.value)}
                    required
                  />
                </div>

                <div className="carteira-modal-actions">
                  <button
                    type="button"
                    className="carteira-btn-cancelar"
                    onClick={() => setModalAberto(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="carteira-btn-salvar">
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carteira;