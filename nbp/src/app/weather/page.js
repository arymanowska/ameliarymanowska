"use client"
import { useState, useEffect } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  
export default function Weather() {
    const [dzis, setDzis] = useState(null)
    const [data, setData] = useState(null)
    const [data2, setData2] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=52.237049&lon=21.017532&appid=fed27fe200b62ba49c94ac1b95169046&units=metric") 
            const dataJson = await response.json()
            setData(dataJson)
            console.log(dataJson)
        }
        getData()
    }, [])

    useEffect(() => {
        const getData = async () => {
            const response = await fetch("https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=52.237049&lon=21.017532&cnt=4&appid=fed27fe200b62ba49c94ac1b95169046&units=metric") 
            const dataJson = await response.json()
            setData2(dataJson)
            console.log(dataJson)
        }
        getData()
    }, [])


    if (!data) return null; 

    return (
        <>
        <div>
            <Card>
  <CardHeader>
    <CardTitle>temperatura: {dzis.main.temp}</CardTitle>
    <CardDescription></CardDescription>
  </CardHeader>
  <CardContent></CardContent>
  <CardFooter></CardFooter>
</Card>

            </div>

            <div>
{
    setData2 && setData2.list.map((weather, idx) =>
    
            <Card key={idx}>
  <CardHeader>
    <CardTitle>temperatura: {dzis.main.temp}°C</CardTitle>
    <CardDescription></CardDescription>
  </CardHeader>
  <CardContent></CardContent>
  <CardFooter></CardFooter>
</Card>

)}
            </div>
        </>

    );

}