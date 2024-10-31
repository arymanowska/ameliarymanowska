import { Button } from "@/components/ui/button"
import PocketBase from 'pocketbase';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil } from "lucide-react"
import { CardTitle } from "../ui/card"
import { useState } from "react";
import { Trigger } from "@radix-ui/react-dialog";
export default function EditItem({gra, onupdate}) {
    
    
const [dane, setDane] = useState({nazwa: gra.nazwa, cena: gra.cena, opis: gra.opis})
const pb = new PocketBase('http://172.16.15.156:8080');


const form = (e, nazwa)=>{
    setDane((prevDane=>{
        return(
            { ...prevDane, 
                [nazwa]:e.target.value
            }
        )}))
    }

const update = async ()=>{
    
    const formdata = new FormData()
    
    formdata.append('nazwa', dane.nazwa)
    formdata.append('cena', dane.cena)
    formdata.append('opis', dane.opis)
    // formdata.append('zdjecie', zdjecie)
    
    const record = await pb.collection('gry').update(gra.id, formdata);
    
    onupdate(record)
}



    
        return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost"><Pencil/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
      <Label htmlFor="email">Nazwa</Label>
      <Input defaultValue={gra.nazwa} onChange={(e)=>{form(e, "nazwa")}} type="text" id="nazwa" placeholder="Nazwa gry..." />

      <Label htmlFor="cena">Cena</Label>
      <Input defaultValue={gra.cena} onChange={(e)=>{form(e, "cena")}} type="number" id="cena" placeholder="Cena gry..." />

      <Label htmlFor="opis">Opis</Label>
      <Input defaultValue={gra.opis} onChange={(e)=>{form(e, "opis")}} type="text" id="opis" placeholder="Opis gry..." />

      {/* <Label htmlFor="zdjecie">Zdjecie</Label>
      <Input onChange={(e)=>{handleZdjecie(e)}} type="file" id="zdjecie" placeholder="Zdjecie gry..." /> */}


        </div>
        <DialogFooter>
            <Trigger asChild>
          <Button onClick={update}>Save changes</Button>
          </Trigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
