import { useState } from 'react'
import Login from './Pages/Login'
import Cadastro from './Pages/Cadastro' 
function App() {

  const [telaAtual, setTelaAtual] = useState('login')

  return (
    <>
      {telaAtual === 'login' ? (
        
        <Login onMudarParaCadastro={() => setTelaAtual('cadastro')} />
      ) : (
       
        <Cadastro onMudarParaLogin={() => setTelaAtual('login')} />
      )}
    </>
  )
}

export default App