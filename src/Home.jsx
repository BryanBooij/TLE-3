import "./Home.css";
import "./buttons/ButtonMain.jsx";
import ButtonMain from "./buttons/ButtonMain.jsx";
import ButtonGreen from "./buttons/ButtonGreen.jsx";
import ButtonPurple from "./buttons/ButtonPurple.jsx";
import ButtonBlack from "./buttons/ButtonBlack.jsx";
import {useNavigate} from "react-router";
import BigButton from "./buttons/BigButton.jsx";
import InfoButton from "./buttons/InfoButton.jsx";

function Home(){
    const navigate = useNavigate();

    return (
        <>
            <div className="home-container">
                <h1>Family AI</h1>
                <p>Maak de toets en achterhaal jullie digitale voetafdrukken!</p>
                <div className="home-images">
                    <div className="cloud-container">
                        <img src="/cloud.png" alt="cloud" className="cloud"/>
                        <span className="cloud-text-left">Karen de Koning vindt mischien...leuk, omdat je...leuk vindt.</span>
                    </div>
                    <img src="/family-ai-drawing.png" alt="Family AI" className="home-image"/>
                    <div className="cloud-container">
                        <img src="/cloud2.png" alt="cloud" className="cloud"/>
                        <span className="cloud-text-right">Jan de Koning vindt mischien...leuk, omdat je...leuk vindt.</span>
                    </div>
                </div>
                <BigButton alt="BigButton" label="Maak je eerste quiz!" onClick={() => navigate("/quiz")}/>
            </div>
        </>
    )
}

export default Home;