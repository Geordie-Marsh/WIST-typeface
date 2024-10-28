// Imports
	// Import React
	import React, { useEffect, useState, Suspense } from 'react';

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
	
	// Importing assets
	import Animation from './assets/loading-animation.webm';

	// Importing pages using lazy loading
	const Base = React.lazy(() => import('./pages/Base'));
	const Home = React.lazy(() => import('./pages/Home'));
	const ModeBase = React.lazy(() => import('./pages/ModeBase'));
	// Importing mode pages
	const IndividualLetter = React.lazy(() => import('./pages/modes/IndividualLetter'));
	const Sentences = React.lazy(() => import('./pages/modes/Sentences'));
	const WordSnake = React.lazy(() => import('./pages/modes/WordSnake'));
	const Tessellation = React.lazy(() => import('./pages/modes/Tessellation'));
	const Departures = React.lazy(() => import('./pages/modes/Departures'));
	const Perfume = React.lazy(() => import('./pages/modes/Perfume'));
	const PerfumeTv = React.lazy(() => import('./pages/modes/PerfumeTv'));
	const DeparturesLogic = React.lazy(() => import('./pages/modes/DeparturesLogic'));
	const PerfumeLogic = React.lazy(() => import('./pages/modes/PerfumeLogic'));
	const Temp = React.lazy(() => import('./pages/modes/Temp'));



// Loading screen component
function Loading() {
	function onAnimationEnded() {
		window.dispatchEvent(new Event("loadingAnimationEnded"));
	}

	return (
		<div className="Loading screen-width screen-height p-abs d-flex jc-c ai-c" style={{
			top: "0",
			left: "0",
			background: "#eeeeee"
		}}>
			<video 
				autoPlay loop muted 
				className="Loading__animation"
				onEnded={ onAnimationEnded }

				style={{
					width: "4rem",
					transform: "scale(1.01)",
					clipPath: "fill-box",
					borderRadius: "0.01px"
				}}
			>
				<source src={ Animation } type="video/webm" />
			</video>
			{/* <img src={ Animation } alt="Loading animation" className="Loading__animation" /> */}
		</div>
	)
}
	


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
			<Suspense fallback={ <Loading /> }>
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
			</Suspense>
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