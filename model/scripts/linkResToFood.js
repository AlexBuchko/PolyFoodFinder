const foodSchema = require("../food");
const restaurantSchema = require("../restaurant");
const foodServices = require("../food-services");
const mongoose = require("mongoose");

const foodsModel = foodServices.getDbConnection().model("foods", foodSchema);
const restaurantsModel = foodServices
    .getDbConnection()
    .model("restaurants", restaurantSchema);
//grab all the foods
const main = async () => {
    const allFoods = await foodsModel.find();
    for (const food of allFoods) {
        //look up the restaurant
        const { restaurant: restaurantName } = food;
        const restaurant = await restaurantsModel.findOne({
            name: restaurantName,
        });
        if (!restaurant) {
            console.log("unfound res:", restaurantName);
            continue;
        }
        //get it's ID
        const restaurantID = restaurant._id;
        // it's id to the food's restaurant_id field
        food.restaurant_id = restaurantID;
        food.markModified("restaurant_id");
        food.save();
    }
};

main();
