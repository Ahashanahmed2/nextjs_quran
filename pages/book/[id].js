import Link from "next/link";
export default function book({books,surah}) {
   
  return (
    <div>
      
     
      {surah.map((v, k) => (
        <div key={k}>
          <div> book : {books}</div>
          
  <Link href={`/surah/${books}/${v}`}>
    <a>{v}</a>
  </Link>

          
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps(ctx) {
  const { params } = ctx;
  let book = params.id;
  const data = await fetch(
    `https://tafsir-database.herokuapp.com/quran/${params.id}`
  );
  const value = await data.json();
  let surah = new Set();
  value.map((values) => {
    surah.add(values.name);
  });

  let bb = Array.from(surah);
   

  return {
    props: { books: book,surah:bb},
  };
  }

export async function getStaticPaths() {
  const data = await fetch("https://tafsir-database.herokuapp.com/book");
  const valu = await data.json();

  let va = valu.map((v) => {
    return {
      params: { id: `${v.book}` }
    };
  });
  return {
    paths: va,
    fallback: false, // false or 'blocking'
  };
}
