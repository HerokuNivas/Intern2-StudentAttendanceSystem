import React from "react";
import "../css/attendence.css";
import { useState } from "react";
import { useEffect } from "react";
import { useStateContext } from "../ContextProvider/ContextProvider";
import SingleStudentPresent from "./SingleStudentPresent";


export default function Attendance(){

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [inTime, setInTime] = useState("");
    const [error, setError] = useState(false);
    const [exist, setExist] = useState(false);
    const [inPresent, setInPresent] = useState(false);
    const [search, setSearch] = useState("");
    const [matchedPresent, setMatchedPresent] = useState([]);
    const [matchedLeft, setMatchedLeft] = useState([]);

    const {studentsPresent, setStudentsPresent, currentStrength, setCurrentStrength, leftStrength, setLeftStrength, leftStrengthLength, setLeftStrengthLength, localError, setLocalError} = useStateContext();

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
            if(studentsPresent.find(item => item.rollno === id) === undefined && leftStrength.find(item => item.rollno === id) === undefined){
                setStudentsPresent([...studentsPresent, {name: name, rollno: id, checkin: inTime, checout: ""}]);
            }
            else{
                setExist(true);
            }
            setName("");
            setId("");
            setInTime("");
        }
    }

    function searchMatched(){
        const tempMatched = [];
        studentsPresent.map((key) => {
            if(key.rollno.includes(search)){
                tempMatched.push(key);
            }
        });
        setMatchedPresent(tempMatched);
    }

    function searchMatchedLeft(){
        const tempMatched = [];
        leftStrength.map((key) => {
            if(key.rollno.includes(search)){
                tempMatched.push(key);
            }
        });
        setMatchedLeft(tempMatched);
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
                    {error && <p style={{color: "red", fontWeight: "bold", marginBottom: "-5px"}}>* All fields are required.</p>}
                    {exist && <p style={{color: "red", fontWeight: "bold", marginBottom: "-5px"}}>* Student is alreay present or left.</p>}
                    <p style={{color: "blue", textDecoration: "underline", fontWeight: "bold", marginBottom: "-10px", cursor: "pointer"}} onClick={()=>(setInTime(new Date().toLocaleTimeString()))}>Click here to enter the current time.</p>
                    <input type="submit" style={{background: "green", color: "white", fontSize: "15px", marginTop: "20px", padding: "10px", borderRadius: "10px"}} onClick={(e)=>(submitFun(e))}/>
                </form> 
                {!inPresent && <div>
                    <h2>List of currently present students</h2>
                    <input type="text" placeholder="search by rollno" style={{height: "25px", marginBottom: "10px"}} onChange={(e)=>(setSearch(e.target.value), searchMatched())}/>
                    {studentsPresent.length > 0 && search==="" && <table className="mainTable">
                    {search==="" && studentsPresent.map((key, index)=>(
                        <SingleStudentPresent index={index} name={key.name} rollno={key.rollno} checkin={key.checkin}/>
                    ))}
                    </table>}
                    {localError && search === "" && <p style={{color: "red"}}>Oops ! Please enter checkout time as well.</p>}
                    {search==="" && <p style={{color: "blue", textDecoration: "underline", cursor: "pointer"}} onClick={()=>(setInPresent(true))}>Click here to open list of left students.</p>}
                    {matchedPresent.length===0 && search!=="" && <p style={{color: "red"}}>No results found</p>}
                    {matchedPresent.length>0 && search!=="" && <table className="mainTable">
                        {matchedPresent.map((key,index)=>(<SingleStudentPresent index={index} name={key.name} rollno={key.rollno} checkin={key.checkin}/>))}      
                        </table>}
                </div>  }

                {inPresent && <div>
                    <h2>List of left students</h2>
                    <input type="text" placeholder="search by rollno" style={{height: "25px", marginBottom: "10px"}} onChange={(e)=>(setSearch(e.target.value), searchMatchedLeft())}/>
                    {leftStrength.length > 0 && search==="" && <table className="mainTable">
                    {search==="" && leftStrength.map((key, index)=>(
                        <tr className="mainRow">
                            <td style={{fontSize: "large"}}>{index+1}</td>
                            <td style={{fontSize: "large"}}>{key.name}</td>
                            <td style={{fontSize: "large"}}>{key.rollno}</td>
                            <td style={{fontSize: "large"}}>{key.checkin}</td>
                            <td style={{fontSize: "large"}}>{key.checkout}</td>
                        </tr>
                    ))}
                    </table>}
                    {localError && search==="" && <p style={{color: "red"}}>Oops ! Please enter checkout time as well.</p>}
                    {search==="" && <p style={{color: "blue", textDecoration: "underline", cursor: "pointer"}} onClick={()=>(setInPresent(false))}>Click here to open list of present students.</p>}
                    {matchedLeft.length===0 && search!=="" && <p style={{color: "red"}}>No results found</p>}
                    {matchedLeft.length>0 && search!=="" && <table className="mainTable">
                        {
                            matchedLeft.map((key, index)=>(
                                <tr className="mainRow">
                                    <td style={{fontSize: "large"}}>{index+1}</td>
                                    <td style={{fontSize: "large"}}>{key.name}</td>
                                    <td style={{fontSize: "large"}}>{key.rollno}</td>
                                    <td style={{fontSize: "large"}}>{key.checkin}</td>
                                    <td style={{fontSize: "large"}}>{key.checkout}</td>
                                </tr>
                            ))
                        }      
                        </table>}
                </div>  }

            </div>

            {!inPresent && <div style={{position: "fixed", bottom: "0", background: "#13b3a0", paddingLeft: "100%", paddingRight: "100%", paddingTop: "60px", marginTop: "10px", borderTop: "1px solid white"}}></div>}
            {!inPresent && <div style={{position: "fixed", color: "black", bottom: "10px", left: "20px", right: "20px", fontWeight: "bolder", fontSize: "larger"}}>Total number of students in the class currently are : {currentStrength}</div>}

            
            
            {inPresent && <div style={{position: "fixed", bottom: "0", background: "#13b3a0", paddingLeft: "100%", paddingRight: "100%", paddingTop: "60px", marginTop: "10px", borderTop: "1px solid white"}}></div>}
            {inPresent && <div style={{position: "fixed", color: "black", bottom: "10px", left: "20px", right: "20px", fontWeight: "bolder", fontSize: "larger"}}>Total number of students left from class : {leftStrengthLength}</div>}
            
        </div>           
    )
}