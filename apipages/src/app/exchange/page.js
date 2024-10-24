"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
export default function Page(){
    const [data, setData] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const response = await fetch("https://api.exchangeratesapi.io/v1/latest?access_key=cbd073bbc4d739b9d8536b30c755f112") 
            const dataJson = await response.json()
            setData(dataJson[0])
            console.log(dataJson)
        }
        getData()
    }, [])


    return(
        <div className="flex flex-wrap items-center gap-5 p-5">
            {data && data.map((item, idx) => {
                <div key={idx}>
                    {
                        item.rates
                    }
                    <h1>{item}</h1>
                </div>
            })}
        </div>
    )

}