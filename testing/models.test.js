const mongoose = require("mongoose");

const foodServices = require("../model/food-services");
const foodSchema = require("../model/food");

const restaurantServices = require("../model/restaurant-services");
const restaurantSchema = require("../model/restaurant");

const reviewSchema = require("../model/review");

const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

let connFood;
let connRest;
let connReview;

let foodModel;
let restaurantModel;
let reviewModel;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    connFood = await mongoose.createConnection(uri, mongooseOpts);
    connRest = await mongoose.createConnection(uri, mongooseOpts);
    connReview = await mongoose.createConnection(uri, mongooseOpts);

    foodModel = connFood.model("foods", foodSchema);
    restaurantModel = connRest.model("restaurants", restaurantSchema);
    reviewModel = connReview.model("reviews", reviewSchema);

    // why isn't this working????????????
    console.log(foodServices);
    foodServices.setConnection(connFood);
    restaurantServices.setConnection(connRest);
});

afterAll(async () => {
    await connFood.dropDatabase();
    await connFood.close();
    await connRest.dropDatabase();
    await connRest.close();
    await connReview.dropDatabase();
    await connReview.close();
    await mongoServer.stop();
});

describe("tests getReviews and addReview", () => {
    beforeEach(async () => {
        let dummyReview = {
            review: "i ordered 2 pancakes and i only got 1",
            food_id: "635c4d9428ec6a0f12577709",
        };
        let result = new reviewModel(dummyReview);
        await result.save();

        dummyReview = {
            review: "they skimped out on the chicken",
            food_id: "635c4d9428ec6a0f1257770e",
        };
        result = new reviewModel(dummyReview);
        await result.save();

        dummyReview = {
            review: "my pancakes were so delicious",
            food_id: "635c4d9428ec6a0f12577709",
        };
        result = new reviewModel(dummyReview);
        await result.save();

        dummyReview = {
            review: "this was a horrible curry",
            food_id: "635c4d9428ec6a0f1257770f",
        };
        result = new reviewModel(dummyReview);
        await result.save();
    });

    afterEach(async () => {
        await reviewModel.deleteMany();
    });

    test("get all the reviews for a given food id - 2 reviews exist", async () => {
        const target = 2;
        const id = "635c4d9428ec6a0f12577709";
        const reviews = await foodServices.getReviews(id);
        expect(reviews).toBeDefined();
        expect(reviews.length).toBe(target);
    });

    test("get all the reviews for a given food id - no reviews exist", async () => {
        const target = 0;
        const id = "635c4d9428ec6a0f12007709";
        const reviews = await foodServices.getReviews(id);
        expect(reviews.length).toBe(target);
    });

    test("get all the reviews for a given food id - error", async () => {
        const id = "635c09";
        const reviews = await foodServices.getReviews(id);
        expect(reviews).toBeFalsy();
    });

    test("add 1 review - no error", async () => {
        const id = "635c4d9428ec6a0f12577719";
        const review = "amazingly delicious";
        const result = await foodServices.addReview(id, review);
        expect(result).toBeTruthy();
        expect(result.review).toBe(review);
        expect(result).toHaveProperty("food_id");
    });

    test("add 1 review - error", async () => {
        const id = "34dw2";
        const review = "amazingly delicious";
        const result = await foodServices.addReview(id, review);
        expect(result).toBeFalsy();
    });
});

