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

async function getRestaurants(restName) {
    const restaurantsModel = getDbConnection().model("restaurants", restaurantSchema);
    let result;
    if (restName === undefined) {      // no restaurant specified
        result = await restaurantsModel.find()
    }
    else {
        result = await findRestByName(restName);
    }
    return result;
}

async function getRestaurantsByLocation(location) {
    const restaurantsModel = getDbConnection().model("restaurants", restaurantSchema);
    const restAtLocation = await restaurantsModel.find({neighborhood: location});
    const validNames = [];
    for(var i = 0, size = restAtLocation.length; i < size; i++){
        validNames.push(restAtLocation[i].name);
    }
    return validNames;
}

async function findRestByName(rname) {
    const restaurantsModel = getDbConnection().model("restaurants", restaurantSchema);
    return await restaurantsModel.find({ 'name': rname });
}

async function findRestaurantById(id) {
    const restaurantsModel = getDbConnection().model("restaurants", restaurantSchema);
    try {
        return await restaurantsModel.findById(id);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

exports.getRestaurants = getRestaurants;
exports.findRestaurantById = findRestaurantById;
exports.getRestaurantsByLocation = getRestaurantsByLocation;