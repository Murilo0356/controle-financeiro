import usuarioService from "./UsuarioService";
import transacaoService from "./transacaoService";
import authService from "./authService";

export function buscarUsuarioLogado() {
    const usuario = localStorage.getItem("usuarioLogado");
    return usuario ? JSON.parse(usuario) : null;
}

export function fazerLogout() {
    authService.fazerLogout();
}

export async function buscarDadosDashboard() {
    const usuarioLocal = buscarUsuarioLogado();

    if (!usuarioLocal || !usuarioLocal.id) {
        throw new Error("Usuário não autenticado.");
    }

    const [usuarioData, todasTransacoes] = await Promise.all([
        usuarioService.buscarPorId(usuarioLocal.id),
        transacaoService.listarTodos()
    ]);

    const transacoes = todasTransacoes || [];

    const totalReceitas = transacoes
        .filter((t) => t.tipo === "RECEITA" || t.tipo === "receita")
        .reduce((acc, t) => acc + Number(t.valor), 0);

    const totalDespesas = transacoes
        .filter((t) => t.tipo === "DESPESA" || t.tipo === "despesa")
        .reduce((acc, t) => acc + Number(t.valor), 0);

    const saldoAtual = totalReceitas - totalDespesas;

    const lancamentosRecentes = [...transacoes]
        .sort((a, b) => new Date(b.data) - new Date(a.data))
        .slice(0, 5);

    const graficoMap = {};
    transacoes.forEach((t) => {
        const dataObj = new Date(t.data);
        const mesChave = dataObj.toLocaleDateString("pt-BR", { month: "short" });

        if (!graficoMap[mesChave]) {
            graficoMap[mesChave] = { mes: mesChave, receitas: 0, despesas: 0 };
        }

        if (t.tipo === "RECEITA" || t.tipo === "receita") {
            graficoMap[mesChave].receitas += Number(t.valor);
        } else {
            graficoMap[mesChave].despesas += Number(t.valor);
        }
    });

    return {
        usuario: usuarioData || usuarioLocal,
        resumo: {
            saldoAtual,
            totalReceitas,
            totalDespesas
        },
        grafico: Object.values(graficoMap),
        lancamentos: lancamentosRecentes
    };
}