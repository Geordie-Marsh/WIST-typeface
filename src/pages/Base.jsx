// Imports
	// Importing React
	import { Outlet } from "react-router-dom";



export default function Base() {
	return (
		<>
			{/* The outlet */}
			<Outlet />
		</>
	)
}