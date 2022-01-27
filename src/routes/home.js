import { Link } from "react-router-dom";
import NavBar from "../components/navbar/navbar";

export default function Home() {
    
    
    return (
        <>
            <NavBar />
            <main>
                <h2>Welcome to the homepage!</h2>
                <p>You can do this, I believe in you.</p>
            </main>
            <nav>
                <Link to="/login">Login</Link>
            </nav>
        </>
    );
}