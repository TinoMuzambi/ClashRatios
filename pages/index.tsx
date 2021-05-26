import { useState, useEffect } from "react";
import Head from "next/head";
import { PlayerData, Props } from "../interfaces";
import Card from "../components/Card";

export default function Home({
	title,
	description,
	keywords,
	url,
	image,
}: Props) {
	const [playerTag, setPlayerTag] = useState("");
	const [player2Tag, setPlayer2Tag] = useState("");
	const [playerData, setPlayerData] = useState<PlayerData | any>({});
	const [player2Data, setPlayer2Data] = useState<PlayerData | any>({});
	const [loading, setLoading] = useState(true);
	const [fetching, setFetching] = useState(false);

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
							<Card playerData={playerData} cardClass={true} />
							<Card playerData={player2Data} cardClass={false} />
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
	url: "https://clashratios.tinomuzambi.com/",
};
