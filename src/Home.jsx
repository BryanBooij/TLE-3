import "./Home.css";
import "./buttons/ButtonMain.jsx";
import ButtonMain from "./buttons/ButtonMain.jsx";
import ButtonGreen from "./buttons/ButtonGreen.jsx";
import ButtonFooter from "./buttons/ButtonFooter.jsx";
import ButtonHeader from "./buttons/ButtonHeader.jsx";
import {useNavigate} from "react-router";

function Home(){
    const navigate = useNavigate();

    return (
        <>
            <div className="home-container">
                <h1>Home Page</h1>
                <p>Welkom op onze homepage</p>
                <p>hier staan al een aantal buttons klaar voor gebruik naam is subject to change</p>
                {/* Buttons placeholder for display purposes */}
                <ButtonMain label="Button Main" onClick={() => navigate("*")}/>
                <ButtonGreen label="Button Green"/>
                <ButtonHeader label="Button Header"/>
                <ButtonFooter label="Button Footer"/>
            </div>
        </>
    )
}

export default Home;