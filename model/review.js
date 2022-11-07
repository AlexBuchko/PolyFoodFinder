const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        review: {
            type: String,
            required: true,
            trim: true,
        },
        food_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'foods',
        }
    },
    { collection: "reviews" }
);

// const review = mongoose.model('reviews', reviewSchema);

module.exports = reviewSchema;