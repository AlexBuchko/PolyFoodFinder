import React, {useState, useEffect} from "react";
import AboutPageHelper from "./AboutPageHelper";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function AboutPage() {
    const {id} = useParams();
    console.log(id);
    const [foodsData, setFoodsData] = useState({ });

    useEffect(() => {
        console.log("in useEffect");
        console.log(id);
        getFood().then((result) => {
            if (result) setFoodsData(result);
        });
    }, []);

    async function getFood() {
        console.log("in getFood");
        console.log(id);
        getFoodById().then((result) => {
            console.log(result.data.food);
            if (result && result.status === 200)
                setFoodsData(result.data.food);
        });
    }

    async function getFoodById() {
        console.log("in getFoodById");
        console.log(id);
        try {
            const response = await axios.get("http://localhost:4000/foods/" + id);
            console.log(response);
            return response;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    return(<AboutPageHelper food={foodsData}></AboutPageHelper>);
}
export default AboutPage;
