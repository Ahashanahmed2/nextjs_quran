import Link from "next/link";

import IndexTopbar from "../../../component/topbar/indexTopbar/index";
import { Card, Tab, ListGroup, Container, Col, Row } from "react-bootstrap";

export default function surah({params, data,value }) {
 

  return (
    <Container fluid>
      <IndexTopbar
        data={value}
        name="surah"
        placeholder={`সুরা ${params.su} তে কোন কিছু সার্চ করুন`}
        book={params.book}
        surah= {params.su}
      />
      <Row>
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
      </Row>
    </Container>
  );
}

export async function getStaticProps(ctx) {
  const { params } = ctx;
  
  const data = await fetch(
    `https://tafsir-database.herokuapp.com/quran/ayat/${params.book}/${params.su}`
  );
  const value = await data.json();
  const dat = await fetch("https://tafsir-database.herokuapp.com/book");

  let val = await dat.json();
  return {
    props: {params:params,data: value ,value:val},
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
