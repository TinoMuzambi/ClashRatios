import { GetStaticProps } from 'next'

type Props = {
    data: {
      tag: string,
      name: string,
      explevel: number,
      trophies: number,
      donations: number,
      donationsReceived: number
    }
  }

export default function Home() {
  return (
   <>
   <header>
     <form className="form">
      <div className="inputs">
      <input type="text" required placeholder="Enter first player's tag 1️⃣" />
       <p className="vs">vs</p>
       <input type="text" required placeholder="Enter second player's tag 2️⃣" />
      </div>
      <button type="submit">Compare Ratios!🥊</button>
     </form>
   </header>
   <main>
     <section className="cards">
       <div className="card first">
         <h3 className="title">PlayerTag</h3>
         <h5 className="info">PlayerName</h5>
         <h5 className="info">PlayerXP</h5>
         <h5 className="info">PlayerTrophies</h5>
         <h1 className="ratio">DonationsRatio</h1>
         <div className="ratios"><p className="calc">Donations</p>
         <p className="calc">DonationsReceived</p></div>
       </div>
       <div className="card first">
         <h3 className="title">PlayerTag</h3>
         <h5 className="info">PlayerName</h5>
         <h5 className="info">PlayerXP</h5>
         <h5 className="info">PlayerTrophies</h5>
         <h1 className="ratio">DonationsRatio</h1>
         <div className="ratios"><p className="calc">Donations</p>
         <p className="calc">DonationsReceived</p></div>
       </div>
     </section>
   </main>
   </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let res
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
      data: res
    }
  }
}
