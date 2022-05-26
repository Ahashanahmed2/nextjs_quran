import IndexTopbar from "../../component/topbar/indexTopbar/index";
import { Card, Tab, ListGroup, Container, Col, Row } from "react-bootstrap";
import Link from "next/link";

export default function book({ books, surah, value }) {

  

  return (
    <Container fluid>
      <IndexTopbar
        data={value}
        name="book"
        placeholder={`সুরা ${books} তে কোন কিছু সার্চ করুন`}
        book= {books}
      />
      
      <div className="text-center">
      <h3 className="mt-2 ">কোরআন শরিফের বঙ্গানুবাদ</h3>
      <Row sm={2} xs={1} md={5}>
          {surah.map((v, k) => (
            <div key={k}>
              <div> book : {books}</div>

              <Link href={`/surah/${books}/${v}`}>
                <a>{v}</a>
              </Link>
            </div>
          ))}
       </Row>
      </div>
      </Container>
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
  const dat = await fetch("https://tafsir-database.herokuapp.com/book");

  let val = await dat.json();

  return {
    props: { books: book, surah: bb,value:val },
  };
}

export async function getStaticPaths() {
  const data = await fetch("https://tafsir-database.herokuapp.com/book");
  const valu = await data.json();

  let va = valu.map((v) => {
    return {
      params: { id: `${v.book}` },
    };
  });
  return {
    paths: va,
    fallback: false, // false or 'blocking'
  };
}
