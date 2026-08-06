import { Navigate, Outlet } from "react-router-dom";

function RotaProtegida() {
    const usuarioSalvo = localStorage.getItem("usuarioLogado") || localStorage.getItem("findesk_usuario");
    const token = localStorage.getItem("findesk_token") || localStorage.getItem("token");
    const estaAutenticado = Boolean(usuarioSalvo || token);
    return estaAutenticado ? <Outlet /> : <Navigate to="/login" replace />;
}

export default RotaProtegida;