import React from "react";
import { useState } from "react";
import { useStateContext } from "../ContextProvider/ContextProvider";

export default function SingleStudentPresent({ index, name, rollno, checkin }) {
  const [checkout, setCheckOut] = useState("");
  const {setLocalError, setStudentsPresent, studentsPresent, setLeftStrength, leftStrength} = useStateContext();

  function deleteFun(name, rollno, checkin, checkout){
    if(checkout === ""){
        setLocalError(true);
    }
    else{
        setStudentsPresent(studentsPresent.filter(item => item.rollno!==rollno));
        setLeftStrength([...leftStrength, {name: name, rollno: rollno, checkin: checkin, checkout: checkout}]);
    }    
}

  return (
    <tr className="mainRow">
      <td style={{ fontSize: "large" }}>{index + 1}</td>
      <td style={{ fontSize: "large" }}>{name}</td>
      <td style={{ fontSize: "large" }}>{rollno}</td>
      <td style={{ fontSize: "large" }}>{checkin}</td>
      <td>
        <p
          style={{
            cursor: "pointer",
            display: "inline-block",
            fontSize: "larger",
          }}
          title="Current time"
        >
          ⌚
        </p>
        <input
          style={{ display: "inline" }}
          type="text"
          onChange={(e) => (
            setCheckOut(e.target.value), setLocalError(false)
          )}
          value={checkout}
          placeholder="Checkout time"
        />
        <p
          onClick={() =>
            deleteFun(name, rollno, checkin, checkout)
          }
          style={{
            cursor: "pointer",
            display: "inline-block",
            fontSize: "larger",
          }}
        >
          ⏭️
        </p>
      </td>
    </tr>
  );
}
