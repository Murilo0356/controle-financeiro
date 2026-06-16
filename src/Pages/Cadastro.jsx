

function Cadastro({ onMudarParaLogin }) {

    return (
        <div className="container-cadastro">
            <h1>CHEGOU</h1>

            {}
            <p style={{ marginTop: '20px' }}>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onMudarParaLogin();
                    }}
                >
                    ← Voltar para o Login
                </a>
            </p>
        </div>
    );
}

export default Cadastro;