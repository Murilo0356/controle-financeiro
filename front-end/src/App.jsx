import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login/Login";
import Cadastro from "./Pages/Cadastro/Cadastro";
import RecuperarSenha from "./Pages/EsquecerSenha/RecuperarSenha";
import MudarSenha from "./Pages/EsquecerSenha/MudarSenha";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AlterarSenha from "./Pages/Perfil/AlterarSenha";
import Lancamentos from "./Pages/Lancamentos/Lancamento";
import RotaProtegida from "./Pages/Componentes/RotaProtegida";
import Categoria from "./Pages/Categoria/Categoria";
import Carteira from "./Pages/Carteira/Carteira";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      <Route path="/redefinir-senha" element={<MudarSenha />} />

      <Route element={<RotaProtegida />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lancamento" element={<Lancamentos />} />
        <Route path="/categoria" element={<Categoria />} />
        <Route path="/carteira" element={<Carteira />} />
        <Route path="/perfil" element={<AlterarSenha />} />
        <Route path="/alterar-senha" element={<AlterarSenha />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;