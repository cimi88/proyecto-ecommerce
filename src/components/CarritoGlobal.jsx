import { createContext, useContext, useState, useEffect } from "react";

// Contexto global del carrito
const CarritoContext = createContext();

export function CarritoGlobalProvider({ children }) {
    // Carga inicial desde localStorage si existe
    const [carrito, setCarrito] = useState(() => {
        const saved = localStorage.getItem("carrito");
        return saved ? JSON.parse(saved) : [];
    });

    // Guardar carrito en localStorage cada vez que cambia
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    // Agregar producto al carrito
    const agregarAlCarrito = (producto) => {
        setCarrito((prev) => {
            const existe = prev.find((p) => p.id === producto.id);
            if (existe) {
                return prev.map((p) => (p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p));
            }
            return [...prev, { ...producto, cantidad: 1 }];
        });
    };

    // Quitar producto del carrito
    const quitarDelCarrito = (productoId) => {
        setCarrito((prev) => prev.map((item) => (item.id === productoId ? { ...item, cantidad: item.cantidad - 1 } : item)).filter((item) => item.cantidad > 0));
    };

    // Vaciar un producto en particular
    const vaciarProducto = (productoId) => {
        setCarrito((prev) => prev.filter((item) => item.id !== productoId));
    };

    // Vaciar todo el carrito
    const vaciarCarrito = () => setCarrito([]);

    // Obtener cantidad de un producto
    const obtenerCantidad = (productoId) => {
        const item = carrito.find((i) => i.id === productoId);
        return item ? item.cantidad : 0;
    };

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                quitarDelCarrito,
                vaciarCarrito,
                vaciarProducto,
                obtenerCantidad,
            }}>
            {children}
        </CarritoContext.Provider>
    );
}

// Hook para usar el carrito global
export const useCarritoGlobal = () => useContext(CarritoContext);
