import React from "react";

function ReviewDisplay(props) {
    const reviews = props.reviews.reviews;
    //const revs = data.foodsData;
    if (reviews === undefined) {
        return <tr> No Reviews Exist For This Item</tr>;
    }
    if (Object.keys(reviews).length === 0) {
        return <tr> No Reviews Exist For This Item</tr>;
    }
    const rows = reviews.map((review, index) => {
        return (
            <tr key={index}>
                <td>{review.review}</td>
            </tr>
        );
    });
    return (
        <table>
            <tbody>{rows}</tbody>
        </table>
    );
}

export default ReviewDisplay;
