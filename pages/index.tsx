import { GetStaticProps } from "next";
import { useState, useEffect } from "react";

type PlayerData = {
	data: {
		tag: string;
		name: string;
		xp: number;
		trophies: number;
		donations: number;
		donationsReceived: number;
	};
};

export default function Home() {
	const [playerTag, setPlayerTag] = useState<string>("");
	const [player2Tag, setPlayer2Tag] = useState<string>("");
	const [playerData, setPlayerData] = useState<PlayerData | {}>({});
	const [player2Data, setPlayer2Data] = useState<PlayerData | {}>({});
	const [loading, setLoading] = useState<Boolean>(true);
	const [fetching, setFetching] = useState<Boolean>(false);

	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		setLoading(false);
	// 	}, 3000);
	// 	return () => clearTimeout(timer);
	// }, []);

	const submitHandler = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		setFetching(true);
		let tag = playerTag.trim();
		tag = tag.replace("#", "");
		let URL = `https://clash-ratios.herokuapp.com/api/player/${tag}`;
		try {
			const result = await fetch(URL);
			const data = await result.json();
			setPlayerData(data);
		} catch (error) {
			console.error(error);
			alert("Please try a different tag.");
		}
		tag = player2Tag.trim();
		tag = tag.replace("#", "");
		URL = `https://clash-ratios.herokuapp.com/api/player/${tag}`;
		try {
			const result = await fetch(URL);
			const data = await result.json();
			setPlayer2Data(data);
		} catch (error) {
			console.error(error);
			alert("Please try a different tag.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<header>
				<form className="form" onSubmit={submitHandler}>
					<div className="inputs">
						<input
							type="text"
							required
							minLength={8}
							maxLength={9}
							placeholder="Enter player 1️⃣ tag "
							value={playerTag}
							onChange={(e) => setPlayerTag(e.target.value)}
						/>
						<p className="vs">vs</p>
						<input
							type="text"
							required
							minLength={8}
							maxLength={9}
							placeholder="Enter player 2️⃣ tag "
							value={player2Tag}
							onChange={(e) => setPlayer2Tag(e.target.value)}
						/>
					</div>
					<button type="submit">
						Compare Ratios!
						<span role="img" aria-label="boxing glove">
							🥊
						</span>
					</button>
				</form>
			</header>
			{fetching && (
				<main>
					{loading ? (
						<h3 className="loader">Calculating...</h3>
					) : (
						<section className="cards">
							<div className="card first">
								<h3 className="title">{playerData.tag}</h3>
								<h5 className="info">{playerData.name}</h5>
								<h5 className="info">{playerData.xp}</h5>
								<h5 className="info">
									{playerData.trophies}{" "}
									<span role="img" aria-label="trophy">
										🏆
									</span>
								</h5>
								<h1 className="ratio">
									{(
										playerData.donations / playerData.donationsReceived
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
							<div className="card second">
								<h3 className="title">{player2Data.tag}</h3>
								<h5 className="info">{player2Data.name}</h5>
								<h5 className="info">{player2Data.xp}</h5>
								<h5 className="info">
									{player2Data.trophies}{" "}
									<span role="img" aria-label="trophy">
										🏆
									</span>
								</h5>
								<h1 className="ratio">
									{(
										player2Data.donations / player2Data.donationsReceived
									).toFixed(2)}
								</h1>
								<div className="ratios">
									<p className="calc">
										{player2Data.donations}{" "}
										<span role="img" aria-label="up">
											👆
										</span>
									</p>
									<p className="calc">
										{player2Data.donationsReceived}{" "}
										<span role="img" aria-label="down">
											👇
										</span>
									</p>
								</div>
							</div>
						</section>
					)}
				</main>
			)}
		</>
	);
}

// export const getStaticProps: GetStaticProps = async () => {
// 	let res;
// 	let tag = "L98JC2LG";
// 	tag = tag.replace("#", "");
// 	const URL = `https://clash-ratios.herokuapp.com/api/player/${tag}`;
// 	try {
// 		const result = await fetch(URL);
// 		res = await result.json();
// 	} catch (error) {
// 		console.error(error);
// 		alert("Please try a different tag.");
// 	} finally {
// 	}
// 	return {
// 		props: {
// 			data: res,
// 		},
// 	};
// };
