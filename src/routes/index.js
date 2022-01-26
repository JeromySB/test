import { Routes, Route, Link } from "react-router-dom";
import DepartmentsRoutes from "./departments";
import EmployeesRoute from "./employees";
import StudiesRoute from "./studies";
import Home from './home'

export default function Paths() {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/departamentos/*" element={<DepartmentsRoutes />} />
            <Route path="/empleados/*" element={<EmployeesRoute />} />
            <Route path="/estudios/*" element={<StudiesRoute />} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
}



function NoMatch() {
    return (
        <div>
            <h2>Pagina no encontrada.</h2>
            <Link to="/home">Volver a pagina principal.</Link>

        </div>
    )
}


