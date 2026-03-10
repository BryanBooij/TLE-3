import '../App.css'
import '../index.css'
import { useParams } from "react-router-dom";
import ButtonGreen from "../buttons/ButtonGreen.jsx";

function DetailsLeermodule() {

    let info = useParams(); // Access the route parameter;
    console.log(info);
    const result = Object.values(info);
    console.log(result)

    return(
        <>
            <div id="detailsLeermoduleContainter">
                <h1>You're now checking out details of leermodule: {result}</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Questions</th>
                        <th>Answers</th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr>
                        <td>Data_1</td>
                        <td>Data_2</td>
                        <td>10x</td>
                    </tr>
                    <tr>
                        <td>Data_1</td>
                        <td>Data_2</td>
                        <td>10x</td>
                    </tr>
                    <tr>
                        <td>Data_1</td>
                        <td>Data_2</td>
                        <td>10x</td>
                    </tr>
                    <tr>
                        <td>Data_1</td>
                        <td>Data_2</td>
                        <td>10x</td>
                    </tr>
                    <tr>
                        <td>Data_1</td>
                        <td>Data_2</td>
                        <td>10x</td>
                    </tr>
                    <tr>
                        <td>Data_1</td>
                        <td>Data_2</td>
                        <td>10x</td>
                    </tr>
                    <tr>
                        <td>Data_1</td>
                        <td>Data_2</td>
                        <td>10x</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DetailsLeermodule