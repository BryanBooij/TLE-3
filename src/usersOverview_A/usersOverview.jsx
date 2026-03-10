import '../App.css'
import '../index.css'
import './userOverview.css'
import ButtonGreen from "../buttons/ButtonGreen.jsx";

function UserOverview() {

    return (
        <>
            <div id="userOverviewContainer">
            <div id="topTable">
                <h1>Users</h1>

                <div id="filterHolder">
                    <div className="dropdown">
                        <h2>Filters</h2>
                        <div className="dropdown-content">
                            <ButtonGreen className="detailButton" alt="Filter A" label="FilterA" onClick={() => navigate("/")} />
                            <ButtonGreen className="detailButton" alt="Filter B" label="FilterB" onClick={() => navigate("/")} />
                            <ButtonGreen className="detailButton" alt="Filter C" label="FilterC" onClick={() => navigate("/")} />
                            <ButtonGreen className="detailButton" alt="Filter D" label="FilterD" onClick={() => navigate("/")} />
                            <ButtonGreen className="detailButton" alt="Filter E" label="FilterB" onClick={() => navigate("/")} />
                            <ButtonGreen className="detailButton" alt="Apply" label="Apply" onClick={() => navigate("/")} />
                        </div>
                    </div>

                    <div className="dropdown">
                        <h2>Sort on</h2>
                        <div className="dropdown-content">
                            <ButtonGreen className="detailButton" alt="Newest" label="Newest" onClick={() => navigate("/")} />
                            <ButtonGreen className="detailButton" alt="Oldest" label="Oldest" onClick={() => navigate("/")} />
                            <ButtonGreen className="detailButton" alt="Family name A-Z" label="Family name A-Z" onClick={() => navigate("/")} />
                            <ButtonGreen className="detailButton" alt="Family name Z-A" label="Family name Z-A" onClick={() => navigate("/")} />
                            <ButtonGreen className="detailButton" alt="Username A-Z" label="Username A-Z" onClick={() => navigate("/")} />
                            <ButtonGreen className="detailButton" alt="Username Z-A" label="Username Z-A" onClick={() => navigate("/")} />
                        </div>
                    </div>
                </div>
            </div>

            <table>
                <thead>
                <tr>
                    <th>User picture</th>
                    <th>User name</th>
                    <th>Family</th>
                    <th>Score </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>

                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td id="familyA">Json family</td>
                    <td>89</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/")} />
                </tr>
                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td>Adams family</td>
                    <td>34</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/")} />
                </tr>
                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td>Juan family</td>
                    <td>58</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/")} />
                </tr>
                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td>van Boeren family</td>
                    <td>39</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/")} />
                </tr>
                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td>Jansen family</td>
                    <td>56</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/")} />
                </tr>
                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td>Strange family</td>
                    <td>94</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/")} />
                </tr>
                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td>Pines family</td>
                    <td>73</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/")} />
                </tr>
                </tbody>
            </table>
            </div>
        </>
    )
}

export default UserOverview
