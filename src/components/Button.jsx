export default function Button({ children, onClick }) {
	return (
		<button className='Button' onClick={onClick}>
			<h2>{ children }</h2>
		</button>
	);
}