import Link from "next/link";

export default function Menu(){

    return(
        <div classname = "flex justify-center gap-8">
            <Link href="zadanie1">zadanie1 </Link>
            <Link href="zadanie2">zadanie2 </Link>
            <Link href="zadanie3">zadanie3 </Link>
            <Link href="zadanie4">zadanie4 </Link>
            <Link href="zadanie5">zadanie5 </Link>
        </div>
    )
}