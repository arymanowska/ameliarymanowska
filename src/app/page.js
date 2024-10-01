import Image from "next/image";
import Namelist from "@/components/namelist";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
    <Namelist imie="Jan Kowalksi"/>
    <Namelist imie="Jan"/>
    <Namelist imie="Kowalksi"/>
    <Namelist imie="Kowal"/>
    </div>
  );
}
