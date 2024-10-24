"use client"
import { useState } from "react"
export default function zadanie4(){

    const [bg, setBg] = useState("bg-red-500") 
    const [input, setInput] = useState("")


    const color = () =>{
        setBg(`bg-${input}-500`)
    }


    return(
        <div className={`h-screen w-full ${bg}`}>

        <input className="bg-black" type="text" placeholder="type color" onChange={(e) => setInput(e.target.value)}></input>
        <button onClick={color}>change color</button>
        </div>
    )
}