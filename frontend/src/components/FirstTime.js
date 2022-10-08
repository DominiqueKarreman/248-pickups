import React from "react";
import { useRef, useEffect, useState } from "react";

import reactDOM from "react-dom";
import Modal from "./Modal.js";
import "../index.css";
import "../first.css";
import "../modal.css";

export default function FirstTime() {
  const myRef = useRef();
  const [visible, setVisible] = useState("not loaded");
  const [modalState, setModalState] = useState("Modal");
  const [modalMessage, setModalMessage] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [number, setNumber] = useState("");
  const [adres, setAdres] = useState("");
  const [message, setMessage] = useState("Schrijf je in");
  const [messageClass, setMessageClass] = useState("submit");
  console.log(visible, "visible");

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }


  async function cleanPage() {
    await timeout(2000);
    setMessageClass("submit");
    setMessage("Schrijf je in");
    setFirst_name("");
    setLast_name("");
    setNumber("");
    setAdres("");
  }

  async function regexCheck() {
    console.log({
      first_name: first_name,
      last_name: last_name,
      number: number,
      adres: adres,
    });
    // regex that checks if the input contains only letters and is longer than 2 characters
    const regex = /^[a-zA-Z]{2,}$/;
    // check if first_name is valid
    // regex that checks if the input contains only numbers and + and is between 10 and 12 characters long

    // check if number is valid
    
    
    let errors = []; 
    if(adres.length < 2) {
      errors.push("adres moet minimaal 2 tekens bevatten")
    }
    if(number.length <= 10 || number.length >= 12){
      console.log(number)
      errors.push("nummer moet tussen de 10 en 12 karakters lang zijn");
    }
    if (regex.test(first_name) === false) {
      errors.push(
        "Voornaam moet minimaal 2 letters bevatten en mag alleen uit letters bestaan"
      );
    }
    // check if last_name is valid
    if (regex.test(last_name) === false) {
      errors.push("Achternaam moet minimaal 2 letters bevatten en mag alleen uit letters bestaan");
    }

    let errorText;
    if(errors.length > 0 ){

      errorText = errors.join(", \n");
      if (errorText.length > 0) {
      setModalState("showModal");
      setModalMessage(errorText);
      await timeout(3000);
      setModalState("Modal");
      errors = []
      let returner = "errors"
      return returner
    }
    }
    let valid = "valid"
    return valid
  }
  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     const entry = entries[0];
  //     setVisible(entry.isIntersecting);

  //     console.log(entry.isIntersecting, "entry.isintersecting");
  //     console.log(entry, "entry");
  //   });
  //   console.log(myRef.current, "myRef");
  //   observer.observe(myRef.current);
  // }, []);

  async function postFirst() {
    console.log("postFirst");
    let numberOfErrors = await regexCheck();
    if(numberOfErrors !== "valid"){
      console.log(numberOfErrors)
      return
    }
    console.log("hij gaat ");
    let check = `Successfully added ${first_name} ${last_name}`;
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
          setMessage(data.message);
          setMessageClass("success");

          cleanPage();
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
        <input
          className="inpText"
          id="address"
          name="address"
          type="text"
          value={adres}
          onChange={(event) => setAdres(event.target.value)}
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
      <Modal state={modalState} message={modalMessage} />
    </div>
  );
}
