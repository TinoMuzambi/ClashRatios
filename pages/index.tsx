import { GetStaticProps } from 'next'

type Props = {
    data: string
  }

export default function Home({data} : Props) {
  return (
    <h1>Hello {data}</h1>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      data: "Tino"
    }
  }
}
