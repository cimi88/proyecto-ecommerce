import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { RotateLoader } from "react-spinners";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card/Card";
import { Button } from "./ui/button/Button";
import { useCarritoGlobal } from "./CarritoGlobal";
import "./Productos.css";

const urlCat = "https://68d4873f214be68f8c697821.mockapi.io/api/categorias";
const urlProd = "https://68d4873f214be68f8c697821.mockapi.io/api/productos";

function Productos() {
    const [productos, setProductos] = useState([]);
    const [categoria, setCategoria] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const { categoriaId } = useParams();
    const location = useLocation();
    const { agregarAlCarrito, quitarDelCarrito, vaciarProducto, obtenerCantidad } = useCarritoGlobal();

    useEffect(() => {
        if (categoriaId) {
            fetch(`${urlCat}/${categoriaId}`)
                .then((res) => res.json())
                .then((data) => setCategoria(data))
                .catch(() => setError("Hubo un problema al cargar la categoría."));
        } else {
            setCategoria(null);
        }
    }, [categoriaId]);

    useEffect(() => {
        setCargando(true);
        fetch(urlProd)
            .then((res) => {
                if (!res.ok) throw new Error(`${res.status}`);
                return res.json();
            })
            .then((data) => {
                const filtrados = categoriaId ? data.filter((p) => p.categoriaId === categoriaId) : data;
                setProductos(filtrados);
                setCargando(false);
            })
            .catch(() => {
                setError("Hubo un problema al cargar los productos.");
                setCargando(false);
            });
    }, [categoriaId]);

    if (cargando) {
        return (
            <div className="spinner-container">
                <RotateLoader color="#dfdfdf" speedMultiplier={2} />
                <h4>Cargando...</h4>
            </div>
        );
    }

    if (error) return <ErrorAlert msj={error} />;

    return (
        <section className="productos-page bg-teal-950 text-white">
            <h1 className="productos-title text-3xl font-bold text-center mb-8">{categoria ? `Productos de ${categoria.nombre}` : "Todos los productos"}</h1>

            {!categoria && (
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    <Link to="/productos/categoria/1" className="px-4 py-2 rounded-lg border border-teal-600 text-teal-300 hover:bg-teal-700/40 transition">
                        Electrónica
                    </Link>
                    <Link to="/productos/categoria/2" className="px-4 py-2 rounded-lg border border-teal-600 text-teal-300 hover:bg-teal-700/40 transition">
                        Hogar
                    </Link>
                    <Link to="/productos/categoria/3" className="px-4 py-2 rounded-lg border border-teal-600 text-teal-300 hover:bg-teal-700/40 transition">
                        Indumentaria
                    </Link>
                </div>
            )}

            <div className="productos-grid">
                {productos.map((producto) => {
                    const cantidad = obtenerCantidad(producto.id);
                    return (
                        <Card key={producto.id} className="producto-card relative bg-[#161616] border border-teal-700 shadow-lg overflow-hidden">
                            <img src={producto.avatar} alt={producto.nombre} className="w-full h-52 object-cover" />

                            <CardHeader className="p-4 flex-1">
                                <CardTitle className="text-lg font-semibold text-white line-clamp-3">{producto.nombre}</CardTitle>
                                <CardDescription className="text-gray-400 text-sm mt-2 line-clamp-3">{producto.descripcion}</CardDescription>
                            </CardHeader>

                            <CardContent className="p-4 flex flex-col gap-2">
                                <p className="font-bold text-teal-400 text-lg">${producto.precio}</p>
                            </CardContent>

                            <div className="overlay absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <Link to={`/productos/detalle/${producto.id}`} state={{ producto, from: location.pathname }} className="w-3/4">
                                    <Button variant="default" className="w-full bg-teal-600 hover:bg-teal-700">
                                        Ver detalles
                                    </Button>
                                </Link>

                                {cantidad === 0 ? (
                                    <Button className="w-3/4 bg-yellow-600 hover:bg-yellow-700 transition" onClick={() => agregarAlCarrito(producto)}>
                                        <ShoppingCart /> Agregar al carrito
                                    </Button>
                                ) : (
                                    <div className="flex flex-col gap-2 w-3/4">
                                        <div className="flex gap-2">
                                            <Button className="flex-1 bg-gray-600 hover:bg-gray-700 transition" onClick={() => quitarDelCarrito(producto.id)}>
                                                <Minus strokeWidth={4}/>
                                            </Button>
                                            <span className="flex-1 text-center font-bold text-white">{cantidad}</span>
                                            <Button className="flex-1 bg-gray-600 hover:bg-gray-700 transition" onClick={() => agregarAlCarrito(producto)}>
                                                <Plus strokeWidth={4}/>
                                            </Button>
                                        </div>
                                        <Button className="bg-red-700 hover:bg-red-800 transition w-full" onClick={() => vaciarProducto(producto.id)}>
                                            <Trash2 /> Vaciar producto
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}

export default Productos;

function ErrorAlert({ msj }) {
    return (
        <div className="custom-alert" role="alert">
            {msj}
        </div>
    );
}
