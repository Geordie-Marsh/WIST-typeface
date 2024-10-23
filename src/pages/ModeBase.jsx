// Imports
	// Importing components
	import { Link } from 'react-router-dom';

	// Importing assets
	import * as Icons from '../components/Icons';



export default function ModeBase({ children }) {
	return (
		<div className="ModeBase">
			<div className="ModeBase-back">
				<Link to="/"><Icons.PageBackArrow className={ "Icon--small" } /></Link>
			</div>
			{ children }
		</div>
	)
}