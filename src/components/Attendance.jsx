import React from "react";
import "../css/attendence.css";
import { useState } from "react";

export default function Attendance(){

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [inTime, setInTime] = useState("");

    return(
        <div>
            <h1 style={{textAlign: "center"}}>Student Attendance System 👨‍🎓👩‍🎓</h1>
            <div style={{position: "fixed", bottom: "0", background: "black", paddingLeft: "100%", paddingRight: "100%", paddingTop: "40px", margin: "auto", borderTop: "2px solid white"}}></div>
            <div style={{position: "fixed", color: "white", bottom: "10px", left: "20px", right: "20px"}}>Total number of students in the class currently are : </div>
            <div style={{marginLeft: "25px", marginBottom: "25px"}}>
                <form>
                    <label style={{fontWeight: "bolder", fontSize: "20px"}}>Enter student name : 
                        <input type="text" value={name} onChange={(e)=>(setName(e.target.value))} style={{height: "25px", marginLeft: "20px", fontSize: "15px"}}/>
                    </label>
                    <label style={{fontWeight: "bolder", fontSize: "20px", display: "block", marginTop: "10px"}}>Enter student rollno :
                        <input type="text" value={id} onChange={(e)=>(setId(e.target.value))} style={{height: "25px", marginLeft: "16px", fontSize: "15px"}}/>
                    </label>
                    <label style={{fontWeight: "bolder", fontSize: "20px", display: "block", marginTop: "10px"}}>Enter checkin time :
                        <input type="text" value={inTime} onChange={(e)=>(setInTime(e.target.value))} style={{height: "25px", marginLeft: "30px", fontSize: "15px"}}></input>
                    </label>
                </form>   
            </div>
        </div>           
    )
}