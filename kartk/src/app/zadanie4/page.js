"use client"
import Link from
import { useState, useEffect }
export default function zadanie4(){

    const [data, setData] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        const getData = async() =>
            {
            try{
                const response = await fetch("https://restcountries.com/v3.1/all")
                    const dataJson = await response.json()
                    setData(dataJson)
                    console.log(dataJson)
            }catch(error){  
                console.error("error")
                setError(true)
            }finally{

            }
        }
        getData()
    },[])

    return(
        <div className="">
        <h1>{loading && "pobieranie danych"}</h1>
        <h1>{error && "error"}</h1>
        </div>

    )
}