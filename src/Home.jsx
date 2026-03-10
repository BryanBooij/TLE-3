import "./Home.css";
import "./buttons/ButtonMain.jsx";
import ButtonMain from "./buttons/ButtonMain.jsx";
import ButtonGreen from "./buttons/ButtonGreen.jsx";
import ButtonPurple from "./buttons/ButtonPurple.jsx";
import ButtonBlack from "./buttons/ButtonBlack.jsx";
import {useNavigate} from "react-router";
import BigButton from "./buttons/BigButton.jsx";

function Home(){
    const navigate = useNavigate();

    return (
        <>
            <div className="home-container">
                <h1>Home Page</h1>
                <p>Welkom op onze homepage</p>
                <p>hier staan al een aantal buttons klaar voor gebruik naam is subject to change</p>
                {/* Buttons placeholder for display purposes */}
                <ButtonMain alt="Button Main" label="Button Main" onClick={() => navigate("*")}/>
                <ButtonGreen alt="Button Green" label="Button Green"/>
                <ButtonBlack alt="Button Black" label="Button Black"/>
                <ButtonPurple alt="Button Purple" label="Button Purple"/>
                <BigButton alt="BigButton" label="BigButton"/>
            </div>
        </>
    )
}

export default Home;