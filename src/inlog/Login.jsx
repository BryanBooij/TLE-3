import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Login.css"

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://145.24.237.168:8000/users", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => setUsers(data))
            .catch(err => console.error("Error fetching users:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://145.24.237.168:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", "loggedin");
                navigate("/Home");
            } else {
                setError(data.message || "Invalid email or password");
            }
        } catch (err) {
            console.error(err);
            setError("something went wrong. Please try again later.");
        }
    };

    return(
        <div className="login-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;