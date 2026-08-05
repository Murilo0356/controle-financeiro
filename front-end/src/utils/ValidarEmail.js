export function validarEmail(email) {

    return (
        email.includes("@") &&
        email.includes(".")
    );

}