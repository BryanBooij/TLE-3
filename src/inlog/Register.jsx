import { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";
import ButtonMain from "../buttons/ButtonMain.jsx";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("http://145.24.237.168:8000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess("User registered successfully!");
                localStorage.setItem("token", "loggedin");
                navigate("/Home");
                setError("");
            } else {
                setError(data.message || "Username or email already exists");
            }
        } catch (err) {
            setError("Network error");
            console.error(err);
        }
    };

    return (
        <div className="login-container">
            <h1>Register</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input type="username" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>

                <label htmlFor="email">Email: </label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>

                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}

                <ButtonMain label="Submit" type="submit"/>
            </form>
            <ButtonMain label="Login" onClick={() => navigate(`/`)}/>
        </div>
    );
}

export default Register;