import "./family.css";
import BigButton from "../buttons/BigButton.jsx";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function Family() {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://145.24.237.168:8000/users"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
        }
            .then((response) => response.json())
            .then((data) => {
                const filteredUsers = data.map(user => ({
                    id: user.id,
                    username: user.username
                }));
                setUsers(filteredUsers);
                console.log(filteredUsers);
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

    return (
        <>
            <div className="family-container">
                <h1>Family AI</h1>
                <p>Dit is jouw familie!</p>
                <img src="/family-ai-drawing.png" alt="Family AI" className="home-image"/>
                <h3>Hier kan je de informatie bekijken per familielid</h3>
                <div className="family-buttons">
                    {profiles.map((profile) => (
                        <BigButton
                            key={profile.id}
                            alt={users[profile.user_id]}
                            label={users[profile.user_id]}
                            onClick={() => navigate(`/Family/Profiles/${profile.id}`)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Family;