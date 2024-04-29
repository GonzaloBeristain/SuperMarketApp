"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

const compras = () => {
    const { cart, dispatch } = useCart();

    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { id: productId } });
    };

    const handleAddCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeAllOfProduct = (productId) => {
        dispatch({ type: 'REMOVE_ALL_OF_PRODUCT', payload: { id: productId } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const subTotal = () => {
        return cart.selectedProducts.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);
    };

    return (
        <div className="flex items-center justify-center">
            {cart.selectedProducts.length === 0 ? 
                (
                    <div className="py-10">
                        <p className="text-2xl text-center font-bold py-2 w-auto">Tu carro está vacío</p>
                        <p className="text-2xl text-center pb-4">Navega por nuestras ofertas y encuentra los mejores productos</p>
                        <div className="text-center">
                            <button className="bg-red-600 w-48 h-9 text-white font-semibold rounded-lg transition-colors duration-300 shadow hover:bg-red-700">
                                <Link href="/tienda">Buscar ofertas</Link>
                            </button>
                        </div>
                    </div>
                )
                : 
                (
                    <div className="flex flex-col justify-center">
                        <section className="border-b-2 py-3">
                            <p className="text-2xl font-bold">Tus productos:</p>
                        </section>
                        {cart.selectedProducts.map(product => (
                            <div key={product.id}>
                                <section className="flex justify-between gap-x-3 py-5 border-b-2">
                                    <div>
                                        <Image className="w-16 h-16" src={`/img/products/${product.img}`} alt="IMG" width={800} height={800} />
                                    </div>
                                    <div>
                                        <div className="flex justify-between w-96 gap-x-4 text-slate-700">
                                            <p className="text-base font-semibold ">{product.name}</p>
                                            <p className="text-base font-semibold">{"$" + (product.price * product.quantity).toLocaleString("es-CL")}</p>
                                        </div>
                                        <div className="flex justify-between pt-2">
                                            <div className="flex gap-x-2">
                                                {
                                                    product.quantity === 1 ? 
                                                    (
                                                        <button onClick={() => removeFromCart(product.id)} className="bg-red-600 w-7 h-7 rounded-lg transition-colors duration-300 shadow hover:bg-red-700">
                                                            <span className="text-white flex justify-center items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                            </span>
                                                        </button>
                                                    ) 
                                                    : 
                                                    (
                                                        <button onClick={() => removeFromCart(product.id)} className="bg-red-600 w-7 h-7 rounded-lg transition-colors duration-300 shadow hover:bg-red-700">
                                                            <span className="text-white flex justify-center items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                                                </svg>
                                                            </span>
                                                        </button>
                                                    )
                                                }
                                                <p className="bg-gray-200 text-sm text-center pt-1 w-10 h-7 rounded-lg shadow">{product.quantity} un</p>
                                                <button onClick={() => handleAddCart(product)} className="bg-red-600 w-7 h-7 rounded-lg transition-colors duration-300 shadow hover:bg-red-700">
                                                    <span className="text-white flex justify-center items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                            <div>
                                                <button onClick={() => removeAllOfProduct(product.id)} className="text-red-500 font-semibold underline transition-colors duration-300 hover:text-red-700">Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        ))}
                        <section className="text-center py-4">
                            <button onClick={clearCart} className="text-red-500 font-semibold underline transition-colors duration-300 hover:text-red-700">
                                Vaciar carro
                            </button>
                        </section>
                        <section className="flex justify-between text-lg font-semibold border-t-2 py-4">
                            <p>Total:</p>
                            <p>{"$" + subTotal().toLocaleString("es-CL")}</p>
                        </section>
                        <section>
                            <button className="bg-red-600 w-full h-9 text-white font-semibold rounded-lg transition-colors duration-300 shadow hover:bg-red-700">
                                Ir a pagar
                            </button>
                        </section>
                    </div>
                )
            }
        </div>
    )
};

export default compras;