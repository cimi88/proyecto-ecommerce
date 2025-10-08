import { Link, useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card/Card";
import { Button } from "./ui/button/Button";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCarritoGlobal } from "./CarritoGlobal";
import "./DetalleProducto.css";

function DetalleProducto() {
    const location = useLocation();
    const producto = location.state?.producto;
    const from = location.state?.from || "/productos";
    const { agregarAlCarrito, quitarDelCarrito, vaciarProducto, obtenerCantidad } = useCarritoGlobal();

    if (!producto) {
        return (
            <div className="detalle-vacio">
                <p>No se pudo cargar el producto.</p>
                <Link to="/productos">
                    <Button variant="outline">Volver a Productos</Button>
                </Link>
            </div>
        );
    }

    const cantidad = obtenerCantidad(producto.id);

    return (
        <section className="detalle-page flex items-center justify-center">
            <Card className="detalle-card">
                <CardContent className="detalle-img-container">
                    <img src={producto.avatar} alt={producto.nombre} title={producto.nombre} className="detalle-img" />
                </CardContent>

                <CardHeader className="detalle-info">
                    <CardTitle className="detalle-title">{producto.nombre}</CardTitle>
                    <CardDescription className="detalle-descripcion">{producto.descripcion}</CardDescription>
                    <p className="detalle-precio">${producto.precio}</p>

                    {cantidad === 0 ? (
                        <Button className="boton-agregar mt-4 w-full bg-yellow-600 hover:bg-yellow-700 transition" onClick={() => agregarAlCarrito(producto)}>
                            <ShoppingCart /> Agregar al carrito
                        </Button>
                    ) : (
                        <div className="detalle-botones mt-4 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <Button className="flex-1 bg-gray-600 hover:bg-gray-700 transition" onClick={() => quitarDelCarrito(producto.id)}><Minus strokeWidth={4}/></Button>
                                <span className="flex-1 text-center font-bold text-white self-center">{cantidad}</span>
                                <Button className="flex-1 bg-gray-600 hover:bg-gray-700 transition" onClick={() => agregarAlCarrito(producto)}><Plus strokeWidth={4}/></Button>
                            </div>
                            <Button className="bg-red-700 hover:bg-red-800 transition" onClick={() => vaciarProducto(producto.id)}>
                                <Trash2 /> Vaciar este producto
                            </Button>
                        </div>
                    )}

                    <Link to={from}>
                        <Button variant="outline" className="boton-volver mt-4 hover:bg-teal-700">
                            Volver
                        </Button>
                    </Link>
                </CardHeader>
            </Card>
        </section>
    );
}

export default DetalleProducto;
