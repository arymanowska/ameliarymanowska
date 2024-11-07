import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PocketBase from "pocketbase"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginAvatar({onlogin}) {
    const pb = new PocketBase("http://172.16.15.156:8080/")

    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(pb.authStore.model)
    },[])
  const login = async () => {
    try {
        const authData = await pb.collection('users').authWithPassword(
            'amelia',
            'ameliaamelia',
        );
        console.log(authData)

        console.log(pb.authStore)

        setUser(pb.authStore.model)
        onlogin(pb.authStore.model)
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async() => {
    try{
        pb.authStore.clear()
        console.log(pb.authStore)
        setUser(null)
        onlogin(null)
    }catch(error){
        console.log(error)
    }
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <div>

          <Avatar className="w-[100px] h-[100px]">
            <AvatarImage src={pb.files.getUrl(user, user?.avatar)} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {
            user ? <p>zalogowany</p> : <p>niezalogowany</p>
          }
            </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!user &&
          <Link href='/pb/login'>
          <DropdownMenuItem>Login</DropdownMenuItem>
          </Link>
          }
          {user &&
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}