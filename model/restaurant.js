const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        hour: {
            Mon: {
                type: String,
                required: true,
            },
            Tue: {
                type: String,
                required: true,
            },
            Wed: {
                type: String,
                required: true,
            },
            Thu: {
                type: String,
                required: true,
            },
            Fri: {
                type: String,
                required: true,
            },
            Sat: {
                type: String,
                required: true,
            },
            Sun: {
                type: String,
                required: true,
            },
        },
        foodId: {
            type: [{ type: mongoose.Schema.Types.ObjectId }],
        },
        neighborhood: {type: String},
    },
    { collection: "restaurants" }
);

module.exports = restaurantSchema;
