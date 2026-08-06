import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login/Login";
import Cadastro from "./Pages/Cadastro/Cadastro";
import RecuperarSenha from "./Pages/EsquecerSenha/RecuperarSenha";
import RedefinirSenha from "./Pages/EsquecerSenha/RedefinirSenha";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AlterarSenha from "./Pages/Perfil/AlterarSenha"; 
import RotaProtegida from "./Pages/Componentes/RotaProtegida";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      <Route path="/redefinir-senha/:token" element={<RedefinirSenha />} />

      <Route element={<RotaProtegida />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/perfil" element={<AlterarSenha />} />
        <Route path="/alterar-senha" element={<AlterarSenha />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;