describe("tests incrementFoodRating", () => {
    afterEach(async () => {
        await foodModel.deleteMany();
    });

    test("increment likes", async () => {
        let dummyFood = {
            name: "agave",
            ingredients: "organic blue agave nectar",
            restaurant: "Balance Cafe",
            vegetarian: true,
            vegan: true,
            nutrition: {
                calories: 176,
                fat: 0,
                sodium: 2,
                carbs: 43,
                fiber: 0,
                sugar: 1,
                protein: 1,
            },
            likes: 50,
            dislikes: 23,
            poisonings: 14,
            price: 1,
            restaurant_id: "635b7be05455166813f787ad",
        };
        let foodResult = new foodModel(dummyFood);
        await foodResult.save();

        const id = foodResult.id;
        const rating = "likes";
        const result = await foodServices.incrementFoodRating(id, rating);
        expect(result).toBeTruthy();
    });

    test("increment dislikes", async () => {
        let dummyFood = {
            name: "agave",
            ingredients: "organic blue agave nectar",
            restaurant: "Balance Cafe",
            vegetarian: true,
            vegan: true,
            nutrition: {
                calories: 176,
                fat: 0,
                sodium: 2,
                carbs: 43,
                fiber: 0,
                sugar: 1,
                protein: 1,
            },
            likes: 50,
            dislikes: 23,
            poisonings: 14,
            price: 1,
            restaurant_id: "635b7be05455166813f787ad",
        };
        let foodResult = new foodModel(dummyFood);
        await foodResult.save();

        const id = foodResult.id;
        const rating = "dislikes";
        const result = await foodServices.incrementFoodRating(id, rating);
        expect(result).toBeTruthy();
    });

    test("increment poisonings", async () => {
        let dummyFood = {
            name: "agave",
            ingredients: "organic blue agave nectar",
            restaurant: "Balance Cafe",
            vegetarian: true,
            vegan: true,
            nutrition: {
                calories: 176,
                fat: 0,
                sodium: 2,
                carbs: 43,
                fiber: 0,
                sugar: 1,
                protein: 1,
            },
            likes: 50,
            dislikes: 23,
            poisonings: 14,
            price: 1,
            restaurant_id: "635b7be05455166813f787ad",
        };
        let foodResult = new foodModel(dummyFood);
        await foodResult.save();

        const id = foodResult.id;
        const rating = "poisonings";
        const result = await foodServices.incrementFoodRating(id, rating);
        expect(result).toBeTruthy();
    });

    test("increment unknown rating - error", async () => {
        let dummyFood = {
            name: "agave",
            ingredients: "organic blue agave nectar",
            restaurant: "Balance Cafe",
            vegetarian: true,
            vegan: true,
            nutrition: {
                calories: 176,
                fat: 0,
                sodium: 2,
                carbs: 43,
                fiber: 0,
                sugar: 1,
                protein: 1,
            },
            likes: 50,
            dislikes: 23,
            poisonings: 14,
            price: 1,
            restaurant_id: "635b7be05455166813f787ad",
        };
        let foodResult = new foodModel(dummyFood);
        await foodResult.save();

        const id = "ddddd";
        const rating = "likes";
        const result = await foodServices.incrementFoodRating(id, rating);
        expect(result).toBeUndefined();
    });
});

