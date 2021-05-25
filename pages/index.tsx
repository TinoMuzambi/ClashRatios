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

export default function Home({data} : Props) {
  return (
    <h1>Hello {data.name}</h1>
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
