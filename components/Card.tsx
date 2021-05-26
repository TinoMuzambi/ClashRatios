import { PlayerData } from "../interfaces";

const Card = ({ playerData, cardClass }: PlayerData | Boolean | any) => {
	return (
		<div className={`card ${cardClass ? "first" : "second"}`}>
			<h3 className="title bold">{playerData.tag}</h3>
			<h3 className="info bold">{playerData.name}</h3>
			<h5 className="info">{playerData.xp}</h5>
			<h5 className="info">
				{playerData.trophies}{" "}
				<span role="img" aria-label="trophy">
					🏆
				</span>
			</h5>
			<h1 className="ratio">
				{(playerData.donationsReceived === 0
					? 0
					: playerData.donations / playerData.donationsReceived
				).toFixed(2)}
			</h1>
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
