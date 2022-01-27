import Paths from "./routes";
import firebaseConfig from "./config/firebaseconfig";
import { initializeApp } from "firebase/app";
function App() {
    initializeApp(firebaseConfig)
    return (
        <Paths/>
    );
}

export default App;
