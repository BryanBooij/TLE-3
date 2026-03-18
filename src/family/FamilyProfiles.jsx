import "./family.css";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import BigButton from "../buttons/BigButton.jsx";

function FamilyProfiles() {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [themesData, setThemesData] = useState([]);
    const { id } = useParams();
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const location = useLocation();
    const username = location.state?.username;

    // Fetch AI profiles
    useEffect(() => {
        fetch("http://145.24.237.168:8000/ai_profiles?user_id=" + id, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((error) => console.error("Error fetching profiles:", error));
    }, [id]);

    // Fetch themes data
    useEffect(() => {
        fetch(`http://145.24.237.168:8000/themes?profile_id=${id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setThemesData(data);
            })
            .catch((err) => console.error("Error fetching themes:", err));
    }, [id]);

    useEffect(() => {
        if (!themesData.length || !chartRef.current) return;

        const item = themesData[0];
        const labels = [
            "movie", "artist", "food", "place",
            "music", "music_genre", "holiday_country",
            "clothing_style", "animal", "color"
        ];
        const values = labels.map(() => 1);
        const colors = [
            "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
            "#A28DFF", "#FF6699", "#33CCFF", "#FF33CC",
            "#99FF66", "#FF9933"
        ];

        const ctx = chartRef.current.getContext("2d");

        // als er al een chart bestaat verwijder deze zodat er een nieuwe gemaakt kan worden
        if (chartInstance) {
            chartInstance.destroy();
        }

        const newChart = new window.Chart(ctx, {
            type: "pie",
            data: {
                labels,
                datasets: [{
                    data: values,
                    backgroundColor: colors,
                }],
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            font: { size: 16 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const key = context.label;
                                return `${key}: ${item[key]}`;
                            },
                            title: () => null
                        }
                    }
                }
            }
        });

        setChartInstance(newChart);
    }, [themesData]);

    return (
        <>
            <div className="family-profiles-container">
                <h1>Family Profiles</h1>
                <p>Dit is de Family profile page</p>
                <p>Hierin kan je alle data zien wat onze AI heeft verzameld</p>
            </div>

            <div className="family-data">
                {user.map((profile) => (
                    <div key={profile.id}>
                        <h3>Veel bezochte video titels: {profile.liked_video_titles}</h3>
                        <h3>Veel bezochte video beschrijvingen: {profile.liked_video_descriptions}</h3>
                        <h3>Meest gebruikte tags: {profile.liked_video_tags}</h3>
                    </div>
                ))}

                <h3>Data collection chart</h3>
                <p>in deze data chart kan je zien waar {username} de van houd!</p>
                <div className="family-chart-container">
                    <canvas ref={chartRef}></canvas>
                </div>
                <BigButton alt="Back" label="Back" onClick={() => navigate("/Family")} />
            </div>
        </>
    );
}

export default FamilyProfiles;