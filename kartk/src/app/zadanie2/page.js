"use client"
import { useState } from "react"
export default function zadanie2(){

    const [items, setItems] = useState([""])
    const [input, setInput] = useState("")

    const addList = () =>{
        setItems([...items, input])
        console.log(...items)
        setInput("")
    }

    return(
        <div>
            <input className="bg-black" type="text" value={input} onChange={(e) => setInput(e.target.value)}></input>
            <button onClick={addList}>dodaj</button>
            <ul>
                {
                    items.map((item, idx) => <li key={idx}>{item}</li>)
                }
            </ul>
        </div>
    )
}