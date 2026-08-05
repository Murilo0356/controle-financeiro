import { useState } from "react";
import { Link } from "react-router-dom";
import "./RecuperarSenha.css";

import { validarEmail } from "../../utils/ValidarEmail";
import { solicitarRecuperacaoSenha } from "../../services/authService";

function RecuperarSenha() {

    const [email, setEmail] = useState("");

    const [erro, setErro] = useState("");
    const [enviado, setEnviado] = useState(false);
    const [carregando, setCarregando] = useState(false);

    function handleSubmit(e) {

        e.preventDefault();

        setErro("");

        if (!email) {
            setErro("Preencha o e-mail.");
            return;
        }

        if (!validarEmail(email)) {
            setErro("E-mail inválido.");
            return;
        }

        setCarregando(true);

        solicitarRecuperacaoSenha(email)
            .then(() => {
               
                setEnviado(true);
            })
            .finally(() => {
                setCarregando(false);
            });
    }

    return (
        <div className="container-recuperar-senha">

            <h1>Recuperar Senha</h1>
            <h2>Informe seu e-mail para receber o link de redefinição</h2>

            {enviado ? (

                <div>
                    <p className="mensagem-neutra">
                        Se este e-mail estiver cadastrado em nosso sistema,
                        você receberá em instantes um link com instruções
                        para redefinir sua senha.
                    </p>

                    <p style={{ marginTop: "25px" }}>
                        <Link to="/login">Voltar para o login</Link>
                    </p>
                </div>

            ) : (

                <form onSubmit={handleSubmit}>

                    <div className="form-group-recuperar-senha">
                        <label>E-mail</label>

                        <input
                            type="email"
                            placeholder="Digite seu e-mail cadastrado"
                            value={email}
                            disabled={carregando}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {erro && (
                        <p className="erro-recuperar-senha">
                            {erro}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={carregando}
                    >
                        {carregando
                            ? "Enviando..."
                            : "Enviar link de recuperação"}
                    </button>

                    <p>
                        Lembrou sua senha?{" "}
                        <Link to="/login">Fazer login</Link>
                    </p>

                </form>
            )}

        </div>
    );
}

export default RecuperarSenha;