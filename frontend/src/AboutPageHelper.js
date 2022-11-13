import React from "react";
import NutritionTable from "./NutritionTable";
import Reviews from "./Reviews";
import { Link } from "react-router-dom";

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

    return (
        <div>
            <h1>{food.name}</h1>
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
