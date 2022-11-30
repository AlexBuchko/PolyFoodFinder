import React, { useState, useEffect } from "react";
import AboutPageHelper from "./AboutPageHelper";
import { useParams } from "react-router-dom";
import axios from "axios";

function AboutPage() {
    const { id } = useParams();
    const [food, setFood] = useState({});

    useEffect(() => {
        getFood();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /* eslint-enable */

    async function getFood() {
        getFoodById().then((result) => {
            if (result && result.status === 200) setFood(result.data.food);
        });
    }

    async function getFoodById() {
        try {
            const response = await axios.get(
                "http://localhost:4000/foods/" + id
            );
            return response;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    return <AboutPageHelper food={food} setFood={setFood}></AboutPageHelper>;
}
export default AboutPage;
