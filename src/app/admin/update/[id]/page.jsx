"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import Image from "next/image";

const formEdit = ({ params }) => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [img, setImg] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (params.id) {
                try {
                    const response = await fetch(`/api/crudproducts/${params.id}`)
                    if (!response.ok) {
                        throw new Error("Error al obtener el producto");
                    }
                    const data = await response.json();
                    setName(data.name);
                    setPrice(data.price);
                    setBrand(data.brand);
                    setCategory(data.category);
                    /* setImg(data.img); */
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Hubo un problema al obtener el producto.',
                    });
                }
            }
        };

        fetchData();
    }, [params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const priceInt = Number(price);

        if(isNaN(priceInt)) return Swal.fire({ icon: 'error', title: 'Oops...', text: 'El precio debe ser un número' });

        Swal.fire({
            title: "¿Estás seguro?",
            text: "Si te equivocas, puedes volver a editarlo!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, editar!",
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

                    const res = await fetch(`/api/crudproducts/${params.id}`, {
                    method: "PUT",
                    body: formData,
                    });
                    const data = await res.json();

                    router.refresh()
                    setTimeout(() => {
                        router.push("/admin/update")
                    }, 1000);
            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un problema al editar el producto.',
                });
            }
                Swal.fire({
                    title: "Editado correctamente!",
                    text: "Producto editado con éxito!",
                    icon: "success",
                });
            }
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const fileName = e.target.files[0].name;
        
        setImg(file);
    };

    return (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-12rem)]">
            <div className="w-96 m-10 h-auto rounded-xl shadow-md px-4 pb-2 bg-white border-t-2 border-gray-100">
                <h3 className="text-3xl p-3 font-bold text-center border-b-2">Editar Producto</h3>
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
                        {/* {img && ( 
                        <div className={`flex justify-center items-center pt-4`}>
                            <Image
                            src={`/img/products/${img}`}
                            alt="Upload file"
                            width={100}
                            height={100}
                            />
                        </div>
                        )} */}
                    </section>
                    <section className="pt-4 pb-2 flex justify-center items-end">
                        <button type="submit" className="text-lg font-semibold w-1/2 py-1 bg-orange-600 text-white rounded-xl  hover:bg-orange-800 duration-300 transition-colors shadow">
                        <span className=" flex justify-center items-center">
                            <p className="mr-1">Editar</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                        </span>
                        </button>
                    </section>
                </form>
            </div>
            <div>
                <Link className="font-bold text-lg text-slate-500 bg-slate-200 rounded p-1 hover:bg-slate-400 shadow transition-colors duration-300" href="/admin/update">Volver</Link>
            </div>
        </div>
    )
};

export default formEdit;