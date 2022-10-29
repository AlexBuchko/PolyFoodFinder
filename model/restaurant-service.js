const mongoose = require("mongoose");
const restaurantSchema = require("./restaurant");

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
    const restaurantModel = getDbConnection().model("restaurant", restaurantSchema);
    let result;
    if (foodName === undefined && restName === undefined) {      // no food or restaurant specified
        result = await restaurantModel.find()
    }
    else if (!foodName && restName) {
        result = await findRestByName(foodName);
    }
    else if (foodName && !restName) {
        result = await findRestByFood(restName);
    }
    return result;
}

async function findRestByName(rname) {
    const restaurantModel = getDbConnection().model("restaurant", restaurantSchema);
    return await restaurantModel.find({'name':rname});
}

async function findRestByFood(fname) {
    const restaurantModel = getDbConnection().model("restaurant", restaurantSchema);
    return await restaurantModel.find({'foods':fname});
}

exports.getFoods = getFoods;