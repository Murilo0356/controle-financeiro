import BaseService from "./BaseService";
import { api } from "./api";
class AuthService extends BaseService {
  constructor() {
    super("/usuarios");
  }

  async login(email, senha) {
    try {
      const resposta = await this.post("/login", { email, senha });

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
    } catch (error) {
      throw this.tratarErro(error);
    }
  }

  async solicitarRecuperacaoSenha(email) {
    try {
      return await this.post("/esqueci-senha", { email });
    } catch (error) {
      throw this.tratarErro(error);
    }
  }

  async redefinirSenha(token, novaSenha) {
    try {
      return await this.post("/redefinir-senha", {
        token,
        novaSenha
      });
    } catch (error) {
      throw this.tratarErro(error);
    }
  }
async alterarSenha(idUsuario, senhaAtual, novaSenha) {
    if (senhaAtual === novaSenha) {
      throw new Error("A nova senha deve ser diferente da senha atual.");
    }

    try {
      const token = localStorage.getItem("token");

      const resposta = await api.put(
        `${this.endpoint}/${idUsuario}/alterar-senha`,
        {
          senhaAtual,
          novaSenha
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return resposta.data;
    } catch (error) {
      throw this.tratarErro(error);
    }
  }

  fazerLogout() {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("token");
  }

  tratarErro(error) {
    if (error.response) {
      const status = error.response.status;
      const mensagemApi = error.response.data?.mensagem || error.response.data?.message;

      if (mensagemApi) {
        return new Error(mensagemApi);
      }

      switch (status) {
        case 401:
          return new Error("E-mail ou senha incorretos.");
        case 400:
          return new Error("Dados inválidos. Verifique as informações fornecidas.");
        case 403:
          return new Error("Acesso negado.");
        case 404:
          return new Error("Recurso não encontrado no servidor.");
        case 500:
          return new Error("Erro interno no servidor. Tente novamente mais tarde.");
        default:
          return new Error("Ocorreu um erro ao processar a requisição.");
      }
    } else if (error.request) {
      return new Error("Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
    } else {
      return new Error(error.message || "Erro desconhecido ao processar requisição.");
    }
  }
}

const authServiceInstance = new AuthService();

export const solicitarRecuperacaoSenha = (email) =>
  authServiceInstance.solicitarRecuperacaoSenha(email);

export const redefinirSenha = (token, novaSenha) =>
  authServiceInstance.redefinirSenha(token, novaSenha);

export const alterarSenha = (idUsuario, senhaAtual, novaSenha) =>
  authServiceInstance.alterarSenha(
    idUsuario,
    senhaAtual,
    novaSenha
  );

export const fazerLogout = () =>
  authServiceInstance.fazerLogout();

export default authServiceInstance;