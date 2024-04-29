"use client";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cart } from "@/components/Cart.jsx";

export const Navbar = () => {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [admin, setAdmin] = useState(false);

    const handleLogout = async () => {
        await signOut({ redirect: false });
    };

    useEffect(() => {
        if (session) {
            const findUser = async () => {
                try {
                    const response = await fetch(`/api/auth/user/${session.user.email}`);
                    const data = await response.json();

                    if (data.data.admin === true) {
                        setAdmin(true);
                    } 
                } catch (error) {
                    console.log(error)
                }
            }
            
            findUser();
        }   else {
                setAdmin(false);
            }
    }, [session]);

    return (
        <div className="flex justify-evenly items-center h-16 px-4 bg-red-600 shadow text-white">
            <section>
                <Link className="flex items-center" href="/">
                    <div>
                        <Image className="h-16 w-14" src="/img/Logo-nav.png" alt="Logo" height={32} width={95} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">BERISTAIN</h3>
                        <h3 className="text-lg text-center font-semibold text-slate-200 opacity-70 -mt-2">MARKET</h3>
                    </div>
                </Link>
            </section>
            <section>
                <div className="flex">
                    <input className="px-2 py-1 text-xl rounded rounded-r-none shadow text-black" name="search" type="search" placeholder="Buscar..." />
                    <button className="bg-red-800 px-2 rounded rounded-l-none shadow hover:text-red-200 transition-colors duration-200" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
            </section>
            <section>
                <ul className="flex gap-6">
                    
                    {admin === true && 
                        <li className={`font-bold text-xl bg-red-800 px-2 pb-1 rounded-lg hover:text-red-300 transition-colors duration-200 hover:scale-110 ${pathname === "/admin" ? "text-red-300" : "text-white"}`}>
                            <Link href="/admin">Admin</Link>
                        </li>
                    }
                    
                    <li className="font-bold text-xl hover:text-red-200 transition-colors duration-200 hover:scale-110">
                        <Link href="/">Inicio</Link>
                    </li>

                    {session ? (
                        <li className={`font-bold text-xl hover:text-red-200 transition-colors duration-200 hover:scale-110 ${pathname === "/auth/login" ? "text-red-300" : "text-white"}`}>
                        <button onClick={handleLogout} type="button">Logout</button>
                        </li>
                    ) : (
                        <li className={`font-bold text-xl hover:text-red-200 transition-colors duration-200 hover:scale-110 ${pathname === "/auth/login" ? "text-red-300" : "text-white"}`}>
                        <Link href="/auth/login">Login</Link>
                        </li>
                    )}

                    <li className={`font-bold text-xl hover:text-red-200 transition-colors duration-200 hover:scale-110 ${pathname === "/tienda" ? "text-red-300" : "text-white"}`}>
                        <Link href="/tienda">Tienda</Link>
                    </li>
                    <li className={`font-bold text-xl hover:text-red-200 transition-colors duration-200 hover:scale-110 ${pathname === "/compras" ? "text-red-300" : "text-white"}`}>
                        <Link href="/compras">Mis Compras</Link>
                    </li>
                    <li className="font-bold text-xl hover:text-red-200 transition-colors duration-200">
                        <Cart />
                    </li>
                </ul>
            </section>
        </div>
    )
};