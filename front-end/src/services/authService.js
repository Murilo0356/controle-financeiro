import BaseService from "./BaseService";

class AuthService extends BaseService {

  constructor() {
    super("/usuarios");
  }

  async login(email, senha) {
    const resposta = await this.post("/login", {
      email,
      senha
    });

    if (resposta) {
      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(resposta.usuario || resposta)
      );

      if (resposta.token) {
        localStorage.setItem("token", resposta.token);
      }
    }

    return resposta;
  }

  async solicitarRecuperacaoSenha(email) {
    const usuarios = await this.listarTodos();

    const usuarioExiste = usuarios.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!usuarioExiste) {
      throw new Error("E-mail não encontrado cadastrado no sistema.");
    }

    return {
      sucesso: true,
      mensagem: "Instruções enviadas para o e-mail."
    };
  }

  async alterarSenha(idUsuario, senhaAtual, novaSenha) {

    if (senhaAtual === novaSenha) {
      throw new Error(
        "A nova senha deve ser diferente da senha atual."
      );
    }

    const usuario = await this.buscarPorId(idUsuario);
    const usuarioAtualizado = await this.atualizar(idUsuario, {
      ...usuario,
      senhaCriptografada: novaSenha
    });

    localStorage.setItem(
      "usuarioLogado",
      JSON.stringify(usuarioAtualizado)
    );

    return usuarioAtualizado;
  }

  fazerLogout() {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("token");
  }
}

const authServiceInstance = new AuthService();

export const solicitarRecuperacaoSenha = (email) =>
  authServiceInstance.solicitarRecuperacaoSenha(email);

export const alterarSenha = (idUsuario, senhaAtual, novaSenha) =>
  authServiceInstance.alterarSenha(
    idUsuario,
    senhaAtual,
    novaSenha
  );

export const fazerLogout = () =>
  authServiceInstance.fazerLogout();

export default authServiceInstance;