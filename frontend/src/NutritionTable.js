import React from "react";

export default function NutritionTable(props) {
    const { nutritionInfo } = props;
    let rows = [];
    for (const key in nutritionInfo) {
        rows.push(
            <tr>
                <td>{key}</td>
                <td>{nutritionInfo[key]}</td>
            </tr>
        );
    }
    return (
        <table>
            <tbody>{rows}</tbody>
        </table>
    );
}
