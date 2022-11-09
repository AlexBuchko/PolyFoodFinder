import React, {useState, useEffect} from 'react';
import Table from './Table';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import AboutPage from "./AboutPage";
import axios from 'axios';

function MyApp() {
    const [foodsData, setFoodsData] = useState({ foods: [] });

    useEffect(() => {
        getData().then((result) => {
            if (result) setFoodsData(result);
        });
    }, []);

    async function getData() {
        makeRequest().then((result) => {
            if (result && result.status === 201)
                setFoodsData([...foodsData.food, result.data]);
        });
    }

    async function makeRequest() {
        const loc = document.getElementById("location").value;
        const cost = document.getElementById("price").value;
        const dietRes = document.getElementById("dietRestriction").value;
        const request = { location: loc, price: cost, diet: dietRes };
        try {
            const response = await axios.get("http://localhost:4000/foods", {
                params: request,
            });
            setFoodsData(response.data);
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    /*only rendering the object if foodsData has been populated*/
    const aboutPage =
        foodsData.foods.length > 0 ? (
            <AboutPage food={foodsData.foods[0]}></AboutPage>
        ) : (
            <div></div>
        );

    return (
        <div className="container">
            <src img="src\images\HeaderPic.png" />
            <h1 align="center">Welcome To PolyBites</h1>
            <div className="tableDiv" width="100%">
                <div className="filterSelector" width="100%">
                    <table>
                        <tr>
                            <td> Filters: </td>
                            <td width="33%"> Dietary Restrictions</td>
                            <td width="33%"> Location </td>
                            <td width="33%"> Price </td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td width="33%">
                                <select id="dietRestriction" onChange={getData}>
                                    <option> None </option>
                                    <option> Vegetarian </option>
                                    <option> Vegan </option>
                                </select>
                            </td>
                            <td width="33%">
                                <select id="location" onChange={getData}>
                                    <option> Any </option>
                                    <option> Poly Canyon Village </option>
                                    <option> Kennedy Library </option>
                                    <option> University Union </option>
                                    <option> Yakʔitʸutʸu </option>
                                    <option> Vista Grande </option>
                                </select>
                            </td>
                            <td width="33%">
                                <select id="price" onChange={getData}>
                                    <option> Any </option>
                                    <option> Below $5 </option>
                                    <option> $5 - $10 </option>
                                    <option> $10 - $15 </option>
                                    <option> $15 - $20 </option>
                                    <option> $20+ </option>
                                </select>
                            </td>
                        </tr>
                    </table>
                </div>
                <Table foodsData={foodsData} />
            </div>
            {aboutPage}
        </div>
    );
}

export default MyApp;
