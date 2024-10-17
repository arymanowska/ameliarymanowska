"use client"

import { useState } from "react"

export default function zadanie2(){

    const [status, setStatus] = useState("start")

    function startstop(){

        setStatus(status === "start" ? "stop" : "start" )

    }

    return(
        <div className="flex justify-center gap-5">
            <button className="" onClick={startstop}>zmien status</button>
            <h1>{status}</h1>
        </div>
    )
}