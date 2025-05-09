import Link from "next/link"
import {
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
  } from "@heroui/navbar";

export function Menu() {

    return (
        <Navbar>
            <NavbarBrand>Lingon</NavbarBrand>
            <NavbarContent>
                <NavbarItem><Link href="/class">Klasser</Link></NavbarItem>
                <NavbarItem><Link href="/assignments">Uppgifter</Link></NavbarItem>
                <NavbarItem><Link href="/create">Skapa ny uppgift</Link></NavbarItem>
            </NavbarContent>
            {/* <NavbarMenuToggle />
            <NavbarMenu>
            </NavbarMenu> */}


        </Navbar>
    )
}