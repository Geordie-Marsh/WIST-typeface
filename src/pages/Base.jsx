// Imports
	// Importing styles
	import '../styles/main.scss';

	// Importing React
	import { Outlet } from "react-router-dom";



export default function Base() {


	return (
		// NOTE: The classes are added to the Base component in the Home component
		<div className="Base">
			{/* The outlet */}
			<Outlet />
		</div>
	)
}