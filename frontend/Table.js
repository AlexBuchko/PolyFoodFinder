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
  console.log(props.characterData);
  const rows = props.characterData.map((row, index) => {
    var priceStr = "$" + row.price;
    if(priceStr.length == 3){
      priceStr = priceStr + ".00";
    }
    else{
      priceStr = priceStr + "0";
    }
    return (
      <tr key={index}>
        <td>{row.itemName}</td>
        <td>{row.resturant}</td>
	      <td>{priceStr}</td>
        <td>
        <button onClick={() => props.removeCharacter(index)}>More Info</button>
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
      <TableBody characterData={props.characterData} removeCharacter={props.removeCharacter} />
    </table>
  );
}

export default Table;
