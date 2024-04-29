"use client";
import { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            // Buscar si el producto ya está en el carrito
            const existingProduct = state.selectedProducts.find(
            (item) => item.id === action.payload.id
            );
    
            if (existingProduct) {
            // Si el producto ya está en el carrito, actualizar la cantidad
            const updatedProducts = state.selectedProducts.map((item) =>
                item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
    
            return {
                ...state,
                selectedProducts: updatedProducts,
                total: state.total + action.payload.price,
            };
            } else {
            // Si el producto no está en el carrito, agregarlo
            return {
                ...state,
                selectedProducts: [...state.selectedProducts, { ...action.payload, quantity: 1 }],
                total: state.total + action.payload.price,
            };
            }
    
        case 'REMOVE_FROM_CART':
            const removedProduct = state.selectedProducts.find(
            (item) => item.id === action.payload.id
            );
    
            if (removedProduct.quantity > 1) {
            // Si la cantidad es mayor que 1, reducir la cantidad
            const updatedProducts = state.selectedProducts.map((item) =>
                item.id === action.payload.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
    
            return {
                ...state,
                selectedProducts: updatedProducts,
                total: state.total - removedProduct.price,
            };
            } else {
            // Si la cantidad es 1, eliminar el producto del carrito
            return {
                ...state,
                selectedProducts: state.selectedProducts.filter(
                (item) => item.id !== action.payload.id
                ),
                total: state.total - removedProduct.price,
            };
            }

            //Remover todos los productos de un sólo tipo.
        case 'REMOVE_ALL_OF_PRODUCT':
            const productIdToRemove = action.payload.id;
            const productToRemove = state.selectedProducts.find(product => product.id === productIdToRemove);
            const totalPriceToRemove = productToRemove.price * productToRemove.quantity;
            return {
                ...state,
                selectedProducts: state.selectedProducts.filter(product => product.id !== productIdToRemove),
                total: state.total - totalPriceToRemove
            };

            //Remover todos los productos del carro
        case 'CLEAR_CART':
            return {
                ...state,
                selectedProducts: [],
                total: 0
            };
    
        default:
            return state;
        }
    };

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, { selectedProducts: [], total: 0 });

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe usarse dentro de un CartProvider');
    }
    return context;
};