describe("test findFoodById", () => {
    beforeEach(async () => {
        let dummyFood = {
            name: "agave",
            ingredients: "organic blue agave nectar",
            restaurant: "Balance Cafe",
            vegetarian: true,
            vegan: true,
            nutrition: {
                calories: 176,
                fat: 0,
                sodium: 2,
                carbs: 43,
                fiber: 0,
                sugar: 1,
                protein: 1,
            },
            likes: 50,
            dislikes: 23,
            poisonings: 14,
            price: 1,
            restaurant_id: "635b7be05455166813f787ad",
        };
        let foodResult = new foodModel(dummyFood);
        await foodResult.save();

        dummyFood = {
            name: "bishop's burger",
            ingredients: "beef",
            restaurant: "Balance Cafe",
            vegetarian: false,
            vegan: false,
            nutrition: {
                calories: 676,
                fat: 103,
                sodium: 52,
                carbs: 93,
                fiber: 10,
                sugar: 14,
                protein: 58,
            },
            likes: 35,
            dislikes: 13,
            poisonings: 17,
            price: 2,
            restaurant_id: "635b7be05455166813f787ad",
        };
        foodResult = new foodModel(dummyFood);
        await foodResult.save();

        dummyFood = {
            name: "turkey salad",
            ingredients: "turkey",
            restaurant: "Balance Cafe",
            vegetarian: false,
            vegan: false,
            nutrition: {
                calories: 676,
                fat: 103,
                sodium: 52,
                carbs: 93,
                fiber: 10,
                sugar: 14,
                protein: 58,
            },
            likes: 35,
            dislikes: 13,
            poisonings: 17,
            price: 2,
            restaurant_id: "635b7be05455166813f787ad",
        };
        foodResult = new foodModel(dummyFood);
        await foodResult.save();
    });

    afterEach(async () => {
        await foodModel.deleteMany();
    });

    test("finding food with nonexisting id", async () => {
        const testId = "635b7be05446865813f787ad";
        const result = await foodServices.findFoodById(testId);
        expect(result).toBeFalsy();
    });

    test("finding food with existing id", async () => {
        dummyFood = {
            name: "alfredo pasta",
            ingredients: "heavy cream",
            restaurant: "Balance Cafe",
            vegetarian: false,
            vegan: false,
            nutrition: {
                calories: 76,
                fat: 13,
                sodium: 22,
                carbs: 43,
                fiber: 17,
                sugar: 12,
                protein: 58,
            },
            likes: 35,
            dislikes: 13,
            poisonings: 17,
            price: 2,
            restaurant_id: "635b7be05455166813f787ad",
        };
        foodResult = new foodModel(dummyFood);
        await foodResult.save();

        const testId = foodResult.id;
        const result = await foodServices.findFoodById(testId);
        expect(result).toBeTruthy();
    });

    test("test with invalid id format", async () => {
        const testId = "123";
        const result = await foodServices.findFoodById(testId);
        expect(result).toBeUndefined();
    });
});

