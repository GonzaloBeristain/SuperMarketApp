"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export const ModalCart = ({ isOpen, onClose }) => {
    const { cart, dispatch } = useCart();

    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { id: productId } });
    };

    const subTotal = () => {
        return cart.selectedProducts.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);
    };

    return (
        <div
            className={`fixed top-12 right-4 z-50 p-2 w-auto h-auto rounded-xl bg-white text-black shadow-lg transition-opacity duration-500 ${isOpen ? 'block' : 'opacity-0'}`}
        >
            <section className="flex flex-col justify-center items-center bg-red-50 rounded p-3">
                <div className="flex justify-between items-center ">
                    <h2 className="text-xl font-bold border-b-2 border-gray-400 uppercase ">Carro de compras:</h2>
                    <div className="fixed top-12 right-4 p-2">
                        <button onClick={onClose}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-700 hover:text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>    
                </div>
                <div className="mt-4 font-semibold">
                    {cart.selectedProducts.map(product => (
                        <ul key={product.id} className="text-lg flex justify-between items-center border-b-2 border-gray-300">
                            <li className="bg-red-600 rounded-full flex items-center justify-center h-6 w-6 mr-1">
                                <span className="text-xs font-extrabold text-white">{product.quantity}</span>
                            </li>
                            <li className="px-2 mx-auto font-semibold">{product.name}</li>
                            <li className="px-2 font-medium text-slate-600">{"$" + product.price.toLocaleString("es-CL")}</li>
                            <li className="pl-2 pt- font-medium">
                                <button onClick={() => removeFromCart(product.id)} className="rounded hover:bg-slate-200">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </span>
                                </button>
                            </li>
                        </ul>
                    ))}
                </div>
                <div className="flex items-center gap-x-2 pt-4">
                    <p className="text-lg">Subtotal:</p>
                    <p className="text-lg text-slate-600 pr-6">{"$" + subTotal().toLocaleString("es-CL")}</p>
                    <Link href="/compras">
                        <button onClick={onClose} className="text-white text-lg font-semibold bg-green-700 rounded-lg text-center px-2 w-auto hover:bg-green-800 shadow transition-colors duration-300">Continuar</button>
                    </Link>
                </div>
            </section>
        </div>
    );
};