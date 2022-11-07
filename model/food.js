const mongoose = require("mongoose");
// const reviewSchema = require('./review');

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        restaurant_id: {
            //add ref: "Restaurant" once restauarants are set up
            type: { type: mongoose.Schema.Types.ObjectId, ref: 'restaurants'},
        },
        restaurant: {
            type: String,
            required: true,
            trim: true,
        },
        nutrition: {
            sugar: {
                type: Number,
                required: true,
            },
            protein: {
                type: Number,
                required: true,
            },
            carbohydrates: {
                type: Number,
                required: true,
            },
            fat: {
                type: Number,
                required: true,
            },
            fiber: {
                type: Number,
                required: true,
            },
            sodium: {
                type: Number,
                required: true,
            },
            calories: {
                type: Number,
                required: true,
            },
        },
        ingredients: {
            type: String,
            required: true,
            trim: true,
        },
        vegetarian: {
            type: Boolean,
            required: true,
        },
        vegan: {
            type: Boolean,
            required: true,
        },
        likes: {
            type: Number,
            required: true,
            default: 0,
        },
        dislikes: {
            type: Number,
            required: true,
            default: 0,
        },
        poisonings: {
            type: Number,
            required: true,
            default: 0,
        },
        price: Number,
        review_id: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'reviews' }],
            // type: [reviewSchema],
        },

    },
    { collection: "foods" }
);

// const foods = mongoose.model('foods', foodSchema);

module.exports = foodSchema;
