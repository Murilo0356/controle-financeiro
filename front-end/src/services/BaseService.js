import { api } from './api';

class BaseService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  listarTodos() {
    return api.get(this.endpoint).then(res => res.data);
  }

  buscarPorId(id) {
    return api.get(`${this.endpoint}/${id}`).then(res => res.data);
  }

  cadastrar(dados) {
    return api.post(this.endpoint, dados).then(res => res.data);
  }

  post(rota, dados) {
    return api.post(`${this.endpoint}${rota}`, dados).then(res => res.data);
  }

  atualizar(id, dados) {
    return api.put(`${this.endpoint}/${id}`, dados).then(res => res.data);
  }

  excluir(id) {
    return api.delete(`${this.endpoint}/${id}`).then(res => res.data);
  }
}

export default BaseService;