import '../App.css';
import '../index.css';
import { useParams } from "react-router-dom";
import './styleLeermoduleAdmin.css';
import '../buttons/ButtonPurple.jsx';

//⭐: For some reason I need to leave in these console.log lines otherwise it won't trigger, I'll look at why some other time
//⭐: Also please DONT TOUCH THIS ITS SO UNSTABLE
// import './collapse.js'

import ButtonPurple from "../buttons/ButtonPurple.jsx";
import ButtonBlack from "../buttons/ButtonBlack.jsx";
import {useNavigate} from "react-router";
import ButtonGreen from "../buttons/ButtonGreen.jsx";

function DetailsLeermodule() {
    const { id } = useParams();
    let info = useParams(); // Access the route parameter;
    const result = Object.values(info);
    const navigate = useNavigate()

    return(
        <>
            <div id="detailsLeermoduleContainter">
                <ButtonPurple alt={"Exit details page of [insert quiz name here]"} label={"Return"} onClick={() => navigate("/Leermodule")}></ButtonPurple>
                <h1>You're now checking out details of leermodule: {result}</h1>
                {/*div times amount of existing questions*/}
                <div id="questionsContainer">
                    {/*⭐: there's an issue where to many of them will make the top clip into the header!!!*/}
                <div>
                    <h2 className="questionTitle collapsible">Question 1</h2>
                    {/*p times the amount of existing answers*/}
                    <div className="answers_container content_collapse">
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
                    <h2 className="questionTitle collapsible">Question 2</h2>
                    <div className="answers_container content_collapse">
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
                    <h2 className="questionTitle collapsible">Question 3</h2>
                    <div className="answers_container content_collapse">
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
                        <h2 className="questionTitle collapsible">Question 4</h2>
                        <div className="answers_container content_collapse">
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
                        <h2 className="questionTitle collapsible">Question 5</h2>
                        <div className="answers_container content_collapse">
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
                        <h2 className="questionTitle collapsible">Question 6</h2>
                        <div className="answers_container content_collapse">
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
                        <h2 className="questionTitle collapsible">Question 7</h2>
                        <div className="answers_container content_collapse">
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
                        <h2 className="questionTitle collapsible">Question 8</h2>
                        <div className="answers_container content_collapse">
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
                        <h2 className="questionTitle collapsible">Question 9</h2>
                        <div className="answers_container content_collapse">
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
                        <h2 className="questionTitle collapsible">Question 10</h2>
                        <div className="answers_container content_collapse">
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
                        <ButtonPurple alt={"Edit button"} label={"Edit data"}  onClick={() => navigate("/Leermodule/update/" + id)}></ButtonPurple> {/* ⭐:Be sure to change the 1 to the proper ID here!!*/}
                        <ButtonBlack alt={"Delete button"} label={"Delete leermodule"}></ButtonBlack>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailsLeermodule