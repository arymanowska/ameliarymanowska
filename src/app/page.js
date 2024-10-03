import Namelist from "@/components/namelist";
import Image from "next/image";


export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
    <Namelist imie="Jan Kowalksi"/>
    <Namelist imie="Jan" ok/>
    <Namelist imie="Kowalksi"/>
    <Namelist imie="Kowal"/>
    </div>
  );
}
