import BaseService from "./BaseService";

class UsuarioService extends BaseService {
  constructor() {
    super('/usuarios');
  }

 
  async login(email, senha) {
    const usuario = await this.post('/login', { email, senha });

    if (usuario) {
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    }

    return usuario;
  }

  
  async cadastrarUsuario(nome, email, senha) {
    const novoUsuario = {
      nome: nome,
      email: email,
      senhaCriptografada: senha
    };

    return await this.post('', novoUsuario);
  }
}

export default new UsuarioService();