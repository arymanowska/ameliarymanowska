"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Page(){
    const [data, setData] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const response = await fetch("https://newsapi.org/v2/everything?q=bitcoin&apiKey=4acad791681f4777b331b8ebaa1c16b5") 
            const dataJson = await response.json()
            setData(dataJson)
            console.log(dataJson)
        }
        getData()
    }, [])

    if (!data) return null; 

    return(
        <div className="flex flex-wrap items-center gap-5 p-5">
            {data.articles.map((news, idx) => 
                <div key={idx} className="max-w-sm border w-500">
                    {news.urlToImage &&
                        <div className="mb-5">
                            <Image src={news.urlToImage} width={450} height={300} className="w-full h-auto"/>
                        </div>
                    }
                    <h1 className="text-xl font-bold mb-6">{news.title}</h1>
                    <h3 className="mb-3">{news.publishedAt}</h3>
                    <p className="mb-3">{news.description}</p>
                    <Link href={news.url} className="text-purple-800 hover:underline">MORE</Link>
                </div>
            )}
        </div>
    )

}