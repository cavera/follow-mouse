import { useState, useEffect } from 'react';

const FollowMouse = () => {
	const [enabled, setEnabled] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMove = e => {
			const { clientX, clientY } = e;
			setPosition({ x: clientX, y: clientY });
		};

		if (enabled) {
			window.addEventListener('pointermove', handleMove);
		}

		return () => {
			window.removeEventListener('pointermove', handleMove);
		};
	}, [enabled]);

	useEffect(() => {
		document.body.classList.toggle('no-cursor', enabled);

		return () => {
			document.body.classList.remove('no-cursor');
		};
	}, [enabled]);

	return (
		<>
			<h3>Follow mouse</h3>
			<div
				className={`mouseFollower ${enabled ? 'following' : ''}`}
				style={{
					transform: `translate(${position.x}px, ${position.y}px)`,
				}}></div>
			<button onClick={() => setEnabled(!enabled)}>{enabled ? 'Deactivate' : 'Activate'} follow mouse</button>
		</>
	);
};

export default FollowMouse;
