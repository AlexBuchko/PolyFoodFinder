const mongoose = require("mongoose");
const foodSchema = require("./food");
const restaurantServices = require('../model/restaurant-services');

let dbConnection;

function getDbConnection() {
    if (!dbConnection) {
        dbConnection = mongoose.createConnection(
            "mongodb+srv://poly:bites@polybitesdb.qbis9.mongodb.net/polybites?retryWrites=true&w=majority"
        );
    }
    return dbConnection;
}

async function getFoodsByFilters(diet, price, location) {
    const foodsModel = getDbConnection().model("foods", foodSchema);
    let result;
    const searchParams = [];
    if (diet === "None" && price === "Any" && location === "Any") {
        return await foodsModel.find({ price: { $gte: 0 } });
    } else {
        if (diet === "Vegan") {
            searchParams.push({ vegan: true });
        } else if (diet === "Vegetarian") {
            searchParams.push({ vegetarian: true });
        }
        if (price === "$20+") {
            searchParams.push({ price: { $gt: 20 } });
        } else if (price === "Below $5") {
            searchParams.push({ price: { $lt: 5 } });
        } else if (price === "$5 - $10") {
            searchParams.push({ price: { $gte: 5 } });
            searchParams.push({ price: { $lt: 10 } });
        } else if (price === "$10 - $15") {
            searchParams.push({ price: { $gte: 10 } });
            searchParams.push({ price: { $lt: 15 } });
        } else if (price === "$15 - $20") {
            searchParams.push({ price: { $gte: 16 } });
            searchParams.push({ price: { $lt: 20 } });
        } else {
            searchParams.push({ price: { $gte: 0 } });
        }
        if(location != "Any"){
            validRestNames = await getRestaurantsInFilter(location);
            if(validRestNames.length > 0){
                searchParams.push({$or: validRestNames});
            }
            else{
                //this is just to make it return nothing when the restaurant filter doesn't have any items
                searchParams.push({'restaurant': "no-name-match"});
            }
        }
    }
    //add location stuff here later
    result = await foodsModel.find({ $and: searchParams });
    return result;
}

async function getRestaurantsInFilter(location){
    restLookupTags = [];
    restNames = await restaurantServices.getRestaurantsByLocation(location);
    for(var i = 0, size = restNames.length; i < size; i++){
        restLookupTags.push({'restaurant': restNames[i]})
    }
    return restLookupTags;
}

async function getFoods(foodName, restName) {
    const foodsModel = getDbConnection().model("foods", foodSchema);
    let result;
    if (foodName === undefined && restName === undefined) {
        // no food or restaurant specified
        result = await foodsModel.find();
    } else if (foodName && !restName) {
        result = await findFoodByName(foodName);
    } else if (!foodName && restName) {
        result = await findFoodByRest(restName);
    }
    return result;
}

async function findFoodByName(fname) {
    const foodsModel = getDbConnection().model("foods", foodSchema);
    return await foodsModel.find({ name: fname });
}

async function findFoodByRest(rname) {
    const foodsModel = getDbConnection().model("foods", foodSchema);
    return await foodsModel.find({ restaurant: rname });
}

async function findFoodById(id) {
    const foodsModel = getDbConnection().model("foods", foodSchema);
    try {
        return await foodsModel.findById(id);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function updateOne(id, update) {
    /* updates the food at the given id with the passed in update object
    update: {field: value} can have 1+ field - value pairs
    return: the updated document
    EX: updateOne(<id>, {likes: 5}) would return the food at that ID with it's likes set to 5
    */
    const foodsModel = getDbConnection().model("foods", foodSchema);
    try {
        //new: true makes it return the updated food, not the old one
        return await foodsModel.findByIdAndUpdate(id, update, { new: true });
    } catch (err) {
        console.log("error in updateOne", err);
        return undefined;
    }
}

exports.getFoods = getFoods;
exports.findFoodById = findFoodById;
exports.getFoodsByFilters = getFoodsByFilters;
exports.getDbConnection = getDbConnection;
exports.updateOne = updateOne;
