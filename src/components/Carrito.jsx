import { useCarritoGlobal } from "./CarritoGlobal";
import { ShoppingCart, Trash2 } from "lucide-react";
import "./Carrito.css"

export default function Carrito() {
	const { carrito, agregarAlCarrito, quitarDelCarrito, vaciarProducto, vaciarCarrito } = useCarritoGlobal();

	const calcularTotal = () => carrito.reduce((total, item) => total + item.precio * item.cantidad, 0).toFixed(2);
	const totalUnidades = carrito.reduce((total, item) => total + item.cantidad, 0);

	if (carrito.length === 0) {
		return (
			<div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
				<h2 className="text-2xl font-semibold mb-4 text-gray-200">Tu carrito está vacío</h2>
				<p className="text-gray-400">Agregá productos desde la tienda para verlos acá.</p>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h2 className="text-3xl font-semibold mb-6 text-center text-gray-100"><ShoppingCart size={32} className="shpCart" /> Tu carrito</h2>

			<div className="space-y-4">
				{carrito.map((item) => (
					<div
						key={item.id}
						className="flex items-center justify-between bg-gray-800/60 p-4 rounded-2xl shadow-lg hover:bg-gray-800/80 transition-all duration-200"
					>
						<div className="flex items-center space-x-4">
							<img
								src={item.avatar || item.imagen}
								alt={item.nombre}
								className="w-16 h-16 object-cover rounded-lg shadow-md"
							/>
							<div>
								<h3 className="text-lg font-medium text-gray-100">{item.nombre}</h3>
								<p className="text-gray-400">${item.precio}</p>
							</div>
						</div>

						<div className="flex items-center space-x-3">
							<button
								onClick={() => quitarDelCarrito(item.id)}
								className="px-3 py-1 text-lg rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
							>
								–
							</button>
							<span className="text-lg text-gray-100">{item.cantidad}</span>
							<button
								onClick={() => agregarAlCarrito(item)}
								className="px-3 py-1 text-lg rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
							>
								+
							</button>

							<button
								onClick={() => vaciarProducto(item.id)}
								className="p-2 text-red-400 hover:text-red-500 hover:bg-gray-700 rounded-full transition-all"
								title="Eliminar producto"
							>
								<Trash2 className="w-5 h-5" />
							</button>
						</div>
					</div>
				))}
			</div>

			<div className="mt-8 bg-gray-800/60 p-6 rounded-2xl shadow-lg text-gray-100">
				<div className="flex justify-between items-center mb-4">
					<span className="text-xl font-medium">
						Total ({totalUnidades} {totalUnidades === 1 ? "item" : "items"}):
					</span>
					<span className="text-2xl font-semibold">${calcularTotal()}</span>
				</div>

				<div className="flex justify-end gap-4">
					<button
						onClick={vaciarCarrito}
						className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-all"
					>
						Vaciar carrito
					</button>

					<button
						className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-medium transition-all"
					>
						Finalizar compra
					</button>
				</div>
			</div>
		</div>
	);
}
