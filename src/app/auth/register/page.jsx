"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";

const register = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        Swal.fire({
            title: "¿Estás seguro?",
            text: "Puedes volver a revisar si está todo en órden!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, registrar!",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const formData = new FormData();
                    formData.append("username", username);
                    formData.append("email", email);
                    formData.append("password", password);
                    formData.append("repassword", repassword);

                    if (password !== repassword) {
                        return Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Las password deben ser iguales',
                        });
                    }
        
                    const res = await fetch("/api/auth/register", {
                        method: "POST",
                        body: formData
                        });

                    if (!res.ok) {
                        const { message } = await res.json();
                        throw new Error(message);
                    }

                    Swal.fire({
                    title: "Registrado correctamente!",
                    text: "Usuario registrado con éxito!",
                    icon: "success",
                    });
        
                    router.push("/auth/login")
            } catch (error) {
                if (error.message.includes("Usuario")) {
                    setUsernameError(error.message);
                } else if (error.message.includes("Email")) {
                    setEmailError(error.message);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Hubo un problema al registrar el usuario.",
                    });
                }
            }
            }
        });
    }

    return (
        <div className="w-1/4 px-4 mx-auto rounded-xl shadow-md mt-20 bg-white border-t-2 border-gray-100">
            <form onSubmit={handleSubmit} className="flex flex-col mx-auto my-8">
                <h1 className="text-3xl p-1 font-bold text-center">Registro</h1>

                <label htmlFor="username" className="text-xl p-1 font-medium">
                    Username:
                </label>
                <input type="text" name="username" placeholder="Ej: Pedro1990" required className="p-1 font-light bg-slate-100 rounded"
                onChange={(e) => setUsername(e.target.value)}
                value={username}/>
                {usernameError && <p className="text-red-500">{usernameError}</p>}

                <label htmlFor="email" className="text-xl p-1 font-medium">
                    Email:
                </label>
                <input type="email" name="email" placeholder="Ej: juan@email.com" required className="p-1 font-light bg-slate-100 rounded"
                onChange={(e) => setEmail(e.target.value)}
                value={email}/>
                {emailError && <p className="text-red-500">{emailError}</p>}

                <label htmlFor="password" className="text-xl p-1 font-medium">
                    Password:
                </label>
                <input type="password" name="password" placeholder="Ej: 567890" required className="p-1 font-light bg-slate-100 rounded" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />

                <label htmlFor="rePassword" className="text-xl p-1 font-medium">
                    Confirmar Password:
                </label>
                <input type="password" name="rePassword" placeholder="Ej: 567890" required className="p-1 font-light bg-slate-100 rounded" 
                onChange={(e) => setRepassword(e.target.value)}
                value={repassword}
                />
                {repassword != password && <p className="text-red-500 pt-1">Ámbas password deben coincidir</p>}

                <section className="pt-6 pb-4 flex justify-center items-end">
                    <button type="submit" className="text-lg font-semibold w-1/2 py-1 bg-sky-600 text-white rounded-xl  hover:bg-sky-800 duration-300 transition-colors shadow">
                        Registrar
                    </button>
                </section>

                <section className="text-center pb-3">
                    <p>¿Ya tienes cuenta?</p>
                    <Link className="text-slate-500 hover:text-slate-700" href="/auth/login">
                        <p>Inicia sesión aquí</p>
                    </Link>
                </section>
            </form>
        </div>
    )
};

export default register;