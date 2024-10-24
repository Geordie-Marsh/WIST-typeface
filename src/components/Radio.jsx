// Imports
	// Importing React
	import React, { useState } from 'react';



export default function Radio({ options, selectedValue, onChange }) {
	const [hoveredOption, setHoveredOption] = useState(null);

	const handleOptionClick = (name) => {
		if (onChange) {
			onChange(name);
		}
	}

	const handleMouseEnter = (name) => {
		setHoveredOption(name);
	}

	const handleMouseLeave = () => {
		setHoveredOption(null);
	}
	


	return (
		<div className='Radio d-flex jc-btwn gap--xs'>
			{ options.map(option => (
				<div
					key={option.name}
					className={`Radio__option ${selectedValue === option.name ? 'selected' : ''} ${hoveredOption === option.name ? 'hovered ' + option.name : ''}`}
					onClick={() => handleOptionClick(option.name)}
					onMouseEnter={ () => handleMouseEnter(option.name) }
					onMouseLeave={ handleMouseLeave }
				>
					<p >{ option.label }</p>
				</div>
			)) }
		</div>
	);
}