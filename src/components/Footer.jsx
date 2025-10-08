import { Copyright } from 'lucide-react';
import "./Footer.css";

function Footer() {
	return (
		<footer className="footer">
			<div className="footer-container">
				<p className="footer-text"><Copyright size={18} className='copyright'/> 2024 Mi Tienda. Todos los derechos reservados.</p>
			</div>
		</footer>
	);
}

export default Footer;
