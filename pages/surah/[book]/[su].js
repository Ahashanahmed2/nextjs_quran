import Link from "next/link";
export default function surah({ data }) {

  return (
    <div>
      {data.map((v, k) => (
        <div key={k}>
          <div>name : {v.name}</div>
          <div> book : {v.book}</div>
          <div> AYAT : {v.number}</div>
          <div> versesNumber : {v.versesNumber}</div>
          <div> verses : {v.verses}</div>
         
          <hr />
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps(ctx) {
  const { params } = ctx;
  
  const data = await fetch(
    `https://tafsir-database.herokuapp.com/quran/ayat/${params.book}/${params.su}`
  );
  const value = await data.json();

  return {
    props: { data: value },
  };
}

export async function getStaticPaths() {
  const data = await fetch("https://tafsir-database.herokuapp.com/quran");
  const valu = await data.json();
 
  let surah;
  let name = new Set();
  valu.map(v => {
    
     
     
    name.add(v.name);
    surah = Array.from(name);
  
  })

  let va = valu.map((v,key) => {
 
    
        return {
          params: { book: `${v.book}`, su: `${surah[key]}` },
        };
    
  
  });
 
  return {
    paths: va,
    fallback: false, // false or 'blocking'
  };
}
