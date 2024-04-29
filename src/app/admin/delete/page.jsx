"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import  Link from "next/link";
import Image from "next/image";
import Swal from 'sweetalert2';

const eliminar =  () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [buscarProducto, setBuscarProducto] = useState("");
    const [originalProducts, setOriginalProducts] = useState([]);
    

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/crudproducts/`);
            if (!response.ok) {
                throw new Error('Error al buscar productos');
            }
            const data = await response.json();
            setProducts(data);
            setOriginalProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Si lo eliminas, el producto no volverá a aparecer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                const response = await fetch(`/api/crudproducts/${id}`, {
                method: 'DELETE',
                })
                const data = await response.json();

                fetchData()
                router.refresh()
            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un problema al elimiar el producto.',
                });
            }
                Swal.fire({
                    title: "Eliminado!",
                    text: "Producto eliminado con éxito!",
                    icon: "success"
                });
            }
        });
    };

    const handleSearch = async () => {
        await fetchData();
        const productoFiltrado = originalProducts.filter(product =>
        product.name.toLowerCase().includes(buscarProducto.toLowerCase()) ||
        product.brand.toLowerCase().includes(buscarProducto.toLowerCase()) ||
        product.category.toLowerCase().includes(buscarProducto.toLowerCase())
        );

        if (productoFiltrado.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se encontraron productos!",
            });
            setBuscarProducto("")
        } else {
            setProducts(productoFiltrado)
            setBuscarProducto("")
        }
    };

    const handleValue = (e) => {
        setBuscarProducto(e.target.value)
    };

    const handleShow = async () => {
        await fetchData();
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="flex flex-col justify-center items-center py-4">
            <section className="pb-4 flex justify-center items-center gap-x-6">
                <div>
                    <Link className="font-bold text-lg text-slate-500 bg-slate-200 rounded p-1 hover:bg-slate-400 shadow transition-colors duration-300" href="/admin">
                        Volver
                    </Link>
                </div>
                <div className="flex">
                    <input onChange={handleValue} onKeyPress={handleKeyPress} className="px-2 py-1 text-xl rounded rounded-r-none shadow text-black" name="search" type="search" placeholder="Nombre, marca o categoría" value={buscarProducto} />
                    <button onClick={handleSearch}  className="bg-red-500 px-2 rounded rounded-l-none shadow hover:text-red-200 transition-colors duration-300" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
                <div>
                    <button onClick={handleShow} type="button" className="border-2 text-xl p-1 bg-green-600 text-white rounded-xl  hover:bg-green-800 duration-300 transition-colors shadow">
                        Mostrar Todo
                    </button>
                </div>
            </section>

            <table>
                <thead>
                    <tr className="text-lg">
                        <th className="border-2">Nombre</th>
                        <th className="border-2">Marca</th>
                        <th className="border-2">Categoría</th>
                        <th className="border-2">Precio</th>
                        <th className="border-2">Imagen</th>
                    </tr>
                </thead>

                {products.map((product) => (
                <tbody key={product.id}>
                    <tr className="border-2 h-7 text-center">
                        <td className="border-2 px-2">{product.name}</td>
                        <td className="border-2 px-2">{product.brand}</td>
                        <td className="border-2 px-2">{product.category}</td>
                        <td className="border-2 px-2">{"$" + product.price.toLocaleString("es-CL")}</td>
                        <td className="border-2 px-2"><Image className="w-24 h-24 p-1" src={`/img/products/${product.img}`} alt="IMG" width={400} height={400} /></td>

                        <td className="px-2">
                            <button onClick={() => handleDelete(product.id)} type="button" className="border-2 text-xl p-1 bg-red-600 text-white rounded-xl  hover:bg-red-800 duration-300 transition-colors shadow">
                                <span className="flex justify-center items-center gap-x-1">
                                    <p>Eliminar</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </span>
                            </button>
                        </td>
                    </tr>
                </tbody>
                ))}
            </table>
        </div>
    )
};

export default eliminar;