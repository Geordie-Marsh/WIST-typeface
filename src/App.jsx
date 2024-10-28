// Imports
	// Import React
	import React, { useEffect, useState } from 'react';

	// Importing the Routes and Route components
	import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

	// Importing framer-motion
	import { AnimatePresence, motion } from "framer-motion";

	// Importing gsap
	import { gsap } from 'gsap';

	// Importing defs
	import { $$ } from './defs';

	// Importing styles
	import './styles/main.scss';

	// Importing pages
	import Base from './pages/Base';
	import Home from './pages/Home';
	import ModeBase from './pages/ModeBase';
	// Importing mode pages
	import IndividualLetter from './pages/modes/IndividualLetter';
	import Sentences from './pages/modes/Sentences';
	import WordSnake from './pages/modes/WordSnake';
	import Tessellation from './pages/modes/Tessellation';
	import Departures from './pages/modes/Departures';
	import Perfume from './pages/modes/Perfume';
	import PerfumeTv from './pages/modes/PerfumeTv';
	import DeparturesLogic from './pages/modes/DeparturesLogic';
	import PerfumeLogic from './pages/modes/PerfumeLogic';
	import Temp from './pages/modes/Temp';

	// Importing components
	import Loading from "./components/Loading";
	


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
						<Route path='individual-letter'  element={ <PageWrapper><ModeBase page={"individual-letter"}><IndividualLetter /></ModeBase> </PageWrapper>} />
						<Route path='sentences'          element={ <PageWrapper><ModeBase page={"sentences"}><Sentences /></ModeBase> </PageWrapper>} />
						<Route path='word-snake'         element={ <PageWrapper><ModeBase page={"word-snake"}><WordSnake /></ModeBase> </PageWrapper>} />
						<Route path='tessellation'       element={ <PageWrapper><ModeBase page={"tessellation"}><Tessellation /></ModeBase> </PageWrapper>} />
					</Route>
					<Route path='mock-up'>
						<Route path='departures-board'   element={ <PageWrapper><ModeBase page={"depeartures-board"}><Departures /></ModeBase> </PageWrapper>} />
						<Route path='perfume-digital-ad'   element={ <PageWrapper><ModeBase page={"perfume-digital-ad"}><Perfume /></ModeBase> </PageWrapper>} />
						<Route path='perfume-tv-ad'   element={ <PageWrapper><ModeBase page={"perfume-tv-ad"}><PerfumeTv /></ModeBase> </PageWrapper>} />
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
	// Logic for the loading screen
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Function to handle page load
        function handlePageLoad() {
			// Stopping the loading animation
			$$(".Loading__animation").removeAttribute("loop");

			// Adding an event listener for the end of the loading animation
			window.addEventListener("loadingAnimationEnded", collapseLoadingScreen);
        };

		// Function to collapse the loading screen
		function collapseLoadingScreen() {
			// Hide the loading screen
			gsap.to(".Loading", {
				opacity: 0,
				duration: 1,
				onComplete: () => {
					setLoading(false); // Set loading to false when page is fully loaded
				}
			});
		}

        // Check if page is already loaded
        if (document.readyState === "complete") {
            setLoading(false);
        } else {
            // Add an event listener for page load
            window.addEventListener('load', handlePageLoad);
        }

        // Clean up event listener when component unmounts
        return () => window.removeEventListener('load', handlePageLoad);
	}, []);

	return (
		<>
			<HashRouter>
				<AnimatedRoutes />
			</HashRouter>
			{ loading &&
				<Loading />
			}
		</>
	);
}