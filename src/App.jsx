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
	const Demos = React.lazy(() => import('./pages/modes/Demos'));
	const About = React.lazy(() => import('./pages/About'));



// Loading screen component
function Loading() {
	return (
		<div className="Loading" style={{
			width: "100vw",
			height: "100vh",
			position: "fixed",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			top: "0",
			left: "0",
			background: "#eeeeee"
		}}>
			<video 
				autoPlay loop muted 
				className="Loading__animation"
				// onEnded={ collapseLoadingScreen }
				// onPlaying={ checkLoaded }

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
						<Route path='demos' element={ <PageWrapper><ModeBase page={"demos"}><Demos /></ModeBase></PageWrapper> } />
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

						<Route path='about' element={<PageWrapper><ModeBase page={"about"}><About /></ModeBase> </PageWrapper>} />
					</Route>
				</Routes>
			</Suspense>
		</AnimatePresence>
	);
}

export default function App() {
	// Logic for the loading screen
	const [loading, setLoading] = useState(true);
	
	// Function to handle page load
	function handlePageLoad() {
		// Hide the loading screen
		gsap.to(".Loading", {
			opacity: 0,
			duration: 0.5,
			onComplete: () => {
				setLoading(false);
			}
		});
	}

	useEffect(() => {
		// Check if page is already loaded
        if (document.readyState === "complete") {
			setLoading(false);
        } else {
            // Add an event listener for page load
			window.addEventListener('load', handlePageLoad);
        }

		// Cleanup
		return () => {
			// Remove the event listener for page load
			window.removeEventListener('load', handlePageLoad);
		};
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