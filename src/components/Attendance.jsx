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
    const [checkout, setCheckOut] = useState("");
    const [leftStrength, setLeftStrength] = useState(0);
    const [leftStrengthLength, setLeftStrengthLength] = useState(0);
    const [localError, setLocalError] = useState(false);

    useEffect(()=>{
        setCurrentStrength(studentsPresent.length);
    }, [studentsPresent]);

    useEffect(()=>{
        setLeftStrengthLength(leftStrength.length)
    }, [leftStrength]);



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

    function deleteFun(name, rollno, id, checkin, checkout){
        if(checkout === ""){
            setLocalError(true);
        }
        else{
            setStudentsPresent(studentsPresent.filter(item => item.rollno!==rollno));
            setLeftStrength([...leftStrength, {name: name, rollno: rollno, id: id, checkin: checkin, checkout: checkout}]);
        }    
    }

    return(
        <div>
            <h1 style={{textAlign: "center"}}>Student Attendance System 👨‍🎓👩‍🎓</h1>
            <div style={{marginLeft: "25px", marginBottom: "80px"}}>
                <form>
                    <label style={{fontSize: "20px"}}>Enter student name 🏫 : 
                        <input type="text" value={name} onChange={(e)=>(setName(e.target.value), setError(false))} style={{height: "25px", marginLeft: "20px", fontSize: "15px"}} required/>
                    </label>
                    <label style={{fontSize: "20px", display: "block", marginTop: "10px"}}>Enter student rollno 🔢 :
                        <input type="text" value={id} onChange={(e)=>(setId(e.target.value), setError(false), setExist(false))} style={{height: "25px", marginLeft: "20px", fontSize: "15px"}} required/>
                    </label>
                    <label style={{fontSize: "20px", display: "block", marginTop: "10px"}}>Enter checkin time ⌛ :
                        <input type="text" value={inTime} onChange={(e)=>(setInTime(e.target.value), setError(false))} style={{height: "25px", marginLeft: "20px", fontSize: "15px"}} required></input>
                    </label>
                    {error && <p style={{color: "red", fontWeight: "bold", marginBottom: "-5px"}}>* All fields are required</p>}
                    {exist && <p style={{color: "red", fontWeight: "bold", marginBottom: "-5px"}}>* Student is alreay present</p>}
                    <input type="submit" style={{background: "green", color: "white", fontSize: "15px", marginTop: "20px", padding: "10px", borderRadius: "10px"}} onClick={(e)=>(submitFun(e))}/>
                </form> 
                <div>
                    <h2>List of currently present students</h2>
                    {studentsPresent.length > 0 && <table className="mainTable">
                    {studentsPresent.map((key, index)=>(
                        <tr className="mainRow">
                            <td style={{fontSize: "large"}}>{index}</td>
                            <td style={{fontSize: "large"}}>{key.name}</td>
                            <td style={{fontSize: "large"}}>{key.rollno}</td>
                            <td style={{fontSize: "large"}}>{key.checkin}</td>
                            <td>
                            <p style={{cursor: "pointer", display: "inline-block", fontSize: "larger"}} title="Enter checkout time">⌚</p>
                                <input style={{display: "inline"}} type="text" value={checkout} onChange={(e)=>(setCheckOut(e.target.value), setLocalError(false))} placeholder="Checkout time"/>
                            <p  onClick={()=>(deleteFun(key.name, key.rollno, key.id, key.checkin, key.checkout))} style={{cursor: "pointer", display: "inline-block", fontSize: "larger"}}>⏭️</p>
                            </td>
                        </tr>
                    ))}
                    </table>}
                    {localError && <p style={{color: "red"}}>Oops ! Please enter checkout time as well.</p>}
                </div>  
            </div>
            <div style={{position: "fixed", bottom: "0", background: "#80DOC7", paddingLeft: "100%", paddingRight: "100%", paddingTop: "60px", marginTop: "10px"}}></div>
            <div style={{position: "fixed", color: "red", bottom: "10px", left: "20px", right: "20px", fontWeight: "bolder", fontSize: "larger"}}>Total number of students in the class currently are : {currentStrength}</div>
        </div>           
    )
}