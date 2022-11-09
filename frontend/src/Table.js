import React from "react";

function TableHeader() {
    return (
        <thead>
            <tr>
                <th> Name</th>
                <th> Resturant </th>
                <th> Price </th>
                <th> Likes </th>
                <th> More Info </th>
            </tr>
        </thead>
    );
}

function TableBody(props) {
    if (!props.foodsData.foods) {
        return;
    }
    if (props.foodsData.foods.length === 0) {
        return <tr> No Items Were Found For This Search</tr>;
    }
    const rows = props.foodsData.foods.map((row, index) => {
        var priceStr = row.price;
        if (!priceStr) {
            priceStr = "No Price Given";
        } else {
            priceStr = "$" + priceStr;
        }
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.restaurant}</td>
                <td>{priceStr}</td>
                <td>{row.likes}</td>
                <td>
                    <button>More Info</button>
                </td>
            </tr>
        );
    });
    return <tbody>{rows}</tbody>;
}

function Table(props) {
    return (
        <table>
            <TableHeader />
            <TableBody foodsData={props.foodsData} />
        </table>
    );
}

export default Table;
