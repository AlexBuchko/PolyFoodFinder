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

export const getFoods = async () => {
    /*gets all foods from DB*/
    /*returns a promise, so you need to .then() it get the results*/
    /*EX: getFoods().then((r) => console.log(r));*/
    const foodsModel = getDbConnection().model("foods", foodSchema);
    return await foodsModel.find();
};
