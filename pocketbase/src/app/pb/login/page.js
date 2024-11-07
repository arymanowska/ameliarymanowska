"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import PocketBase from 'pocketbase'
import { useRouter } from 'next/navigation'
export default function Page(){
    const router = useRouter()
    const pb = new PocketBase("http://172.16.15.156:8080/")
    const [login, setLogin] = useState(null)
    const [pass, setPass] = useState(null)
    const [error, setError] = useState(false)

    const handleLogin = (e) =>{
        setLogin(e.target.value)
    }

    const handlePass = (e) =>{
        setPass(e.target.value)
    }

    const handleButton = async() => {
        console.log(login)
        console.log(pass)
        
        try {
            const authData = await pb.collection('users').authWithPassword(
                login,
                pass,
            );
            console.log(authData)
            
            console.log(pb.authStore)
            router.push('/pb')
        } catch (error) {
            console.log(error);
            setError(true)
        }
    }

    return(
        <div className="w-full h-[40vh] flex justify-center mt-5">
        <Card className="w-[400px] h-[400px] p-5">
            <h1>Login</h1>
          <Label htmlFor="email">Email</Label>
          <Input
            onChange={(e)=>{handleLogin(e)}}
            type="text"
            id="email"
            placeholder="Email"
          />

          <Label htmlFor="opis">Password</Label>
          <Input
            onChange={(e)=>{handlePass(e)}}
            type="text"
            id="pass"
            placeholder="Password"
          />

          <Button onClick={handleButton} className="w-full mt-5">
            Login
          </Button>
          {
            error && <p className="text-red-600">Nie udało się zalogować</p>
          }
        </Card>
      </div>
    )}
