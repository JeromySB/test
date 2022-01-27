import { Routes, Route} from "react-router-dom";
import Studies from "../views/studies";
import { useEffect} from "react"

export default function StudiesRoute() {
    
    useEffect(() => {
        if(sessionStorage.getItem("accessToken") === null){
            window.location.href = "/login"
        }
    }, []);
    return (
        <Routes>
            <Route path="/" element={<Studies />} />
        </Routes>
    )
}