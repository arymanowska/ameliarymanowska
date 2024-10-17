"use client"
import { useState } from "react"
export default function zadanie3(){

    var[licznik, setLicznik] = useState (0)

    function odejmij(){
        setLicznik(licznik == 0 ? licznik = 0 : licznik - 1)
    }

    function dodaj(){
        setLicznik(licznik == 5 ? licznik = 5 : licznik + 1)
    }


    return(
        <div className="flex justify-center gap-5 w-screen">
        <button onClick={dodaj}>dodaj</button>
        <button onClick={odejmij}>odejmij</button>
        <h1>{licznik}</h1>
        </div>
    )
}