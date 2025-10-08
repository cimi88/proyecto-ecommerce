import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button/Button";
import { useCarritoGlobal } from "./CarritoGlobal";
import "./Navbar.css";

function Navbar() {
    const { carrito } = useCarritoGlobal();

    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="logo">MiTienda</Link>
                <div className="nav-links">
                    <Link to="/"><Button variant="ghost">Home</Button></Link>
                    <Link to="/productos"><Button variant="ghost">Productos</Button></Link>
                    <Link to="/carrito">
                        <Button size="bigicon" variant="outline" className="relative btn">
                            <ShoppingCart className="size-6 text-teal-400" />
                            <span className="sr-only">Carrito</span>
                            {totalCantidad > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                                    {totalCantidad}
                                </span>
                            )}
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
