import { useRef, useLayoutEffect } from "react";
import { animate } from "framer-motion";

import { PlayerData } from "../interfaces";

const Card = ({ playerData, cardClass }: PlayerData | Boolean | any) => {
	// Animated counter that returns animated p tag.
	const Counter = ({ from, to }: any) => {
		const nodeRef = useRef<HTMLHeadingElement>(null);

		useLayoutEffect(() => {
			let controls: any;
			if (null !== nodeRef.current) {
				let node = nodeRef.current;

				controls = animate(from, to, {
					duration: 1,
					onUpdate(value) {
						node.textContent = value.toFixed(2);
					},
				});
			}

			return () => controls.stop();
		}, [from, to]);

		return <h1 className="ratio" ref={nodeRef} />;
	};

	return (
		<div className={`card ${cardClass ? "first" : "second"}`}>
			<h3 className="info bold">{playerData.name}</h3>
			<h3 className="title bold">{playerData.tag}</h3>
			<h5 className="info">{playerData.xp} XP</h5>
			<h5 className="info">
				{playerData.trophies}{" "}
				<span role="img" aria-label="trophy">
					🏆
				</span>
			</h5>

			<Counter
				from={0}
				to={
					playerData.donationsReceived === 0
						? 0
						: playerData.donations / playerData.donationsReceived
				}
			/>

			<div className="ratios">
				<p className="calc">
					{playerData.donations}{" "}
					<span role="img" aria-label="up">
						👆
					</span>
				</p>
				<p className="calc">
					{playerData.donationsReceived}{" "}
					<span role="img" aria-label="down">
						👇
					</span>
				</p>
			</div>
		</div>
	);
};

export default Card;
