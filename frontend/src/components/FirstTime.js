import React from "react";
import { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import reactDOM from "react-dom";

import "../index.css";
import "../first.css";

export default function FirstTime() {
  const myRef = useRef();
  const [visible, setVisible] = useState("not loaded");

  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [number, setNumber] = useState("");
  const [adres, setAdres] = useState("");
  const [message, setMessage] = useState("Schrijf je in");
  const [messageClass, setMessageClass] = useState("submit");
  console.log(visible, "visible");

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

   async function cleanPage() {
        await timeout(2000)
        setMessageClass("submit");
        setMessage("Schrijf je in");
        setFirst_name("");
        setLast_name("");
        setNumber("");
        setAdres("");
    }
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setVisible(entry.isIntersecting);

      console.log(entry.isIntersecting, "entry.isintersecting");
      console.log(entry, "entry");
    });
    console.log(myRef.current, "myRef");
    observer.observe(myRef.current);
  }, []);

  function postFirst() {
    console.log("postFirst");
    let check = `Successfully added ${first_name} ${last_name}`
    fetch("http://localhost:5000/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        phone_number: number,
        address: adres,
       
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message, "data.message");
        console.log(check, " check");
        if (data.message === check) {
          setMessage(data.message)
          setMessageClass("success")
           
           cleanPage()
          
        }


        
      });
  }

  return (
    <div className="FirstTime">
      <h1 ref={myRef} id="card">
        First Time
      </h1>
        <div className="form">
        <label className="label" htmlFor="first_name">
          Voornaam:
        </label>
        <input
          className="inpText"
          id="first_name"
          name="first_name"
          type="text"
          onChange={(event) => setFirst_name(event.target.value)}
          value={first_name}
        />

        <label className="label" htmlFor="last_name">
          Achternaam:
        </label>
        <input
          className="inpText"
          id="last_name"
          name="last_name"
          type="text"
          onChange={(event) => setLast_name(event.target.value)}
          value={last_name}
        />

        <label className="label" htmlFor="phone_number">
          Nummer:
        </label>
        <input
          className="inpText"
          id="phone_number"
          name="phone_number"
          type="text"
          onChange={(event) => setNumber(event.target.value)}
          value={number}
        />

        <label className="label" htmlFor="address">
          Adres:
        </label>
        <input className="inpText" id="address" name="address" type="text" value={adres} onChange={event => setAdres(event.target.value)}
         />
        <input
          className={messageClass}        
          onClick={postFirst}
          type="submit"
          name="submit"
          id="submit"
          value={message}
          
        />
      </div>

      
    </div>
  );
}
