import '../App.css'
import '../index.css'
import './userOverview.css'
import {useNavigate} from "react-router";
import {useParams} from "react-router-dom";
import ButtonPurple from "../buttons/ButtonPurple.jsx";
import ButtonBlack from "../buttons/ButtonBlack.jsx";

function DetailsUsers() {

    const navigate = useNavigate();
    let info = useParams(); // Access the route parameter;
    const result = Object.values(info);

    return (
        <>
            <div id="detailsUsersContainer">
                <ButtonPurple alt={"back button"} label={"Back"} onClick={() => navigate("/userOverview")}></ButtonPurple>
                <div id="user">
                    <img src="" alt="user profile picture"/>
                    <h1 id="nameUser">Name user: {result}</h1>
                </div>
                <div id="detailsUser">
                    <p>Family: Json</p>
                    <p>Age: [Redacted]</p>
                </div>
                <hr/>
                <div id="chartData">
                    <div id="gamesPlayed">
                        <h3>Played quizzes</h3>
                        <table>
                            <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr>
                                <td>img</td>
                                <td>Quiz name</td>
                                <td>Finished: ✅</td>
                            </tr>
                            <tr>
                                <td>img</td>
                                <td>Quiz name</td>
                                <td>Finished: ✅</td>
                            </tr>
                            <tr>
                                <td>img</td>
                                <td>Quiz name</td>
                                <td>Finished: ❌</td>
                            </tr>
                            <tr>
                                <td>img</td>
                                <td>Quiz name</td>
                                <td>Finished: ✅</td>
                            </tr>
                            </tbody>
                        </table>
                        <h3>Overal internet score: 89</h3>
                    </div>
                    <div id="dataChartUserDetails">
                        <h2>Data collection chart:</h2>
                        <div className="chart-container">
                            <div className="center-label">100%</div>
                        </div>

                        <div className="legend">
                            <div className="legend-item">
                                <div className="legend-color instagram"></div>
                                Search history - 60%
                            </div>
                            <div className="legend-item">
                                <div className="legend-color facebook"></div>
                                Watch history - 20%
                            </div>
                            <div className="legend-item">
                                <div className="legend-color twitter"></div>
                                Data gathered from quizzes - 10%
                            </div>
                            <div className="legend-item">
                                <div className="legend-color snapchat"></div>
                                Own input - 10%
                            </div>
                        </div>
                    </div>
                </div>
                <ButtonBlack id={"deleteUserDetails"} label={"Delete user"}></ButtonBlack>
            </div>
        </>
    )
}

export default DetailsUsers