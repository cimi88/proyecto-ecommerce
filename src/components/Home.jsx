import React from "react";
import "./Home.css";
import { Button } from "./ui/button/Button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card/Card";
import { ShoppingCart, Truck, LifeBuoy } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
	const navigate = useNavigate();

	return (
		<section className="home-container">
			{/* Hero / Banner */}
			<section className="hero text-center">
				<h1 className="hero-title">Bienvenido a E-Shop</h1>
				<p className="hero-subtitle">Los mejores productos, con la mejor experiencia de compra. ¡Encontrá lo que buscás hoy!</p>
			</section>

			{/* Cards Destacadas */}
			<section className="product-cards grid grid-cols-1 md:grid-cols-3 gap-8 my-16 w-full max-w-6xl mx-auto">
				<Card className="b- bg-teal-800 border-teal-700">
					<CardHeader>
						<CardTitle>Electrónica</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300 mb-4 ">Gadgets y dispositivos de última generación.</p>
						<Button onClick={() => navigate(`/productos/categoria/1`)} className="card-button m-auto">Ver Productos</Button>
					</CardContent>
				</Card>
				<Card className="b- bg-teal-800 border-teal-700">
					<CardHeader>
						<CardTitle>Ropa</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300 mb-4">Moda y estilo para todas las edades.</p>
						<Button onClick={() => navigate(`/productos/categoria/2`)} className="card-button m-auto">Ver Productos</Button>
					</CardContent>
				</Card>
				<Card className="b- bg-teal-800 border-teal-700">
					<CardHeader>
						<CardTitle>Hogar</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-300 mb-4">Productos para mejorar tu casa y vida diaria.</p>
						<Button onClick={() => navigate(`/productos/categoria/3`)} className="card-button m-auto">Ver Productos</Button>
					</CardContent>
				</Card>
			</section>

			{/* Beneficios / Features */}
			<section className="features grid grid-cols-1 md:grid-cols-3 gap-8 my-16 max-w-6xl mx-auto text-center">
				<div className="feature-item">
					<Truck className="mx-auto w-12 h-12 mb-4 text-teal-500" />
					<h3 className="text-xl font-bold mb-2">Envío gratis</h3>
					<p className="text-gray-300">En compras superiores a $50 en todo el país.</p>
				</div>
				<div className="feature-item">
					<LifeBuoy className="mx-auto w-12 h-12 mb-4 text-teal-500" />
					<h3 className="text-xl font-bold mb-2">Soporte 24/7</h3>
					<p className="text-gray-300">Estamos para ayudarte cuando lo necesites.</p>
				</div>
				<div className="feature-item">
					<ShoppingCart className="mx-auto w-12 h-12 mb-4 text-teal-500" />
					<h3 className="text-xl font-bold mb-2">Devolución fácil</h3>
					<p className="text-gray-300">Cambios y devoluciones sin complicaciones.</p>
				</div>
			</section>

			{/* Call to Action final */}
			<section className="cta text-center my-16">
				<h2 className="text-3xl font-bold mb-4">Comenzá a comprar hoy</h2>
				<Button className="hero-button m-auto">
					<Link className="hero-button-link" to="/productos">
						Explorar Productos <ShoppingCart className="w-5 h-5 inline-block" />
					</Link>
				</Button>
			</section>
		</section>
	);
}
