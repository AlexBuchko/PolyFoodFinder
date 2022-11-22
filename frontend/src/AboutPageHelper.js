import React from "react";
import NutritionTable from "./NutritionTable";
import Reviews from "./Reviews";
import { Link } from "react-router-dom";

import "./About.css";

function AboutPageHelper(props) {
    const { food, setFood } = props;
    let animalProductsMessage;

    if (food.vegan) {
        animalProductsMessage = "This food is vegan";
    } else if (food.vegetarian) {
        animalProductsMessage = "This food is vegetarian";
    } else {
        animalProductsMessage = "This food contains meat";
    }

    const capitalize = (s) => {
        if (!s) {
            return "";
        }
        return s
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.substring(1))
            .join(" ");
    };

    return (
        <div className="aboutBody">
            <h1>{capitalize(food.name)}</h1>
            <p>{animalProductsMessage}</p>
            <p>served at {food.restaurant}</p>
            <h2>Ingredients</h2>
            <p>{food.ingredients}</p>
            <h2>Nutritional Information</h2>
            <NutritionTable nutritionInfo={food.nutrition}></NutritionTable>
            <Reviews food={food} setFood={setFood}></Reviews>
            <Link to="/">Back To Search Page</Link>
        </div>
    );
}

export default AboutPageHelper;
