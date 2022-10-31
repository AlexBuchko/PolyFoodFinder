const express = require('express');
const cors = require('cors');

const foodServices = require('../model/food-services');
const restaurantServices = require('../model/restaurant-services');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// gets all the foods in the db
app.get('/foods', async (req, res) => {
    const foodName = req.query['name'];
    const restName = req.query['restaurant'];
    try {
        const result = await foodServices.getFoods(foodName, restName);
        res.send({ foods: result });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred in the server.');
    }
});

// gets a specific food that matches the given id
app.get('/foods/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await foodServices.findFoodById(id);
    if (result === undefined || result === null)
        res.status(404).send('Resource not found.');
    else {
        res.send({ foods: result });
    }
});

// gets all the restaurants in the db
app.get('/restaurants', async (req, res) => {
    const restName = req.query['name'];
    try {
        const result = await restaurantServices.getRestaurants(restName);
        res.send({ restaurants: result });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred in the server.');
    }
});

// gets a specific restaurant that matches the given id
app.get('/restaurants/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await restaurantServices.findRestaurantById(id);
    if (result === undefined || result === null)
        res.status(404).send('Resource not found.');
    else {
        res.send({ restaurants: result });
    }
});

app.listen(port, () => {
    console.log(`Project app listening at http://localhost:${port}`);
});