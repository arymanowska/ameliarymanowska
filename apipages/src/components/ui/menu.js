import Link from "next/link";

export default function Menu(){

    return(
        <div className="flex flex-row justify-center gap-10">
          <Link href="/gold" className="text-purple-400">cena złota</Link>
          <Link href="/news" className="text-blue-400">wiadomości</Link>
          <Link href="/weather" className="text-green-400">pogoda</Link>
          <Link href="/exchange" className="text-red-400">kantor</Link>

        </div>
    )
}