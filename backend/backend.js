const express = require('express');
const cors = require('cors');

const foodServices = require('../model/food-services');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// gets all the foods in the db
app.get('/foods', async (req, res) => {
    const foodName = req.query['name'];
    const restName = req.query['restaurant'];
    try {
        const result = await foodServices.getFoods(foodName, restName);
        res.send({foods: result});
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
        res.send({foods: result});
    }
 });

app.listen(port, () => {
    console.log(`Project app listening at http://localhost:${port}`);
});