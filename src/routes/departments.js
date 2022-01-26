import { Routes, Route} from "react-router-dom";
import Deparmet from "../views/departments";


export default function DepartmentsRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Deparmet />} />
        </Routes>
    )
}