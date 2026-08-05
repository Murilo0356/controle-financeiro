
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