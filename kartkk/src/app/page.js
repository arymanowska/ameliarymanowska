"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Page() {


const[badge, setBadge] = useState("")
const[style, setStyle] = useState()

  function start(){
    setBadge("start")
    setStyle("deafult")
  }

  function stop(){
    setBadge("stop")
    setStyle("destructive")
  }


  return (
    <div className="flex flex-wrap justify-center items-center mt-40">

    <Badge variant={style} className={"w-20 h-10 mr-5"}>{badge}</Badge>
    
    <div className="flex flex-wrap justify-center items-center">
    <Button onClick={start} className={"w-20 h-10 mr-5"}>Start</Button>
    <Button onClick={stop} className={"w-20 h-10 mr-5"}>Stop</Button>
    </div>
    
    </div>
    
    
    
  );
}
