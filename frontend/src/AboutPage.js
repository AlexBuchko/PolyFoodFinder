import React, {useState, useEffect} from "react";
import AboutPageHelper from "./AboutPageHelper";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function AboutPage() {
    const {id} = useParams();
    const [foodsData, setFoodsData] = useState({ foods: [] });

    useEffect(() => {
        getFood().then((result) => {
            if (result) setFoodsData(result);
        });
    }, []);

    async function getFood() {
        getFoodById().then((result) => {
            if (result && result.status === 201)
                setFoodsData([...foodsData.food, result.data]);
        });
    }

    async function getFoodById() {
        try {
            const response = await axios.get("http://localhost:4000/foods/" + id);
            setFoodsData(response.data);
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    return(<AboutPageHelper food={foodsData.food}></AboutPageHelper>)
}
export default AboutPage;
