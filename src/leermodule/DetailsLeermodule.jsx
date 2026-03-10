import '../App.css';
import '../index.css';
import { useParams } from "react-router-dom";
import './styleLeermoduleAdmin.css';
import '../buttons/ButtonPurple.jsx';
import ButtonPurple from "../buttons/ButtonPurple.jsx";
import ButtonBlack from "../buttons/ButtonBlack.jsx";

function DetailsLeermodule() {

    let info = useParams(); // Access the route parameter;
    console.log(info);
    const result = Object.values(info);
    console.log(result)

    return(
        <>
            <div id="detailsLeermoduleContainter">
                <h1>You're now checking out details of leermodule: {result}</h1>
                {/*div times amount of existing questions*/}
                <div id="questionsContainer">
                    {/*⭐: there's an issue where to many of them will make the top clip into the header!!!*/}
                <div>
                    <h2 className="questionTitle">Question 1</h2>
                    {/*p times the amount of existing answers*/}
                    <div className="answers_container">
                        <p>
                            answer
                        </p>
                        <p>
                            answer
                        </p>
                        <p>
                            answer
                        </p>
                    </div>
                </div>
                <div>
                    <h2 className="questionTitle">Question 2</h2>
                    <div className="answers_container">
                        <p>
                            answer
                        </p>
                        <p>
                            answer
                        </p>
                        <p>
                            answer
                        </p>
                    </div>
                </div>
                <div>
                    <h2 className="questionTitle">Question 3</h2>
                    <div className="answers_container">
                        <p>
                            answer
                        </p>
                        <p>
                            answer
                        </p>
                        <p>
                            answer
                        </p>
                    </div>
                </div>
                    <div className={"buttons_container_details"}>
                        <ButtonPurple alt={"Edit button"} label={"Edit data"}  onClick={() => navigate("/Leermodule/update/" + 1)}></ButtonPurple> {/* ⭐:Be sure to change the 1 to the proper ID here!!*/}
                        <ButtonBlack alt={"Delete button"} label={"Delete leermodule"}></ButtonBlack>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailsLeermodule