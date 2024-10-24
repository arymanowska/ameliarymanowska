"use client"

import { useState } from "react"

export default function Zadanie1(){

    const [licznik, setLicznik] = useState(0)
    function dodajlicznik(){
        setLicznik(licznik + 1)
    }

    function odejmijlicznik(){
        setLicznik(licznik - 1)
    }

    return(
        <div className ="flex justify-center border-3 gap-3">
            <button onClick={dodajlicznik}>dodaj</button>
            <button onClick={odejmijlicznik}>dodaj</button>

            <h1>{licznik}</h1>
        </div>
    )
}