// Imports
	// Import React
	import { useEffect, useState } from 'react';

	// Importing components
	import { Link } from 'react-router-dom';

	// Importing defs
	import { $$, classAdd, classRemove } from '../defs';

	// Importing assets
	import * as Icons from '../components/Icons';



export default function ModeBase({ page, children }) {
	const [settingsActive, setSettingsActive] = useState(true);

	function handleMouseEnter() {
		// Adding the 'activated' class to the actions and ModeBase elements
		classAdd($$('.ModeBase__actions-activator'), 'activated');
		classAdd($$('.ModeBase__actions'), 'activated');
		classAdd($$('.ModeBase'), 'activated');
	}

	function handleMouseLeave() {
		// Removing the 'activated' class from the actions and ModeBase elements
		classRemove($$('.ModeBase__actions-activator'), 'activated');
		classRemove($$('.ModeBase__actions'), 'activated');
		classRemove($$('.ModeBase'), 'activated');
	}


	function handleSettingClick() {
		// Broadcasting that the settings button has been clicked
		window.dispatchEvent(new CustomEvent('settingsClicked--' + page));

		// Making the actions hidden
		handleMouseLeave();
	}

	function handleHistoryClick() {
		// Broadcasting that the history button has been clicked
		window.dispatchEvent(new CustomEvent('historyClicked--' + page));

		// Making the actions hidden
		handleMouseLeave();
	}



	useEffect(() => {
		// Listening for when the settings are active
		window.addEventListener('settingsActive', () => {
			setSettingsActive(true);
		});

		// Listening for when the settings are inactive
		window.addEventListener('settingsInactive', () => {
			setSettingsActive(false);
		});
	}, []);



	return (
		<div className="ModeBase">
			<div className='ModeBase__actions-activator d-flex jc-c ai-c' onMouseEnter={ handleMouseEnter }>
				<Icons.ThreeDots 
					className={ "Icon--small" } 
					
				/>
			</div>
			<div className='ModeBase__actions d-flex flex-v jc-btwn gap--sm' onMouseLeave={ handleMouseLeave }>
				<Link to="/"><Icons.House /></Link>
				{((page === "tessellation" || page === "individual-letter" || page === "word-snake") && !settingsActive) && 
					<div onClick={ handleSettingClick }><Icons.Settings /></div>
				}
				{page === "individual-letter" && !settingsActive &&
					<div onClick={ handleHistoryClick }><Icons.History /></div>
				}
			</div>
			{ children }
		</div>
	)
}