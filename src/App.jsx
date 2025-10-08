import "./App.css";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Productos from "./components/Productos";
import DetalleProducto from "./components/DetalleProducto";
import Footer from "./components/Footer";

import { CarritoGlobalProvider } from "./components/CarritoGlobal"; // <-- Provider
import Carrito from "./components/Carrito"; // <-- tu página de carrito



function App() {
  return (
		<CarritoGlobalProvider >
			<Navbar />
			<main className="main-content">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/productos" element={<Productos />} />
					<Route path="/productos/categoria/:categoriaId" element={<Productos />} />
					<Route path="/productos/detalle/:id" element={<DetalleProducto />} />
					<Route path="/carrito" element={<Carrito />}/>
				</Routes>
			</main>
			<Footer />
		</CarritoGlobalProvider>
  );
}

export default App;
