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
        neighborhood: { type: String },
        phone_number: { type: String },
    },
    { collection: "restaurants" }
);

// const restaurants = mongoose.model('restaurants', restaurantSchema);

module.exports = restaurantSchema;
