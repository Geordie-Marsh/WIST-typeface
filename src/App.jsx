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
	import ModeBase from './pages/ModeBase';
	// Importing mode pages
	import IndividualLetter from './pages/modes/IndividualLetter';
	import Sentencer from './pages/modes/Sentencer';
	import WordSnake from './pages/modes/WordSnake';
	import Tessellation from './pages/modes/Tessellation';
	import Mockups from './pages/modes/Mockups';
	import Departures from './pages/modes/Departures';
	import DeparturesLogic from './pages/modes/DeparturesLogic';
	


function AnimatedRoutes() {
	const location = useLocation();

	return (
		<Routes key={ location.pathname } location={ location }>
			<Route path='/' element={ <Base /> }>
				<Route index element={<Home />} />
				<Route path='playground'>
					<Route path='individual-letter'  element={ <ModeBase><IndividualLetter /></ModeBase> } />
					<Route path='sentencer'          element={ <ModeBase><Sentencer /></ModeBase> } />
					<Route path='word-snake'         element={ <ModeBase><WordSnake /></ModeBase> } />
					<Route path='tessellation'       element={ <ModeBase><Tessellation /></ModeBase> } />
				</Route>
				<Route path='mock-up'>
					<Route path='departures-board'         element={ <ModeBase><Departures /></ModeBase> } />
				</Route>
				<Route path='departures-logic' element={<DeparturesLogic />} />
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