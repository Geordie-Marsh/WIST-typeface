// Imports
	// Importing React
	import React, { useState } from 'react';

	// Importing components
	import * as Icons from '../components/Icons';
	import * as Shapes from '../components/Shapes';



export default function Pagination({ options, selectedValue, onChange }) {
	const [hoveredOption, setHoveredOption] = useState(null);

	const handleOptionClick = (name) => {
		if (name === 'back') {
			// Go to the previous option
			const currentIndex = options.findIndex(option => option.name === selectedValue);
			const newIndex = currentIndex - 1;
			if (newIndex < 0) {
				return;
			}
			onChange(options[newIndex].name);
			return;
		}
		if (name === 'forward') {
			// Go to the next option
			const currentIndex = options.findIndex(option => option.name === selectedValue);
			const newIndex = currentIndex + 1;
			if (newIndex >= options.length) {
				return;
			}
			onChange(options[newIndex].name);
			return;
		}
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

	/* Note:
	the options will looks something like this:
	[
		{ name: "tessellation", label: "Tessellation" },
		{ name: "sentences", label: "Sentences" },
	]
	*/
	


	return (
		<div className='Pagination d-flex jc-btwn gap--xs'>
			<div
				className='Pagination__arrow'
				onClick={ () => handleOptionClick('back') }
			>
				<Icons.BackArrow />
			</div>
			{ options.map(option => (
				<div
					key={option.name}
					className={`Pagination__option ${selectedValue === option.name ? 'selected' : ''} ${hoveredOption === option.name ? 'hovered ' + option.name : ''}`}
					onClick={() => handleOptionClick(option.name)}
					onMouseEnter={ () => handleMouseEnter(option.name) }
					onMouseLeave={ handleMouseLeave }
				>
					<Shapes.Circle />
				</div>
			)) }
			<div
				className='Pagination__arrow'
				onClick={ () => handleOptionClick('forward') }
			>
				<Icons.ForwardArrow />
			</div>
		</div>
	);
}