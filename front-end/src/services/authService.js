const EMAILS_CADASTRADOS = [
    "teste@gmail.com",
    "admin@gmail.com"
];

export function solicitarRecuperacaoSenha(email) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const emailExiste = EMAILS_CADASTRADOS.includes(email.toLowerCase());
            if (emailExiste) {
                console.info(`[mock] link de redefinição enviado para ${email}`);
            }
            resolve({ sucesso: true });
        }, 1200);
    });
}

export function tokenEhValido(token) {
    return Boolean(token && token.trim().length > 0);
}

export function redefinirSenha(token, novaSenha) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!tokenEhValido(token)) {
                reject(new Error("Token inválido ou expirado. Solicite uma nova recuperação de senha."));
                return;
            }

            resolve({ sucesso: true });
        }, 1200);
    });
}

export function alterarSenha(idUsuario, senhaAtual, novaSenha) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const usuarioSalvoRaw = localStorage.getItem("usuarioLogado") || localStorage.getItem("findesk_usuario");
            const usuarioSalvo = usuarioSalvoRaw ? JSON.parse(usuarioSalvoRaw) : null;

            const senhaValida = usuarioSalvo?.senha || "123456";

            if (senhaAtual !== senhaValida) {
                reject(new Error("Senha atual incorreta."));
                return;
            }

            if (senhaAtual === novaSenha) {
                reject(new Error("A nova senha deve ser diferente da senha atual."));
                return;
            }

            if (usuarioSalvo) {
                usuarioSalvo.senha = novaSenha;
                localStorage.setItem("usuarioLogado", JSON.stringify(usuarioSalvo));
            }

            resolve({ sucesso: true });
        }, 1200);
    });
}