import React from "react";
import NutritionTable from "./NutritionTable";
import Reviews from "./Reviews";

function AboutPageHelper(props) {
    const { food } = props;
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
            <Reviews food={food}></Reviews>
        </div>
    );
}

export default AboutPageHelper;