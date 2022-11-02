const mongoose = require("mongoose");
const foodSchema = require("./food");

let dbConnection;

function getDbConnection() {
    if (!dbConnection) {
        dbConnection = mongoose.createConnection(
            "mongodb+srv://poly:bites@polybitesdb.qbis9.mongodb.net/polybites?retryWrites=true&w=majority"
        );
    }
    return dbConnection;
}

async function getFoodsByFilters(diet, price, location){
    const foodsModel = getDbConnection().model("foods", foodSchema);
    let result;
    searchParams = []
    if(diet === "None" && price === "Any" && location === "Any"){
        return await foodsModel.find();
    }
    else{
        if(diet === "Vegan"){
            searchParams.append({'vegan': true});
        }
        else if (diet === "Vegetarian"){
            searchParams.append({'vegetarian': true});
        }
        if(priceRange === "$20+") {
            searchParams.append({'price': {$gt:20}});
        }
        else if(priceRange === "Below $5") {
            searchParams.append({'price': {$lt:5}});
        }
        else if(priceRange === "$5 - $10") {
            searchParams.append({'price': {$gte:5}});
            searchParams.append({'price': {$lt:10}});
        }
        else if(priceRange === "$10 - $15") {
            searchParams.append({'price': {$gte:10}});
            searchParams.append({'price': {$lt:15}});
        }
        else if(priceRange === "$15 - $20") {
            searchParams.append({'price': {$gte:16}});
            searchParams.append({'price': {$lt:20}});
        }
        else{
            searchParams.append({'price': {$gte:0}})
        }
    }
    console.log(searchParams);
    //add location stuff here later
    result = await foodsModel.find({$and: searchParams});
    return result;

}

async function getFoods(foodName, restName) {
    const foodsModel = getDbConnection().model("foods", foodSchema);
    let result;
    if (foodName === undefined && restName === undefined) {      // no food or restaurant specified
        result = await foodsModel.find();
    }
    else if (foodName && !restName) {
        result = await findFoodByName(foodName);
    }
    // else if (!foodName && restName) {
    //     result = await findFoodByRest(restName);
    // }
    return result;
}

async function findFoodByName(fname) {
    const foodsModel = getDbConnection().model("foods", foodSchema);
    return await foodsModel.find({'name':fname});
}

async function findFoodByRest(rname) {
    const foodsModel = getDbConnection().model("foods", foodSchema);
    return await foodsModel.find({'restaurants':rname});
}

exports.getFoods = getFoods;
exports.getFoodsByFilters = getFoodsByFilters;