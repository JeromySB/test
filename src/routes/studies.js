import { Routes, Route} from "react-router-dom";
import Studies from "../views/studies";


export default function StudiesRoute() {
    return (
        <Routes>
            <Route path="/" element={<Studies />} />
        </Routes>
    )
}