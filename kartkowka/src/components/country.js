import Image from 'next/image'
import { useEffect } from "react"

export default function Country({kraj}){


return(
    <div className="border ">
        <Image className='h-[150px] w-[200px]'
        src={kraj.flags.png}
        width={200}
        height={100}
        alt={kraj.name.common}
        />
        <h1>{kraj.name.common}</h1>
    </div>
)
}