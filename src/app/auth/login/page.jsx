"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const login = () => {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = (async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false
        });

            if (res.error) {
                setError(res.error)
                alert("Contraseña incorrecta")
            } else {
                router.push("/")
            }
        } catch (error) {
            console.log(error)
        }
    });
    
    return (
        <div className="w-1/4 px-4 mx-auto rounded-xl shadow-md mt-20 bg-white border-t-2 border-gray-100">
            <form onSubmit={handleSubmit} className="flex flex-col mx-auto my-8">
                <h1 className="text-3xl p-1 font-bold text-center">Iniciar Sesión</h1>

                <label htmlFor="email" className="text-xl p-1 font-medium">
                    Email:
                </label>
                <input type="email" name="email" placeholder="Ej: juan@email.com" required className="p-1 font-light bg-slate-100 rounded" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}/>

                <label htmlFor="password" className="text-xl p-1 font-medium">
                    Password:
                </label>
                <input type="password" name="password" placeholder="Ej: 567890" required className="p-1 font-light bg-slate-100 rounded"
                onChange={(e) => setPassword(e.target.value)}
                value={password}/>

                <section className="pt-6 pb-4 flex justify-center items-end">
                    <button className="text-lg font-semibold w-1/2 py-1 bg-sky-600 text-white rounded-xl  hover:bg-sky-800 duration-300 transition-colors shadow">
                        Entrar
                    </button>
                </section>

                <section className="text-center pb-3">
                    <p>¿No tienes cuenta?</p>
                    <Link className="text-slate-500 hover:text-slate-700" href="/auth/register">
                        <p>Registrate aquí</p>
                    </Link>
                </section>
            </form>
        </div>
    )
};

export default login;