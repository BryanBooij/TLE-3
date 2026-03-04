import "./NotFound.css";
import "./buttons/ButtonMain.jsx"
import ButtonMain from "./buttons/ButtonMain.jsx";
import { useNavigate } from "react-router";

function NotFound(){
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/");
    };

    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>Page not found</h2>
            <p>The page you are looking for does not exist.</p>
            <ButtonMain label="Home" onClick={handleHomeClick}/>
        </div>
    );
}

export default NotFound;
