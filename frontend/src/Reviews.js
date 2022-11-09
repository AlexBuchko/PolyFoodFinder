import React from "react";
import "./reviews.css";

export default function Reviews(props) {
    const { food } = props;

    const getReviewsMessage = (food) => {
        const { likes, dislikes } = food;
        let likesMessage;
        const numReviews = likes + dislikes;

        if (numReviews === 0) {
            likesMessage = "There are no reviews yet for this food";
        } else {
            let positivity;
            if (dislikes === 0) {
                positivity = "100%";
            } else {
                const percentage = Math.round((likes / numReviews) * 100);
                positivity = `${percentage}%`;
            }
            likesMessage = `${positivity} positive reviews out of ${numReviews}`;
        }

        return likesMessage;
    };
    return (
        <div>
            <h2>Reviews</h2>
            <div className="buttons-wrapper">
                <button
                    className="like-button"
                    onClick={() => alert("not implemented")}
                >
                    Like
                </button>
                <button
                    className="dislike-button"
                    onClick={() => alert("not implemented")}
                >
                    Dislike
                </button>
                <button
                    className="poison-button"
                    onClick={() => alert("not implemented")}
                >
                    This gave me food poisoning
                </button>
            </div>
            <p>{getReviewsMessage(food)}</p>
            <p>{`${food.poisonings} ${
                food.poisonings !== 1 ? "people" : "person"
            } reported getting a food poisoning after eating this`}</p>
            <form>
                <p>
                    <label>Leave a review</label>
                </p>
                <textarea rows="4" cols="50">
                    What did you think about the food?
                </textarea>
                <br />
                <input
                    type="submit"
                    value="Submit"
                    onClick={() => {
                        alert("Not implemented");
                    }}
                />
            </form>
        </div>
    );
}
