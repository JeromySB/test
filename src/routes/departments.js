import { Routes, Route} from "react-router-dom";
import Deparmet from "../views/departments";

import { useEffect} from "react"

export default function DepartmentsRoutes() {
    
    useEffect(() => {
        if(sessionStorage.getItem("accessToken") === null){
            window.location.href = "/login"
        }
    }, []);
    return (
        <Routes>
            <Route path="/" element={<Deparmet />} />
        </Routes>
    )
}