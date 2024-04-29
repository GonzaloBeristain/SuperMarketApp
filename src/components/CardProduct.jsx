"use client";
import { useState, useEffect } from 'react';
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export const CardProduct = ({product}) => {
    const { cart, dispatch } = useCart();
    const [addedToCart, setAddedToCart] = useState(0);

    useEffect(() => {
        const productInCart = cart.selectedProducts.find(item => item.id === product.id);
        if (productInCart) {
            setAddedToCart(productInCart.quantity);
        } else {
            setAddedToCart(0);
        }
    }, [cart.selectedProducts, product.id]);

    const handleAddCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        setAddedToCart(true);
    };

    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { id: productId } });
    };

    const productQuantity = (productId) => {
        const productInCart = cart.selectedProducts.find(item => item.id === productId);
        return productInCart ? productInCart.quantity : 0;
    };

    const handleIncrement = () => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const handleDecrement = () => {
        if (productQuantity(product.id) > 0) {
            removeFromCart(product.id);
        }
    };

    return (
        <div key={product.id} className="w-56 h-auto rounded-xl shadow-md px-4 bg-white border-t-2 border-gray-100">
            <section className="flex justify-center items-center py-3">
                <Image className="w-40 h-40" src={`/img/products/${product.img}`} alt="IMG" width={500} height={400} />
            </section>
            <section>
                <h2 className="text-slate-600 font-semibold">{"$" + product.price.toLocaleString("es-CL")}</h2>
            </section>
            <section className="bg-slate-200 w-9 rounded-lg px-1">
                <h2 className="text-sm font-light">1 un</h2>
            </section>
            <section className="mt-5">
                <h3 className="text-slate-400 text-sm">{product.brand}</h3>
                <h3 className="text-black font-bold">{product.name}</h3>
            </section>
            <section className="flex justify-center pb-3 pt-2">
                    {addedToCart > 0 ? 
                    (
                        <div className='flex justify-center items-center gap-x-3 text-white font-medium bg-red-600 rounded-lg text-center p-1 w-52 hover:bg-red-700 shadow transition-colors duration-300'>
                            <button onClick={handleDecrement} className='hover:bg-red-600 font-bold rounded-full px-1.5 text-base'>-</button>
                            <p>{productQuantity(product.id)}</p>
                            <button onClick={handleIncrement} className='hover:bg-red-600 font-bold rounded-full px-1.5 text-base'>+</button>
                        </div>
                    )  : 
                    (
                        <button onClick={handleAddCart} className="text-white font-medium bg-red-600 rounded-lg text-center p-1 w-52 hover:bg-red-700 shadow transition-colors duration-300">
                        Agregar
                        </button>
                    )
                    }
            </section>
        </div>
    )
};