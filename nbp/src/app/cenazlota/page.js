"use client"
import { useState, useEffect } from "react"
import {
    Card,
    CardContent,
  } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"

export default function Page() {

    const [data, setData] = useState(null)


        useEffect(() => {
            const getData = async () =>{
                const response = await fetch("https://api.nbp.pl/api/cenyzlota/last/30/?format=json") 
                const dataJson = await response.json()
                setData(data.reverse)
                console.log(dataJson)
 
            }
                getData()
            
        }, [])
            
        {data && data.map((cena, idx) => {
            const pPrice = idx < data.length - 1 ? data[idx + 1].cena : null
            const cPrice = cena.cena

            let arrowIcon = null
            if (pPrice !== null){
                arrowIcon = cPrice > pPrice ? <ArrowUp size={60} color="green"/> : <ArrowDown size={60} color="red"/>
            }
        })}
    return(
    <Card key={idx}>
  <CardContent>
    <div>
        <h1>{cena.cena.tofixed(2)} zł</h1>
        <p>{cena.data}</p>
    </div>
    <div>
        {arrowIcon}
    </div>
    <div>
        {idx == data.length && (cPrice - pPrice).tofixed(2)} zł
    </div>
  </CardContent>
</Card>
        
)
}