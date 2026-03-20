import "./family.css";
import BigButton from "../buttons/BigButton.jsx";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function Family() {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://145.24.237.168:8000/users", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const filteredUsers = data.map(user => ({
                    id: user.id,
                    username: user.username
                }));
                setUsers(filteredUsers);
            })
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    useEffect(() => {
        fetch("http://145.24.237.168:8000/ai_profiles", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setProfiles(data);
            })
            .catch((error) => console.error("Error fetching profiles:", error));
    }, []);

    const getUsername = (user_id) => {
        const user = users.find(u => u.id === user_id);
        return user ? user.username : "Onbekend";
    };

    return (
        <>
            <div className="family-container">
                <h1>Know your AI</h1>
                <p>Dit is jouw familie!</p>
                <img src="/family-ai-drawing.png" alt="Family AI" className="home-image"/>
                <h3>Hier kan je de informatie bekijken per familielid</h3>
                <div className="family-buttons">
                    {profiles.map((profile) => (
                        <BigButton key={profile.id} alt={getUsername(profile.user_id)} label={getUsername(profile.user_id)} onClick={() => navigate(`/Family/Profiles/${profile.user_id}`, {state: { username: getUsername(profile.user_id) }})}/>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Family;