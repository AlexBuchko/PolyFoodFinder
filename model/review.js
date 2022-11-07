const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        review: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { collection: "reviews" }
);

// const review = mongoose.model('reviews', reviewSchema);

module.exports = reviewSchema;