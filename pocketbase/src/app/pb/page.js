"use client"
import PocketBase from 'pocketbase';
import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import Image from 'next/image';
  import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { Trash2, Pencil } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import  EditItem  from '@/components/pb/edititem';


export default function pb(){
    const [data, setData] = useState([])
    const [dane, setDane] = useState({nazwa:null, cena:null, opis:null})
    const [zdjecie, setZdjecie] = useState(null)
    

    const form = (e, nazwa)=>{
        setDane((prevDane=>{
            return(
           { ...prevDane, 
            [nazwa]:e.target.value
           }
        )}))
    }


    const handleZdjecie = (e)=>{

        console.log(e)
        setZdjecie(e.target.files[0])

    }

    const zapisz = async ()=>{


        const formdata = new FormData()

        formdata.append('nazwa', dane.nazwa)
        formdata.append('cena', dane.cena)
        formdata.append('opis', dane.opis)
        formdata.append('zdjecie', zdjecie)

        const record = await pb.collection('gry').create(formdata);
        setData((prevData)=>{
            return(
                [ record, ...prevData]
            )
        })
    }


    const pb = new PocketBase('http://172.16.15.156:8080');

    useEffect(()=>{
        const getData = async () =>{

            try{
                // you can also fetch all records at once via getFullList
                const records = await pb.collection('gry').getFullList({
                sort: '-created',
                });
                
                console.log(records);
                setData(records)

            }catch(error){
                console.log(error);
            }




        }
getData();

    },[])

    const delItem = async (id) => {
        console.log(id)

        try{
            await pb.collection('gry').delete(id)

            //aktualizacja stanu po usuniecu
            setData((prev) => ([
                prev.filter(item => {
                    return item.id != id
                })
            ]))
        }catch(error){
            console.log(error)
        }
    }

    const updateItem = (item) => {
        console.log(item)

        var tmpData = [...data]
        var index = null

        for(let i in data){
            if(item.id == tmpData[i].id){
                index = i
            }
        }
        tmpData[index] = item
        setData(tmpData)

        console.log("index: " + index)
    }

    return (
    
        <div className='flex flex-row justify-center flex-wrap   w-full h-[70vh]  gap-10 space-x-10 mt-5'>
     {data && data.map((gra)=> {  
     return(
     <Card key={gra.id} className="w-[300px] h-[400px]">
  <CardHeader>
    <CardTitle>{gra.nazwa}</CardTitle>
    <CardDescription className="text-justify">{gra.opis}</CardDescription>
  </CardHeader>
  <CardContent>
    <Image
    src={pb.files.getUrl(gra, gra.zdjecie )}
    alt={gra.zdjecie}
    width={300}
    height={200}
    
    />
  </CardContent>
  <CardFooter>
    <div className='w-full flex justify-end'>
        <Dialog/>
        <Button variant="ghost">
            <EditItem gra={gra} onupdate={updateItem}/>
        </Button>
        <Button onClick={() => {delItem(gra.id)}} varian="ghost">
            <Trash2 />
        </Button>
    </div>
    Cena: {gra.cena}zł
  </CardFooter>
</Card>
     )}
)}
<div className='flex  w-full h-[30vh] justify-center items-center '>


<Card className="w-[500px] p-5 gap-3">
    <CardTitle>Dodaj grę!</CardTitle>
      <Label htmlFor="email">Nazwa</Label>
      <Input onChange={(e)=>{form(e, "nazwa")}} type="text" id="nazwa" placeholder="Nazwa gry..." />

      <Label htmlFor="cena">Cena</Label>
      <Input onChange={(e)=>{form(e, "cena")}} type="number" id="cena" placeholder="Cena gry..." />

      <Label htmlFor="opis">Opis</Label>
      <Input onChange={(e)=>{form(e, "opis")}} type="text" id="opis" placeholder="Opis gry..." />

      <Label htmlFor="zdjecie">Zdjecie</Label>
      <Input onChange={(e)=>{handleZdjecie(e)}} type="file" id="zdjecie" placeholder="Zdjecie gry..." />
      
      <Button onClick={zapisz}>Dodaj gre</Button>
      </Card>

</div>
    </div>
    )
}

