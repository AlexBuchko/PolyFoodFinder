import { useParams } from "react-router-dom"
import React, { useState, useEffect } from "react";
import axios from "axios";


function ReviewDisplay() {
    const params = useParams();
    const  id  = params.id;
    const [reviews, setReviews] = useState({});
    console.log(id);
    getReviewsById();

    useEffect(() => {
        getReviewsById().then((result) => {
            if (result && result.status === 200) {
                console.log("reviews set");
                setReviews(result.data);
            }
        });
    }, []);


    async function getReviewsById() {
        console.log("in get reviews by id");
        console.log("id=" + id);
        try {
            const response = await axios.get(
                `http://localhost:4000/foods/${id}/reviews`,
            );
            console.log("response:");
            console.log(response);
            return response;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    function TableBody(data) {
        console.log(data);
        //const revs = data.foodsData;
        const revs = undefined;
        console.log(revs);
        if(reviews === undefined){
            return <tr> No Reviews Exist For This Item</tr>;
        }
        if (Object.keys(revs).length === 0) {
            return <tr> No Reviews Exist For This Item</tr>;
        }
        const rows = revs.map((review, index) => {
            return (
                <tr key={index}>
                    <td>{review.review}</td>
                </tr>
            );
        });
        return <tbody>{rows}</tbody>;
    }

    console.log(reviews);
    return (
        <div className="scrollable-div">
            <table>
                <TableBody foodsData={reviews}></TableBody>
            </table>
        </div> 
    );
}

export default ReviewDisplay;
