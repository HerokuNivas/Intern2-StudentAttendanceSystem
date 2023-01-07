import React, {useContext} from "react";
import { createContext } from "react";
import { useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({children}) => {
    const [studentsPresent, setStudentsPresent] = useState([]);
    const [currentStrength, setCurrentStrength] = useState(0);
    const [leftStrength, setLeftStrength] = useState([]);
    const [leftStrengthLength, setLeftStrengthLength] = useState(0);
    const [localError, setLocalError] = useState(false);

    return(
        <StateContext.Provider
            value = {{
                studentsPresent,
                setStudentsPresent,
                currentStrength,
                setCurrentStrength,
                leftStrength,
                setLeftStrength,
                leftStrengthLength,
                setLeftStrengthLength,
                localError,
                setLocalError
            }}
        >
            {children}
        </StateContext.Provider>    
    )
}

export const useStateContext = () => useContext(StateContext);