// import { GetStaticProps } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";

type PlayerData = {
	tag: string;
	name: string;
	xp: number;
	trophies: number;
	donations: number;
	donationsReceived: number;
};

type Props = {
	title: string;
	description: string;
	keywords: string[];
	url: string;
	image: string;
};

export default function Home({
	title,
	description,
	keywords,
	url,
	image,
}: Props) {
	const [playerTag, setPlayerTag] = useState<string>("");
	const [player2Tag, setPlayer2Tag] = useState<string>("");
	const [playerData, setPlayerData] = useState<PlayerData | {}>({});
	const [player2Data, setPlayer2Data] = useState<PlayerData | {}>({});
	const [loading, setLoading] = useState<Boolean>(true);
	const [fetching, setFetching] = useState<Boolean>(false);

	useEffect(() => {
		let timer: any;
		if (!loading) {
			const playerRatio = playerData.donationsReceived / playerData.donations;
			const player2Ratio =
				player2Data.donationsReceived / player2Data.donations;
			timer = setTimeout(() => {
				if (playerRatio < player2Ratio) {
					document.querySelectorAll(".card").forEach((el) => {
						if (el.classList.contains("first")) {
							el.classList.add("winner");
						} else {
							el.classList.add("loser");
						}
					});
				} else {
					document.querySelectorAll(".card").forEach((el) => {
						if (el.classList.contains("first")) {
							el.classList.add("loser");
						} else {
							el.classList.add("winner");
						}
					});
				}
			}, 2000);
		}
		return () => clearTimeout(timer);
	}, [loading]);

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
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#000000" />
				<meta name="keywords" content={keywords} />
				<meta name="description" content={description} />

				{/* <!-- Google / Search Engine Tags --> */}
				<meta itemProp="name" content={title} />
				<meta itemProp="description" content={description} />
				<meta itemProp="image" content={image} />

				{/* <!-- Facebook Meta Tags --> */}
				<meta property="og:url" content={url} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:image" content={image} />

				{/* <!-- Twitter Meta Tags --> */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={image} />

				<meta charSet="utf-8" />
				<link rel="icon" href="/favicon.ico" />
				<meta name="TinoMuzambi" content="My personal website." />
				<link rel="apple-touch-icon" href="/logo192.png" />
				<link rel="manifest" href="/manifest.json" />
				<title>{title}</title>

				<link rel="preconnect" href="https://api.storyblok.com" />
				<link rel="preconnect" href="https://a.storyblok.com" />
				<link rel="preconnect" href="https://www.google-analytics.com" />
			</Head>
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
								<h3 className="title bold">{player2Data.tag}</h3>
								<h3 className="info bold">{player2Data.name}</h3>
								<h5 className="info">{player2Data.xp}</h5>
								<h5 className="info">
									{player2Data.trophies}{" "}
									<span role="img" aria-label="trophy">
										🏆
									</span>
								</h5>
								<h1 className="ratio bold">
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

Home.defaultProps = {
	title: "ClashRatios 🥊",
	keywords: "clash of clans, next.js, react, api, typescript",
	description:
		"Compare your Clash of Clans donations vs donations received ratios with your friend and see who comes out on top!🏆",
	image: "https://a.storyblok.com/f/105639/512x512/03489159d5/logo512.png",
	url: "https://tinomuzambi.com",
};

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
