// Imports
	// Import React
	import React from 'react';

	// Importing the Routes and Route components
	import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

	// Importing styles
	import './styles/main.scss';

	// Importing pages
	import Base from './pages/Base';
	import Home from './pages/Home';
	import Test from './pages/Test';
	// Importing mode pages
	import Sentencer from './pages/modes/Sentencer';
	import WordSnake from './pages/modes/WordSnake';
	import Tessellation from './pages/modes/Tessellation';
	


function AnimatedRoutes() {
	const location = useLocation();

	return (
		<Routes key={ location.pathname } location={ location }>
			<Route path='/' element={ <Base /> }>
				<Route index element={<Home />} />
				<Route path='test' element={<Test />} />
				<Route path='sentencer' element={<Sentencer />} />
				<Route path='word-snake' element={<WordSnake />} />
				<Route path='tessellation' element={<Tessellation />} />
			</Route>
		</Routes>
	);
}

export default function App() {

	return (
		<BrowserRouter>
			<AnimatedRoutes />
		</BrowserRouter>
	);
}