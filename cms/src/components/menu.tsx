import Link from "next/link"
export function Menu() {

    return (
        <div>
            <Link href="/class">Klasser</Link>
            <Link href="/assignments">Uppgifter</Link>
            <Link href="/create">Skapa ny uppgift</Link>

        </div>
    )
}