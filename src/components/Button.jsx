export function Major({ children, onClick }) {
	return (
		<button className='Button Major' onClick={onClick}>
			<h2>{ children }</h2>
		</button>
	);
}

export function Minor ({ children, dark = false, onClick }) {
	return (
		<button className={'Button Minor ' + (dark === true ? "dark" : "")} onClick={onClick}>
			<p>{ children }</p>
		</button>
	);
}