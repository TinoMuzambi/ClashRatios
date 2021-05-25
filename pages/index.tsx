import { GetStaticProps } from 'next'


export default function Home({data}) {
  return (
    <h1>Hello {data}</h1>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      data: "Tino"
    }
  }
}