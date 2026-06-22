import "./Cadastro.css"

function Cadastro({ onMudarParaLogin }) {
    return (
        <div className="container-cadastro">
            <h1>Novo Cadastro</h1>

            <form>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" placeholder="Digite seu nome" />
                </div>

                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" placeholder="Digite seu e-mail" />
                </div>

                <div className="form-group">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" id="senha" placeholder="Digite sua senha" />
                </div>

                <div className="forca-senha">
                    Força da senha: ---
                </div>

                <div className="form-group">
                    <label htmlFor="confirmarSenha">Confirmar Senha</label>
                    <input
                        type="password"
                        id="confirmarSenha"
                        placeholder="Confirme sua senha"
                    />
                </div>

                <button type="submit">Cadastrar</button>
            </form>

            <p style={{ marginTop: '20px' }}>
                Já possui uma conta?{' '}
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onMudarParaLogin();
                    }}
                >
                    Fazer Login
                </a>
            </p>
        </div>
    );
}

export default Cadastro;