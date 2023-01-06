import React from "react";
import "../css/attendence.css";
import { useState } from "react";
import { useEffect } from "react";

export default function Attendance(){

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [inTime, setInTime] = useState("");
    const [error, setError] = useState(false);
    const [exist, setExist] = useState(false);
    const [studentsPresent, setStudentsPresent] = useState([]);
    const [currentStrength, setCurrentStrength] = useState(0);

    useEffect(()=>{
        setCurrentStrength(studentsPresent.length);
    }, [studentsPresent]);



    function submitFun(e){
        e.preventDefault();
        if(name === "" || id === "" || inTime === ""){
            setError(true);
            return;
        }
        else{
            if(studentsPresent === undefined || studentsPresent.find(item => item.rollno === id) === undefined){
                setStudentsPresent([...studentsPresent, {name: name, rollno: id, checkin: inTime, checout: null}]);
            }
            else{
                setExist(true);
            }
        }
    }

    return(
        <div>
            <h1 style={{textAlign: "center"}}>Student Attendance System 👨‍🎓👩‍🎓</h1>
            <div style={{position: "fixed", bottom: "0", background: "black", paddingLeft: "100%", paddingRight: "100%", paddingTop: "60px", borderTop: "2px solid white"}}></div>
            <div style={{position: "fixed", color: "white", bottom: "10px", left: "20px", right: "20px"}}>Total number of students in the class currently are : {currentStrength}</div>
            <div style={{marginLeft: "25px", marginBottom: "25px"}}>
                <form>
                    <label style={{fontWeight: "bolder", fontSize: "20px"}}>Enter student name : 
                        <input type="text" value={name} onChange={(e)=>(setName(e.target.value), setError(false))} style={{height: "25px", marginLeft: "20px", fontSize: "15px"}} required/>
                    </label>
                    <label style={{fontWeight: "bolder", fontSize: "20px", display: "block", marginTop: "10px"}}>Enter student rollno :
                        <input type="text" value={id} onChange={(e)=>(setId(e.target.value), setError(false), setExist(false))} style={{height: "25px", marginLeft: "20px", fontSize: "15px"}} required/>
                    </label>
                    <label style={{fontWeight: "bolder", fontSize: "20px", display: "block", marginTop: "10px"}}>Enter checkin time :
                        <input type="text" value={inTime} onChange={(e)=>(setInTime(e.target.value), setError(false))} style={{height: "25px", marginLeft: "20px", fontSize: "15px"}} required></input>
                    </label>
                    {error && <p style={{color: "red", fontWeight: "bold", marginBottom: "-5px"}}>* All fields are required</p>}
                    {exist && <p style={{color: "red", fontWeight: "bold", marginBottom: "-5px"}}>* Student is alreay present</p>}
                    <input type="submit" style={{background: "green", color: "white", fontSize: "15px", marginTop: "20px", padding: "10px", borderRadius: "10px"}} onClick={(e)=>(submitFun(e))}/>
                </form>   
            </div>
        </div>           
    )
}