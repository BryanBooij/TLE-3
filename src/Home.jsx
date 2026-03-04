import "./Home.css";
import "./buttons/ButtonMain.jsx";
import ButtonMain from "./buttons/ButtonMain.jsx";
import ButtonGreen from "./buttons/ButtonGreen.jsx";
import ButtonFooter from "./buttons/ButtonFooter.jsx";
import ButtonHeader from "./buttons/ButtonHeader.jsx";
import {useNavigate} from "react-router";

function Home(){
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("*");
    };

    return (
        <>
            <div className="home-container">
                <h1>Home Page</h1>
                <p>Welkom op onze homepage</p>
                {/* Buttons placeholder for not to showcase */}
                <ButtonMain label="Button Main" onClick={handleHomeClick}/>
                <ButtonGreen label="Button Green"/>
                <ButtonHeader label="Button Header"/>
                <ButtonFooter label="Button Footer"/>
            </div>
        </>
    )
}

export default Home;