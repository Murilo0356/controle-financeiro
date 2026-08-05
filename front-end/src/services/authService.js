// Mock de "banco de dados" de usuários.
// Futuramente isso será substituído por chamadas reais ao backend em Spring Boot.
const EMAILS_CADASTRADOS = [
    "teste@gmail.com",
    "admin@gmail.com"
];

/**
 * Etapa 1: solicita a recuperação de senha para um e-mail.
 *
 * Por segurança, a API real (e este mock) NUNCA deve informar ao chamador
 * se o e-mail existe ou não na base — a resposta é sempre a mesma,
 * independentemente do resultado da busca interna.
 */
export function solicitarRecuperacaoSenha(email) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const emailExiste = EMAILS_CADASTRADOS.includes(email.toLowerCase());

            // Em um backend real, é aqui que um e-mail com o link
            // /redefinir-senha/:token seria disparado, apenas se o e-mail existir.
            if (emailExiste) {
                console.info(`[mock] link de redefinição enviado para ${email}`);
            }

            // Resolve sempre com sucesso, independente do e-mail existir.
            resolve({ sucesso: true });
        }, 1200);
    });
}

/**
 * Verifica se um token de redefinição é válido.
 * No mock, qualquer token não vazio é considerado válido.
 */
export function tokenEhValido(token) {
    return Boolean(token && token.trim().length > 0);
}

/**
 * Etapa 2: redefine a senha do usuário a partir do token recebido por e-mail.
 */
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