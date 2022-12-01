const mongoose = require("mongoose");
const restaurantSchema = require("./restaurant");

let dbConnection;

function setConnection(newConn) {
    dbConnection = newConn;
    return dbConnection;
}

function getDbConnection() {
    if (!dbConnection) {
        dbConnection = mongoose.createConnection(
            "mongodb+srv://poly:bites@polybitesdb.qbis9.mongodb.net/polybites?retryWrites=true&w=majority"
        );
    }
    return dbConnection;
}

async function getRestaurantsByLocation(location) {
    const restaurantsModel = getDbConnection().model(
        "restaurants",
        restaurantSchema
    );
    const restAtLocation = await restaurantsModel.find({
        neighborhood: location,
    });
    const validNames = [];
    for (var i = 0, size = restAtLocation.length; i < size; i++) {
        validNames.push(restAtLocation[i].name);
    }
    return validNames;
}

exports.getRestaurantsByLocation = getRestaurantsByLocation;
exports.setConnection = setConnection;
