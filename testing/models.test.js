const mongoose = require("mongoose");

const foodServices = require("../model/food-services");
const foodSchema = require("../model/food");

const restaurantServices = require("../model/restaurant-services");
const restaurantSchema = require("../model/restaurant");

const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let connFood;
// let connRest
let foodModel;
// let restaurantModel;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    
    connFood = await mongoose.createConnection(uri, mongooseOpts);
    // connRest = await mongoose.createConnection(uri, mongooseOpts);

    foodModel = connFood.model("foods", foodSchema);
    // restaurantModel = connRest.model("restaurants", restaurantSchema);


    // why isn't this working????????????
    foodServices.setConnection(connFood);
    // restaurantServices.setConnection(connRest);
});

afterAll(async () => {
    await connFood.dropDatabase();
    await connFood.close();
    // await connRest.dropDatabase();
    // await connRest.close();
    await mongoServer.stop();
})

describe("foodServices", () => {
    test("first test", () => {
        expect(true).toBe(true);
    });
});
