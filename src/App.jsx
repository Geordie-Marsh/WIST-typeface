// Imports
	// Import React
	import React from 'react';

	// Importing the Routes and Route components
	import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

	// Importing styles
	import './styles/main.scss';

	// Importing pages
	import Base from './pages/Base';
	import Home from './pages/Home';
	// Importing mode pages
	import IndividualLetter from './pages/modes/IndividualLetter';
	import Sentencer from './pages/modes/Sentencer';
	import WordSnake from './pages/modes/WordSnake';
	import Tessellation from './pages/modes/Tessellation';
	


function AnimatedRoutes() {
	const location = useLocation();

	return (
		<Routes key={ location.pathname } location={ location }>
			<Route path='/' element={ <Base /> }>
				<Route index element={<Home />} />
				<Route path='individual-letter' element={<IndividualLetter />} />
				<Route path='sentencer' element={<Sentencer />} />
				<Route path='word-snake' element={<WordSnake />} />
				<Route path='tessellation' element={<Tessellation />} />
			</Route>
		</Routes>
	);
}

export default function App() {

	return (
		<HashRouter>
			<AnimatedRoutes />
		</HashRouter>
	);
}