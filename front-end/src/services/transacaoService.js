import { api } from './api';

const lancamentoService = {
  listarTodos: async () => {
    const resposta = await api.get('/transacoes'); 
    return resposta.data;
  },

  criar: async (dados) => {
    const resposta = await api.post('/transacoes', dados);
    return resposta.data;
  },

  atualizar: async (id, dados) => {
    const resposta = await api.put(`/transacoes/${id}`, dados);
    return resposta.data;
  },

  excluir: async (id) => {
    const resposta = await api.delete(`/transacoes/${id}`);
    return resposta.data;
  }
};

export default lancamentoService;