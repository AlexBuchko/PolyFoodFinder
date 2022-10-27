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

async function getFoods(foodName, restName) {
    const foodsModel = getDbConnection().model("foods", foodSchema);
    let result;
    if (foodName === undefined && restName === undefined) {      // no food or restaurant specified
        result = await foodsModel.find()
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