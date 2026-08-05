export function forcaSenha(senha) {

    if (senha.length < 6)
        return "Fraca";

    if (
        senha.match(/[A-Z]/) &&
        senha.match(/[0-9]/) &&
        senha.match(/[^A-Za-z0-9]/)
    ) {
        return "Forte";
    }

    return "Média";
}

export function corForcaSenha(senha) {

    const forca = forcaSenha(senha);

    if (forca === "Fraca")
        return "red";

    if (forca === "Média")
        return "orange";

    return "green";
}