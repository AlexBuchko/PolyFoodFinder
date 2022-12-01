import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./reviews.css";
import axios from "axios";
import ReviewDisplay from "./ReviewDisplay";

export default function Reviews(props) {
    let { food, setFood } = props;
    const [lFlag, setLFlag] = useState("False");
    const [dFlag, setDFlag] = useState("False");
    const [pFlag, setPFlag] = useState("False");
    const [rFlag, setRFlag] = useState("False");
    const [reviews, setReviews] = useState({});
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        getReviewsById().then((result) => {
            if (result && result.status === 200) {
                setReviews(result.data);
            }
        });
        /* eslint-disable */
    }, []);
    /* eslint-enable */

    const handleClick = async (type) => {
        //check for spam protection - dont allow an action to go through on a button that has already been clicked.
        if (
            (type === "likes" && lFlag === "True") ||
            (type === "dislikes" && dFlag === "True") ||
            (type === "poisonings" && pFlag === "True")
        ) {
            alert("Cannot Add Aother Review");
        } else {
            try {
                const response = await axios.put(
                    `http://localhost:4000/foods/${food._id}/${type}`
                );

                if (response && response.status === 200) {
                    const newVal = food[type] + 1;

                    if (type === "likes") {
                        if (dFlag === "False") {
                            setLFlag("True");
                            setFood({
                                ...food,
                                likes: newVal,
                            });
                        } else {
                            alert("Cannot like and dislike the same item.");
                        }
                    } else if (type === "dislikes") {
                        if (lFlag === "False") {
                            setDFlag("True");
                            setFood({
                                ...food,
                                dislikes: newVal,
                            });
                        } else {
                            alert("Cannot like and dislike the same item.");
                        }
                    } else {
                        setPFlag("True");
                        setFood({
                            ...food,
                            poisonings: newVal,
                        });
                    }
                }
            } catch (error) {
                //We're not handling errors. Just logging into the console.
                console.error(error);
            }
        }
    };

    async function getReviewsById() {
        try {
            const response = await axios.get(
                `http://localhost:4000/foods/${id}/reviews`
            );
            setReviews(reviews);
            return response;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (rFlag === "True") {
            alert("Cannot Add Another Review");
        } else {
            const review = document.getElementById("reviewInputField").value;
            setRFlag("True");
            console.log("sending reivew", review);
            try {
                await axios.post(
                    `http://localhost:4000/foods/${food._id}/reviews`,
                    { review }
                );
                //updating local state
                const temp = reviews.reviews;
                temp.push({ review: review });
                setReviews({ reviews: temp });
            } catch (error) {
                console.log(error);
            }
        }
    };

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
            <h3>Reviews</h3>
            <div className="scrollable-div">
                <ReviewDisplay reviews={reviews}></ReviewDisplay>
            </div>
            <h3>Ratings</h3>
            <div className="buttons-wrapper">
                <button
                    className="like-button"
                    onClick={() => handleClick("likes")}
                >
                    Like
                </button>
                <button
                    className="dislike-button"
                    onClick={() => handleClick("dislikes")}
                >
                    Dislike
                </button>
                <button
                    className="poison-button"
                    onClick={() => handleClick("poisonings")}
                >
                    This gave me food poisoning
                </button>
            </div>
            <p>{getReviewsMessage(food)}</p>
            <p>{`${food.poisonings} ${
                food.poisonings !== 1 ? "people" : "person"
            } reported having food poisoning after eating this`}</p>
            <form>
                <h5>
                    <label className="review-header">Leave a review</label>
                </h5>
                <textarea id="reviewInputField" rows="4" cols="50"></textarea>
                <br />
                <input
                    type="submit"
                    value="Submit"
                    className="submit-button"
                    onClick={(event) => {
                        handleSubmit(event);
                    }}
                />
            </form>
        </div>
    );
}
