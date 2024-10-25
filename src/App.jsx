// Imports
	// Import React
	import React, { useEffect } from 'react';

	// Importing the Routes and Route components
	import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

	// Importing framer-motion
	import { AnimatePresence, motion } from "framer-motion";

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
	import Departures from './pages/modes/Departures';
	import Perfume from './pages/modes/Perfume';
	import PerfumeTv from './pages/modes/PerfumeTv';
	import DeparturesLogic from './pages/modes/DeparturesLogic';
	import PerfumeLogic from './pages/modes/PerfumeLogic';
	import Temp from './pages/modes/Temp';
	


// The animations for the page wrapper
const animations = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

// Page wrapper component with fade-in/fade-out animation
const PageWrapper = ({ children }) => (
	<motion.div
		variants={ animations }
		initial="initial"
		animate="animate"
		exit="exit"
		transition={{ duration: 0.5 }}
	>
	  	{ children }
	</motion.div>
);

function AnimatedRoutes() {
	const location = useLocation();

	useEffect(() => {
		// Broadcasting that the location has changed
		window.dispatchEvent(
			new CustomEvent('pageChanged', {
				detail: { newLocationPath: location.pathname }
			})
		);
	}, [location]);



	return (
		<AnimatePresence mode='wait'>
			<Routes key={ location.pathname } location={ location }>
				<Route path='/' element={ <Base /> }>
					<Route index element={<PageWrapper><Home /></PageWrapper>} />
					<Route path='playground'>
						<Route path='individual-letter'  element={ <PageWrapper><ModeBase><IndividualLetter /></ModeBase> </PageWrapper>} />
						<Route path='sentencer'          element={ <PageWrapper><ModeBase><Sentencer /></ModeBase> </PageWrapper>} />
						<Route path='word-snake'         element={ <PageWrapper><ModeBase><WordSnake /></ModeBase> </PageWrapper>} />
						<Route path='tessellation'       element={ <PageWrapper><ModeBase><Tessellation /></ModeBase> </PageWrapper>} />
					</Route>
					<Route path='mock-up'>
						<Route path='departures-board'   element={ <PageWrapper><ModeBase><Departures /></ModeBase> </PageWrapper>} />
						<Route path='perfume-digital-ad'   element={ <PageWrapper><ModeBase><Perfume /></ModeBase> </PageWrapper>} />
						<Route path='perfume-tv-ad'   element={ <PageWrapper><ModeBase><PerfumeTv /></ModeBase> </PageWrapper>} />
					</Route>
					<Route path='departures-logic' element={<DeparturesLogic />} />
					<Route path='perfume-logic' element={<PerfumeLogic />} />
					<Route path='temp' element={<Temp />} />
				</Route>
			</Routes>
		</AnimatePresence>
	);
}

export default function App() {

	return (
		<HashRouter>
			<AnimatedRoutes />
		</HashRouter>
	);
}