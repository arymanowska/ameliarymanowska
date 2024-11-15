"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge'
import { Send } from 'lucide-react';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

export default function Page(){
    const pb = new PocketBase('http://172.16.15.148:8080')
    const [data, setData] = useState(null)
    const USER_ID = "8jaost3w1mhsd25"
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        const getData = async ()=>{

            try {
                // fetch a paginated records list
                const resultList = await pb.collection('chat').getList(1, 50, {
                filter: '',
                sort: '-created',
                    });
                    console.log(resultList)
                    setData(resultList.items)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    },[])

    useEffect(() => {

        pb.collection('chat').subscribe('*', function (e) {
            console.log(e.action);
            console.log(e.record);

            if(e.action=="create"){
                setData((pr) => (
                    [e.record ,...pr]
                ))
            }
            console.log(data)
        }, { /* other options like expand, custom headers, etc. */ });

        return () => {
            pb.collection('chat').unsubscribe(); // remove all subscriptions in the collection
        }
    },[])

    const generateClassName = (id) => {
        const moje = "w-full flex justify-end"
        const inne = "w-full flex justify-start"

        if(id==USER_ID){
            return moje
        }else return inne
    }


    const handleInput = (e) => {
        setMsg(e.target.value)
    }

    const handleSend = async () => {
        const data = {
            "tresc": msg,
            "user_id": USER_ID
        };
        const record = await pb.collection('chat').create(data);
    };

    return(
        <div className='h-screen flex flex-col items-center justify-center'>
            <Card className="w-[50%] h-[50vh]">
            {
                data && data.map((wiadomosc) => (
                    <div className={generateClassName(wiadomosc.user_id)}>
                    <Badge className='text-xl' key={wiadomosc.id}>{wiadomosc.tresc}</Badge>
                    </div>
                )).reverse()
            }

            </Card>
            <div className='h-[50%] flex mt-5'>
                <Input onChange={(e) => {
                    handleInput(e)
                }}></Input>
                <Button onClick={handleSend}>
                    <Send/>
                </Button>
                
            </div>
        </div>
    )
}