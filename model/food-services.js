const mongoose = require("mongoose");
const foodSchema = require("./food");
const reviewSchema = require("./review");
const restaurantServices = require("../model/restaurant-services");

let dbConnection;

function setConnection(newConn){
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

async function getFoodsByFilters(diet, price, location) {
    const foodsModel = getDbConnection().model("foods", foodSchema);
    let result;
    const searchParams = [];
    if (diet === "None" && price === "Any" && location === "Any") {
        return await foodsModel.find({ price: { $gte: 0 } });
    } else {
        if (diet === "Vegan") {
            searchParams.push({ vegan: true });
        } else if (diet === "Vegetarian") {
            searchParams.push({ vegetarian: true });
        }
        if (price === "$20+") {
            searchParams.push({ price: { $gt: 20 } });
        } else if (price === "Below $5") {
            searchParams.push({ price: { $lt: 5 } });
        } else if (price === "$5 - $10") {
            searchParams.push({ price: { $gte: 5 } });
            searchParams.push({ price: { $lt: 10 } });
        } else if (price === "$10 - $15") {
            searchParams.push({ price: { $gte: 10 } });
            searchParams.push({ price: { $lt: 15 } });
        } else if (price === "$15 - $20") {
            searchParams.push({ price: { $gte: 16 } });
            searchParams.push({ price: { $lt: 20 } });
        } else {
            searchParams.push({ price: { $gte: 0 } });
        }
        if (location != "Any") {
            validRestNames = await getRestaurantsInFilter(location);
            if (validRestNames.length > 0) {
                searchParams.push({ $or: validRestNames });
            } else {
                //this is just to make it return nothing when the restaurant filter doesn't have any items
                searchParams.push({ restaurant: "no-name-match" });
            }
        }
    }
    //add location stuff here later
    result = await foodsModel.find({ $and: searchParams });
    return result;
}

async function getRestaurantsInFilter(location) {
    restLookupTags = [];
    restNames = await restaurantServices.getRestaurantsByLocation(location);
    for (var i = 0, size = restNames.length; i < size; i++) {
        restLookupTags.push({ restaurant: restNames[i] });
    }
    return restLookupTags;
}

async function findFoodById(id) {
    const foodsModel = getDbConnection().model("foods", foodSchema);
    try {
        return await foodsModel.findById(id);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

// look up findByIdAndUpdate
// set new to true and check test!
async function incrementFoodRating(id, rating) {
    const foodsModel = getDbConnection().model("foods", foodSchema);
    try {
        if (rating == "likes") {
            return await foodsModel.findByIdAndUpdate(id, 
                {$inc: { likes: +1 }},
                {new: true},
            );
        } else if (rating == "dislikes") {
            return await foodsModel.findByIdAndUpdate(id,
                {$inc: { dislikes: +1 }},
                {new: true},
            );
        } else if (rating == "poisonings") {
            return await foodsModel.findByIdAndUpdate(id,
                {$inc: { poisonings: +1 }},
                {new: true},
            );
        }
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function addReview(id, rev) {
    console.log({ id, rev });
    const reviewsModel = getDbConnection().model("reviews", reviewSchema);
    try {
        const reviewToAdd = new reviewsModel({
            review: rev,
            food_id: id,
        });
        const savedReview = await reviewToAdd.save();
        return savedReview;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function getReviews(id) {
    const reviewsModel = getDbConnection().model("reviews", reviewSchema);
    try {
        return await reviewsModel.find({ food_id: id });
    } catch(error) {
        console.log(error);
        return undefined;
    }
    
}

exports.incrementFoodRating = incrementFoodRating;
exports.addReview = addReview;
exports.getReviews = getReviews;
exports.findFoodById = findFoodById;
exports.getFoodsByFilters = getFoodsByFilters;
exports.getDbConnection = getDbConnection;
exports.setConnection = setConnection;
