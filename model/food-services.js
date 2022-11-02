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
    console.log("in food serice facade");
    const foodsModel = getDbConnection().model("foods", foodSchema);
    let result;
    const searchParams = []
    if(diet === "None" && price === "Any" && location === "Any"){
        return await foodsModel.find({'price': {$gte:0}});
    }
    else{
        if(diet === "Vegan"){
            searchParams.push({'vegan': true});
        }
        else if (diet === "Vegetarian"){
            searchParams.push({'vegetarian': true});
        }
        if(price === "$20+") {
            searchParams.push({'price': {$gt:20}});
        }
        else if(price === "Below $5") {
            searchParams.push({'price': {$lt:5}});
        }
        else if(price === "$5 - $10") {
            searchParams.push({'price': {$gte:5}});
            searchParams.push({'price': {$lt:10}});
        }
        else if(price === "$10 - $15") {
            searchParams.push({'price': {$gte:10}});
            searchParams.push({'price': {$lt:15}});
        }
        else if(price === "$15 - $20") {
            searchParams.push({'price': {$gte:16}});
            searchParams.push({'price': {$lt:20}});
        }
        else{
            searchParams.push({'price': {$gte:0}})
        }
    }
    console.log("search params: ");
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
    else if (!foodName && restName) {
        result = await findFoodByRest(restName);
    }
    return result;
}

async function findFoodByName(fname) {
    const foodsModel = getDbConnection().model("foods", foodSchema);
    return await foodsModel.find({'name':fname});
}

async function findFoodByRest(rname) {
    const foodsModel = getDbConnection().model("foods", foodSchema);
    return await foodsModel.find({'restaurant':rname});
}

async function findFoodById(id){
    const foodsModel = getDbConnection().model("foods", foodSchema);    
    try{
        return await foodsModel.findById(id);
    }catch(error) {
        console.log(error);
        return undefined;
    }
}

exports.getFoods = getFoods;
exports.findFoodById = findFoodById;
exports.getFoodsByFilters = getFoodsByFilters;