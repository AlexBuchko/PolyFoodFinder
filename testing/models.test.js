const mongoose = require("mongoose");
const foodServices = require("../model/food-services");
const restaurantServices = require("../model/food-services");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let userModel;
let restaurantModel;

beforeAll(async () => {
    console.log('hello');
})

describe("foodServices", () => {
    test("first test", () => {
        expect(true).toBe(true);
    });
});
