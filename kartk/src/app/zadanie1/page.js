"use client"
import { useState } from "react"
export default function zadanie1(){

    const [theme, setTheme] = useState("bg-pink-500")
    
    function pink(){
        setTheme("bg-pink-500")
    }
    
    function yellow(){
        setTheme("bg-yellow-500")
    }

    return(
        <div className={`flex justify-center h-screen gap-10 ${theme}`}>
            <button onClick={pink}>pink           </button>
            <button onClick={yellow}>yellow         </button>
        </div>
    )

}