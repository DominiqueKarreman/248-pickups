import React from "react";
import PlayerBar from "../components/PlayerBar";
import "../playerbar.css";
import FlatList from "flatlist-react";
import { useState, useEffect } from "react";
import DateBar from "../components/DateBar";
export default function Spelers() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  console.log(search);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/overzicht")
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        setData(data);
      });
  }, []);
  let months = [];
  const players = data.map((date) => {
    let maand = date.date.split("/")[1];
    let huidigeMaand
    if (!months.includes(maand)) {
      months.push(maand);
      switch(maand){
        case "01":
            huidigeMaand = "Januari"
            break;
        case "02":
            huidigeMaand = "Februari"
            break;
        case "03":
            huidigeMaand = "Maart"
            break;
        case "04":
            huidigeMaand = "April"
            break;
        case "05":
            huidigeMaand = "Mei"
            break;
        case "06":
            huidigeMaand = "Juni"
            break;
        case "07":
            huidigeMaand = "Juli"
            break;
        case "08":
            huidigeMaand = "Augustus"
            break;
        case "09":
            huidigeMaand = "September"
            break;
        case "10":
            huidigeMaand = "Oktober"
            break;
        case "11":
            huidigeMaand = "November"
            break;
        case "12":
            huidigeMaand = "December"
            break;
        default:
            huidigeMaand = "Geen maand"
      }
      if (date.date.toLowerCase().includes(search)) {
        return (<>
            <h1 className={"month"}>{huidigeMaand}</h1>
          <DateBar date={date.date} count={`Aantal spelers: (${date.count})`} />
        </>
        );
    }}
    console.log(months)
    console.log(maand, "maand");
    if (date.date.toLowerCase().includes(search)) {
      return (
        <DateBar date={date.date} count={`Aantal spelers: (${date.count})`} />
      );
    } else {
      return null;
    }
  });

  let dataSize = data.length;
  let searchArray = [];

  return (
    <div id={"playersPage"}>
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder={"Zoek datum"}
        type={"search"}
        className={"search"}
      />
      <h1
        style={{
          "margin-top": "-5vh",
          "text-align": "right",
          "margin-right": "16vw",
          "font-size": "1.5rem",
        }}
      >
        {dataSize} pickups Totaal
      </h1>
      <div className={"playerdiv"}>{players}</div>
    </div>
  );
}
