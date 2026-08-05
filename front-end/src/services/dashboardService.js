const RESUMO_MOCK = {
    saldoAtual: 4230.87,
    totalReceitas: 7800.0,
    totalDespesas: 3569.13
};

const GRAFICO_MOCK = [
    { mes: "Mar", receitas: 6200, despesas: 3100 },
    { mes: "Abr", receitas: 7150, despesas: 3820 },
    { mes: "Mai", receitas: 6890, despesas: 4210 },
    { mes: "Jun", receitas: 7480, despesas: 3640 },
    { mes: "Jul", receitas: 7800, despesas: 3569 }
];

const LANCAMENTOS_MOCK = [
    { id: 1, descricao: "Salário", valor: 5200, tipo: "receita", data: "2026-07-05" },
    { id: 2, descricao: "Freelance - Landing page", valor: 1300, tipo: "receita", data: "2026-07-12" },
    { id: 3, descricao: "Aluguel", valor: 1450, tipo: "despesa", data: "2026-07-05" },
    { id: 4, descricao: "Supermercado", valor: 612.4, tipo: "despesa", data: "2026-07-18" },
    { id: 5, descricao: "Academia", valor: 99.9, tipo: "despesa", data: "2026-07-20" }
];

export function buscarUsuarioLogado() {
    const usuario = localStorage.getItem("usuarioLogado");
    return usuario ? JSON.parse(usuario) : { nome: "Usuário", email: "" };
}

export function buscarDadosDashboard() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                usuario: buscarUsuarioLogado(),
                resumo: RESUMO_MOCK,
                grafico: GRAFICO_MOCK,
                lancamentos: LANCAMENTOS_MOCK
            });
        }, 800);
    });
}

export function fazerLogout() {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("token");
}