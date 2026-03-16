import "./family.css";
import { useState } from "react";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import BigButton from "../buttons/BigButton.jsx";
function FamilyProfiles() {
    const [user, setUser] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        fetch("http://145.24.237.168:8000/ai_profiles?user_id=" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
            })
            .catch((error) => console.error("Error fetching profiles:", error));
    }, []);
    return(
        <>
            <div className="family-profiles-container">
                <h1>Family Profiles</h1>
                <p>Dit is de Family profile page</p>
                <p>Hierin kan je alle data zien wat onze AI heeft verzameld</p>
            </div>
            <div className="family-data">
                {user.map((profile) => (
                    <div key={profile.id}>
                        <h3>Veel bezochte zoekopdrachten: {profile.search_terms}</h3>
                        <h3>Veel bezochte websites: {profile.website_visits}</h3>
                        <h3>Meest gebruikte social media: {profile.social_media}</h3>
                        <h3>Veel gebruikte technologie: {profile.smart_objects}</h3>
                        <h3>samenvatting: {profile.overview}</h3>
                    </div>
                ))}
            </div>
        </>
    );
}

export default FamilyProfiles;