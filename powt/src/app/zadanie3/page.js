"use client"
import { useState } from "react"
export default function strona3(){

    const [theme, setTheme] = useState("bg-pink-500") 

    const color = () =>{
        setTheme(theme == "bg-pink-500" ? "bg-blue-500" : "bg-pink-500")
    }


    return(
        <div className={`h-screen w-full ${theme}`}>

        <button onClick={color}>change color</button>
        </div>
    )
}
