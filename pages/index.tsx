import { GetStaticProps } from "next";
import { useState, useEffect } from "react";

type Props = {
	data: {
		tag: string;
		name: string;
		explevel: number;
		trophies: number;
		donations: number;
		donationsReceived: number;
	};
};

export default function Home() {
	const [playerTag, setPlayerTag] = useState("");
	const [player2Tag, setPlayer2Tag] = useState("");
	const [playerData, setPlayerData] = useState({});
	const [player2Data, setPlayer2Data] = useState({});
	const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		setLoading(false);
	// 	}, 3000);
	// 	return () => clearTimeout(timer);
	// }, []);

	const submitHandler = async (e: any) => {
		e.preventDefault();
		setLoading(true);
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
					<button type="submit">Compare Ratios!🥊</button>
				</form>
			</header>
			<main>
				{loading ? (
					<h3 className="loader">Calculating...</h3>
				) : (
					<section className="cards">
						<div className="card first">
							<h3 className="title">PlayerTag</h3>
							<h5 className="info">PlayerName</h5>
							<h5 className="info">PlayerXP</h5>
							<h5 className="info">PlayerTrophies</h5>
							<h1 className="ratio">DonationsRatio</h1>
							<div className="ratios">
								<p className="calc">Donations</p>
								<p className="calc">DonationsReceived</p>
							</div>
						</div>
						<div className="card second">
							<h3 className="title">PlayerTag</h3>
							<h5 className="info">PlayerName</h5>
							<h5 className="info">PlayerXP</h5>
							<h5 className="info">PlayerTrophies</h5>
							<h1 className="ratio">DonationsRatio</h1>
							<div className="ratios">
								<p className="calc">Donations</p>
								<p className="calc">DonationsReceived</p>
							</div>
						</div>
					</section>
				)}
			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	let res;
	let tag = "L98JC2LG";
	tag = tag.replace("#", "");
	const URL = `https://clash-ratios.herokuapp.com/api/player/${tag}`;
	try {
		const result = await fetch(URL);
		res = await result.json();
	} catch (error) {
		console.error(error);
		alert("Please try a different tag.");
	} finally {
	}
	return {
		props: {
			data: res,
		},
	};
};
