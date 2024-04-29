"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sections = () => {
    const pathname = usePathname();

    return (
        <div>
            <ul className="flex justify-center items-center gap-x-14 bg-red-800 text-white text-lg p-3 font-semibold shadow">
                <li className={`hover:text-red-200 transition-colors duration-200 hover:scale-110 ${pathname === "/categoria/carnes" ? "text-red-300" : "text-white"}`}>
                    <Link href="/categoria/carnes">Carnes</Link>
                </li>
                <li className={`hover:text-red-200 transition-colors duration-200 hover:scale-110 ${pathname === "/categoria/lacteos" ? "text-red-300" : "text-white"}`}>
                    <Link href="/categoria/lacteos">Lácteos</Link>
                </li>
                <li className={`hover:text-red-200 transition-colors duration-200 hover:scale-110 ${pathname === "/categoria/panaderia" ? "text-red-300" : "text-white"}`}>
                    <Link href="/categoria/panaderia">Panadería</Link>
                </li>
                <li className={`hover:text-red-200 transition-colors duration-200 hover:scale-110 ${pathname === "/categoria/despensa" ? "text-red-300" : "text-white"}`}>
                    <Link href="/categoria/despensa">Despensa</Link>
                </li>
                <li className={`hover:text-red-200 transition-colors duration-200 hover:scale-110 ${pathname === "/categoria/congelados" ? "text-red-300" : "text-white"}`}>
                    <Link href="/categoria/congelados">Congelados</Link>
                </li>
                <li className={`hover:text-red-200 transition-colors duration-200 hover:scale-110 ${pathname === "/categoria/verduleria" ? "text-red-300" : "text-white"}`}>
                    <Link href="/categoria/verduleria">Verdulería</Link>
                </li>
                <li className={`hover:text-red-200 transition-colors duration-200 hover:scale-110 ${pathname === "/categoria/bebidas" ? "text-red-300" : "text-white"}`}>
                    <Link href="/categoria/bebidas">Bebidas</Link>
                </li>
                <li className={`hover:text-red-200 transition-colors duration-200 hover:scale-110 ${pathname === "/categoria/mascotas" ? "text-red-300" : "text-white"}`}>
                    <Link href="/categoria/mascotas">Mascotas</Link>
                </li>
            </ul>
        </div>
    )
};