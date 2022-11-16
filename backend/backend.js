const express = require("express");
const cors = require("cors");

const foodServices = require("../model/food-services");
const restaurantServices = require("../model/restaurant-services");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// gets all the foods in the db
app.get("/foods", async (req, res) => {
    request = req.query;
    const { diet, location, price } = request;
    try {
        const result = await foodServices.getFoodsByFilters(
            diet,
            price,
            location
        );
        res.send({ foods: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred in the server.");
    }
});

// gets a specific food that matches the given id
app.get("/foods/:id", async (req, res) => {
    const id = req.params["id"];
    const result = await foodServices.findFoodById(id);
    if (result === undefined || result === null)
        res.status(404).send("Resource not found.");
    else {
        res.send({ foods: result });
    }
});

// is there a way we can stop one person from continuously spamming likes/dislikes?
app.put('/foods/:id/:rating', async (req, res) => {
    const id = req.params['id'];
    const rating = req.params['rating'];    // capture if it's a like/dislike/poisoning
    const result = await foodServices.incrementFoodRating(id, rating);
    if (result)
        res.status(200).send("Successfully incremented rating");
    else
        res.status(400).send("Bad Request");
});

app.post('/foods/:id/reviews', async (req, res) => { 
    const review = req.body.review;
    const id = req.params['id'];
    const savedReview = await foodServices.addReview(id, review);
    if (savedReview)
    res.status(201).send(savedReview);
    else
        res.status(500).end();
});

app.get('/foods/:id/reviews', async (req, res) => {
    const id = req.params['id'];
    try {
        const result = await foodServices.getReviews(id);
        res.send({reviews: result});         
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

// gets all the restaurants in the db
app.get("/restaurants", async (req, res) => {
    const restName = req.query["name"];
    try {
        const result = await restaurantServices.getRestaurants(restName);
        res.send({ restaurants: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred in the server.");
    }
});

// gets a specific restaurant that matches the given id
app.get("/restaurants/:id", async (req, res) => {
    const id = req.params["id"];
    const result = await restaurantServices.findRestaurantById(id);
    if (result === undefined || result === null)
        res.status(404).send("Resource not found.");
    else {
        res.send({ restaurants: result });
    }
});

//updating a specific food at an id
//expects an object called "update"in the body of the request to define the update
//IE: query.body = {update: {likes: 5, name: "pumpkin spice pancakes"}}
app.patch("/foods/:id", async (req, res) => {
    const id = req.params["id"];
    const { update } = req.body;
    console.log(req.body);
    const result = await foodServices.updateOne(id, update);
    if (result === undefined || result === null)
        res.status(404).send("Resource not found.");
    else {
        res.send({ food: result });
    }
});

app.listen(port, () => {
    console.log(`Project app listening at http://localhost:${port}`);
});
