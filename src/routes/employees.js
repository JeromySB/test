import { Routes, Route} from "react-router-dom";
import Employees from "../views/employees";


export default function EmployeesRoute() {
    return (
        <Routes>
            <Route path="/" element={<Employees />} />
        </Routes>
    )
}