describe("test getFoodsByFilters", () => {
    beforeEach(async () => {
        let dummyRestaurant = {
            name: "Balance Cafe",
            hour: {
                Mon: "7:00 am - 9:00 pm",
                Tue: "7:00 am - 9:00 pm",
                Wed: "7:00 am - 9:00 pm",
                Thu: "7:00 am - 9:00 pm",
                Fri: "7:00 am - 9:00 pm",
                Sat: "9:00 am - 9:00 pm",
                Sun: "9:00 am - 9:00 pm",
            },
            location: "Building 112, Vista Grande Area",
            neighborhood: "Vista Grande",
            phone_number: "805-756-5939",
        };
        let restaurantResult = new restaurantModel(dummyRestaurant);
        await restaurantResult.save();

        let dummyFood = {
            name: "agave",
            ingredients: "organic blue agave nectar",
            restaurant: "Balance Cafe",
            vegetarian: true,
            vegan: true,
            nutrition: {
                calories: 176,
                fat: 0,
                sodium: 2,
                carbs: 43,
                fiber: 0,
                sugar: 1,
                protein: 1,
            },
            likes: 50,
            dislikes: 23,
            poisonings: 14,
            price: 1,
            restaurant_id: "635b7be05455166813f787ad",
        };
        let foodResult = new foodModel(dummyFood);
        await foodResult.save();

        dummyFood = {
            name: "bishop's burger",
            ingredients: "beef",
            restaurant: "Balance Cafe",
            vegetarian: false,
            vegan: true,
            nutrition: {
                calories: 676,
                fat: 103,
                sodium: 52,
                carbs: 93,
                fiber: 10,
                sugar: 14,
                protein: 58,
            },
            likes: 35,
            dislikes: 13,
            poisonings: 17,
            price: 7.32,
            restaurant_id: "635b7be05455166813f787ad",
        };
        foodResult = new foodModel(dummyFood);
        await foodResult.save();

        dummyFood = {
            name: "plant-based chorizo pizza",
            ingredients: "chorizo",
            restaurant: "Hearth",
            vegetarian: true,
            vegan: false,
            nutrition: {
                calories: 676,
                fat: 103,
                sodium: 52,
                carbs: 93,
                fiber: 10,
                sugar: 14,
                protein: 58,
            },
            likes: 35,
            dislikes: 13,
            poisonings: 17,
            price: 14.95,
            restaurant_id: "635b7be05455166813f787ad",
        };
        foodResult = new foodModel(dummyFood);
        await foodResult.save();

        dummyFood = {
            name: "mango salsa barbacoa tacos",
            ingredients: "agave",
            restaurant: "Balance Cafe",
            vegetarian: false,
            vegan: false,
            nutrition: {
                calories: 676,
                fat: 103,
                sodium: 52,
                carbs: 93,
                fiber: 10,
                sugar: 14,
                protein: 58,
            },
            likes: 35,
            dislikes: 13,
            poisonings: 17,
            price: 23.54,
            restaurant_id: "635b7be05455166813f787ad",
        };
        foodResult = new foodModel(dummyFood);
        await foodResult.save();

        dummyFood = {
            name: "alfredo pasta",
            ingredients: "agave",
            restaurant: "Balance Cafe",
            vegetarian: false,
            vegan: false,
            nutrition: {
                calories: 676,
                fat: 103,
                sodium: 52,
                carbs: 93,
                fiber: 10,
                sugar: 14,
                protein: 58,
            },
            likes: 35,
            dislikes: 13,
            poisonings: 17,
            price: 18.54,
            restaurant_id: "635b7be05455166813f787ad",
        };
        foodResult = new foodModel(dummyFood);
        await foodResult.save();
    });

    afterEach(async () => {
        await foodModel.deleteMany();
        await restaurantModel.deleteMany();
    });

    test("no filters", async () => {
        const diet = "None";
        const price = "Any";
        const location = "Any";
        const target = 5;
        const result = await foodServices.getFoodsByFilters(
            diet,
            price,
            location
        );
        expect(result.length).toBe(target);
    });

    test("vegetarian filter", async () => {
        const diet = "Vegetarian";
        const price = "Any";
        const location = "Any";
        const target = 2;
        const result = await foodServices.getFoodsByFilters(
            diet,
            price,
            location
        );
        expect(result.length).toBe(target);
    });

    test("vegan filter", async () => {
        const diet = "Vegan";
        const price = "Any";
        const location = "Any";
        const target = 2;
        const result = await foodServices.getFoodsByFilters(
            diet,
            price,
            location
        );
        expect(result.length).toBe(target);
    });

    test("$20+ filters", async () => {
        const diet = "None";
        const price = "$20+";
        const location = "Any";
        const target = 1;
        const result = await foodServices.getFoodsByFilters(
            diet,
            price,
            location
        );
        expect(result.length).toBe(target);
    });

    test("Below $5 filters", async () => {
        const diet = "None";
        const price = "Below $5";
        const location = "Any";
        const target = 1;
        const result = await foodServices.getFoodsByFilters(
            diet,
            price,
            location
        );
        expect(result.length).toBe(target);
    });

    test("$5 - $10 filters", async () => {
        const diet = "None";
        const price = "$5 - $10";
        const location = "Any";
        const target = 1;
        const result = await foodServices.getFoodsByFilters(
            diet,
            price,
            location
        );
        expect(result.length).toBe(target);
    });

    test("$10 - $15 filters", async () => {
        const diet = "None";
        const price = "$10 - $15";
        const location = "Any";
        const target = 1;
        const result = await foodServices.getFoodsByFilters(
            diet,
            price,
            location
        );
        expect(result.length).toBe(target);
    });

    test("$15 - $20 filters", async () => {
        const diet = "None";
        const price = "$15 - $20";
        const location = "Any";
        const target = 1;
        const result = await foodServices.getFoodsByFilters(
            diet,
            price,
            location
        );
        expect(result.length).toBe(target);
    });

    test("location filters", async () => {
        const diet = "None";
        const price = "Any";
        const location = "Vista Grande";
        const target = 4;
        const result = await foodServices.getFoodsByFilters(
            diet,
            price,
            location
        );
        expect(result.length).toBe(target);
    });

    test("location filters", async () => {
        const diet = "None";
        const price = "Any";
        const location = "Poly Canyon Village";
        const target = 0;
        const result = await foodServices.getFoodsByFilters(
            diet,
            price,
            location
        );
        expect(result.length).toBe(target);
    });
});
