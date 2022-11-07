const foodSchema = require("../food");
const restaurantSchema = require("../restaurant");
const foodServices = require("../food-services");
const mongoose = require("mongoose");

const foodsModel = foodServices.getDbConnection().model("foods", foodSchema);
const fieldsToChange = ["likes", "dislikes", "poisonings"];
//grab all the foods
const main = async () => {
    const allFoods = await foodsModel.find();
    for (const food of allFoods) {
        for (const field of fieldsToChange) {
            food[field] = 0;
            food.markModified(field);
        }
        food.save();
    }
};

main();
