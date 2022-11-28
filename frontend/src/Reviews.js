import React, { useState } from "react";
import "./reviews.css";
import axios from "axios";
import AboutPageHelper from "./AboutPageHelper";
import ReviewDisplay from "./ReviewDisplay";

export default function Reviews(props) {
    console.log("in reviews");
    let { food, setFood } = props;
    const [lFlag, setLFlag] = useState("False");
    const [dFlag, setDFlag] = useState("False");
    const [pFlag, setPFlag] = useState("False");
    const [rFlag, setRFlag] = useState("False");
    const [review, setReview] = useState("");

    const handleClick = async (type) => {
        if((type === "likes" && lFlag === "True") || (type === "dislikes" && dFlag === "True") || (type === "poisonings" && pFlag === "True")){
            alert("Cannot Add Aother Review");
        }
        else{
            try {
                const response = await axios.put(
                    `http://localhost:4000/foods/${food._id}/${type}`
                );

                if (response && response.status === 200) {
                    const newVal = food[type] + 1;

                    if (type === "likes") {
                        setLFlag("True");
                        setFood({
                            ...food,
                            likes: newVal,
                        });
                    } else if (type === "dislikes") {
                        setDFlag("True");
                        setFood({
                            ...food,
                            dislikes: newVal,
                        });
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

    const handleSubmit = async (event) => {
        if(rFlag === "True"){
            alert("Cannot Add Another Review");
            event.preventDefault();
        }
        else {
            setRFlag("True");
            event.preventDefault();
            console.log("sending reivew", review);
            try {
                const result = await axios.post(
                    `http://localhost:4000/foods/${food._id}/reviews`,
                    { review }
                );
            } catch (error) {
                console.log(error);
            }
        }

    };
    const handleChange = (event) => {
        setReview(event.target.value);
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
            <h3>Numerical Reviews</h3>
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
                <p>
                    <label>Leave a review</label>
                </p>
                <textarea
                    rows="4"
                    cols="50"
                    value={review}
                    onChange={(event) => handleChange(event)}
                ></textarea>
                <br />
                <input
                    type="submit"
                    value="Submit"
                    onClick={(event) => {
                        handleSubmit(event);
                    }}
                />
            </form>
        </div>
    );
}
