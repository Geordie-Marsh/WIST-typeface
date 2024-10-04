// Imports
	// Import React
	import React from 'react';

	// Importing the Routes and Route components
	import { BrowserRouter, Routes, Route } from "react-router-dom";

	// Importing styles
	import './styles/main.scss';

	// Importing pages
	import Home from './pages/Home';
	

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}