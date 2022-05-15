
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Index({ data }) {
 
  return (
    <div className={styles.container}>
      {data.map((v,key) => (
        <div key={key}>
         
          <Link href={`/book/${v.book}`}>
          
            <a>{v.book}</a>
          </Link>
          <hr />
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps(context) {
  const data = await fetch("https://tafsir-database.herokuapp.com/book");
 
  const value = await data.json()

  return {
    props: {data:value},
  }
}