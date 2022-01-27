import { Routes, Route} from "react-router-dom";
import Employees from "../views/employees";

import { useEffect} from "react"

export default function EmployeesRoute() {
    
    useEffect(() => {
        if(sessionStorage.getItem("accessToken") === null){
            window.location.href = "/login"
        }
    }, []);
    return (
        <Routes>
            <Route path="/" element={<Employees />} />
        </Routes>
    )
}