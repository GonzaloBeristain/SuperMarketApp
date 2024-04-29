"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";

export const FormAddProduct = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [img, setImg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const priceInt = Number(price);

        if(isNaN(priceInt)) return Swal.fire({ icon: 'error', title: 'Oops...', text: 'El precio debe ser un número' });

        Swal.fire({
            title: "¿Estás seguro?",
            text: "Puedes volver a revisar si está todo en órden!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, agregar!",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const formData = new FormData();
                    formData.append("name", name);
                    formData.append("price", priceInt);
                    formData.append("brand", brand);
                    formData.append("category", category);
                    formData.set("img", img);

                    const res = await fetch("/api/crudproducts", {
                    method: "POST",
                    body: formData
                    });
                    const data = await res.json();

                    router.refresh()
                    setTimeout(() => {
                        router.push("/admin")
                    }, 2000);
            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un problema al agregar el producto.',
                });
            }
                Swal.fire({
                    title: "Agregado correctamente!",
                    text: "Producto agregado con éxito!",
                    icon: "success",
                });
            }
        });
    };

    const handleFileChange = (e) => {
        setImg(e.target.files[0])
    };

    return (
        <div className="w-96 m-10 h-auto rounded-xl shadow-md px-4 pb-2 bg-white border-t-2 border-gray-100">
                <h3 className="text-3xl p-3 font-bold text-center border-b-2">Agregar Producto</h3>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="name" className="text-xl p-1 font-medium">Nombre:</label>
                <input required className="p-1 font-light bg-slate-100 rounded" type="text" name="name" placeholder="Ej: Aceite de Maravilla - 900 ml"
                onChange={(e) => setName(e.target.value)}
                value={name}
                />
                <label htmlFor="brand" className="text-xl p-1 font-medium mt-2">Marca:</label>
                <input required className="p-1 font-light bg-slate-100 rounded" type="text" name="brand" placeholder="Ej: Belmont"
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
                />
                <label htmlFor="category" className="text-xl p-1 font-medium mt-2">Categoría:</label>
                <select required className="p-1 font-light bg-slate-100 rounded" type="text" name="category" placeholder="Ej: Despensa"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                >
                    <option className="font-bold text-lg" value="" disabled>Seleccionar...</option>
                    <option className="text-lg font-medium" value="Bebidas">Bebidas</option>
                    <option className="text-lg font-medium" value="Carnes">Carnes</option>
                    <option className="text-lg font-medium" value="Congelados">Congelados</option>
                    <option className="text-lg font-medium" value="Despensa">Despensa</option>
                    <option className="text-lg font-medium" value="Lacteos">Lácteos</option>
                    <option className="text-lg font-medium" value="Mascotas">Mascotas</option>
                    <option className="text-lg font-medium" value="Panaderia">Panadería</option>
                    <option className="text-lg font-medium" value="Verduleria">Verdulería</option>
                </select>
                <label htmlFor="price" className="text-xl p-1 font-medium mt-2">Precio:</label>
                <input required className="p-1 font-light bg-slate-100 rounded" type="text" name="price" placeholder="Ej: 1500"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                />
                <label htmlFor="img" className="text-xl p-1 font-medium mt-2">Imagen:</label>
                <input className="p-1 font-extralight bg-slate-100 rounded" type="file" name="img"
                onChange={handleFileChange}
                />
                <section>
                    {img && (
                    <div className="flex justify-center items-center pt-4">
                        <Image
                        src={URL.createObjectURL(img)}
                        alt="Upload file"
                        width={100}
                        height={100}
                        />
                    </div>
                    )}
                </section>
                <section className="pt-4 pb-2 flex justify-center items-end">
                    <button type="submit" className="text-lg font-semibold w-1/2 py-1 bg-green-600 text-white rounded-xl  hover:bg-green-800 duration-300 transition-colors shadow">
                    <span className="ml-1 flex justify-center items-center">
                        <p>Agregar</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </span>
                    </button>
                </section>
            </form>
            
        </div>
    )
};