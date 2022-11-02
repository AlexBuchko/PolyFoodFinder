import React from 'react';

function TableHeader() {
  return (
    <thead>
      <tr>
        <th> Name</th>
        <th> Resturant </th>
        <th> Price </th>
        <th> More Info </th>
      </tr>
    </thead>
  );
}

function TableBody (props) {
  console.log("props");
  console.log(props.foodsData.foods);
  if(!props.foodsData.foods){
    return
  }
  const rows = props.foodsData.foods.map((row, index) => {
    var priceStr = row.price;
    if(!priceStr){
      priceStr = "No Price Given"
    }
    else{
      priceStr = "$" + priceStr
    }
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.restaurant}</td>
	      <td>{priceStr}</td>
        <td>
        <button>More Info</button>
        </td>
      </tr>
    );
  });
  return (
      <tbody>
         {rows}
      </tbody>
   );
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
