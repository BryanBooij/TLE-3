import { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css"
import { validateLogin } from "./testLoginData";

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateLogin(username, password)) {
            setError("");
            localStorage.setItem("token", "loggedin");
            navigate("/Home");
        } else {
            setError("Invalid username or password");
            setPassword("");
        }
    };

    return(
        <div className="login-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>

                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;