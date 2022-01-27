import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react"


export default function Login(params) {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    
    useEffect(() => {

    }, []);
    const startLogin = () => {
        if ((email === "") || (password.length < 7)) {
            alert("Por favor completa los datos necesarios")
        } {

            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password,)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)
                    console.log(userCredential);
                    sessionStorage.setItem("accessToken", user.accessToken )
                    sessionStorage.setItem("email", user.email )
                    window.location.href = "/home"
                    // ...
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    alert(errorMessage)
                    // ..
                });
        }
    }

    return (
        <>
            <div className="mb-3">
                <label htmlFor="EmailInput" className="form-label">Email</label>
                <input type="email" className="form-control" onChange={(e) => { setemail(e.target.value) }} value={email} id="EmailInput" placeholder="name@example.com" />
            </div>
            <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Password</label>
                <input type="password" className="form-control" onChange={(e) => { setpassword(e.target.value) }} value={password} id="passwordInput" placeholder="**********" />
            </div>
            <button onClick={startLogin}>Iniciar session</button>
            <div>
                <a href="/singup">Crearse una Cuenta</a>
            </div>
        </>
    )
}