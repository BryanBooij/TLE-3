import '../App.css';
import '../index.css';
import { useParams } from "react-router-dom";
import './styleDetails.css';

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
                <div>
                    <h1 className="questionTitle">Question 1</h1>
                    {/*p times the amount of existing answers*/}
                    <div className="answers-container">
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
                    <h1 className="questionTitle">Question 2</h1>
                    <div className="answers-container">
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
                    <h1 className="questionTitle">Question 3</h1>
                    <div className="answers-container">
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
            </div>
        </>
    )
}

export default DetailsLeermodule