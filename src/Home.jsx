import "./Home.css";
import "./buttons/ButtonMain.jsx";
import ButtonMain from "./buttons/ButtonMain.jsx";

function Home(){
    return (
        <>
            <div className="home-container">
                <h1>Home Page</h1>
                <p>Welkom op onze homepage</p>
                <ButtonMain label="Home"/>
            </div>
        </>
    )
}

export default Home;