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
                    <img src="../public/cloud.png" alt="cloud" className="cloud" width="200" height="200"/>
                    <span className="cloud-text-left">Karen de Koning vindt mischien........ leuk, omdat je..... leuk vindt.</span>
                    <img src="../public/family-ai.png" alt="Family AI" className="home-image" width="434" height="500"/>
                    <img src="../public/cloud2.png" alt="cloud" className="cloud" width="200" height="200"/>
                    <span className="cloud-text-right">Jan de Koning vindt mischien........ leuk, omdat je..... leuk vindt.</span>
                </div>
                <BigButton alt="BigButton" label="Maak de toets!" onClick={() => navigate("/quiz")}/>
            </div>
        </>
    )
}

export default Home;