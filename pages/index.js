
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import IndexSidebar from '../component/topbar/indexTopbar/index';
import IndexTopbar from '../component/topbar/indexTopbar';
import { Card, Tab, ListGroup, Container, Col, Row } from "react-bootstrap";
export default function Index({data}) {
 
  return (
    <Container fluid>
      <IndexTopbar
        data={data}
        name="index"
        placeholder='সকল তাফসির বইয়ে কোন কিছু সার্চ করুন'
      />
      <Row>
        <Col className="bg-dark text-light ">
          <Row>
            <Col>
              {data.map((value, key) => (
                <Card key={key} border="secondary" style={{ width: "100%" }}>
                  <Card.Header className="bg-dark bg-opacity-10 text-dark text-center">
                    {value.book}
                  </Card.Header>
                  <Card.Body className="bg-info opacity-10">
                    <Card.Text>
                      <Tab.Container id="list-group-tabs-example">
                        <Row>
                          <Col>
                            <ListGroup>
                              <ListGroup.Item action href="#link1">
                                লেখক পরিচিতি
                              </ListGroup.Item>

                              <ListGroup.Item action href="#link2">
                                ওহির তাৎপর্য
                              </ListGroup.Item>

                              <ListGroup.Item action href="#link3">
                                কোরআন নাজিলের ইতিহাস
                              </ListGroup.Item>

                              <ListGroup.Item action href="#link4">
                                কোরআন সংরক্ষনের ইতিহাস
                              </ListGroup.Item>

                              <ListGroup.Item action href="#link5">
                                তাফসির সম্পর্কে ভুল ধারণা
                              </ListGroup.Item>
                            </ListGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Tab.Content className="text-dark">
                              <Tab.Pane eventKey="#link1">
                                {value.Author_Introduction}
                              </Tab.Pane>
                              <Tab.Pane eventKey="#link2">
                                {value.Meaning_of_Revelation}
                              </Tab.Pane>
                              <Tab.Pane eventKey="#link3">
                                {value.History_of_Quran_Revelation}
                              </Tab.Pane>
                              <Tab.Pane eventKey="#link4">
                                {value.History_of_Preservation_of_Quran}
                              </Tab.Pane>
                              <Tab.Pane eventKey="#link5">
                                {value.Misconceptions_about_Tafsir}
                              </Tab.Pane>
                            </Tab.Content>
                          </Col>
                        </Row>
                      </Tab.Container>
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export async function getStaticProps(context) {
  const data = await fetch("https://tafsir-database.herokuapp.com/book");

  const value = await data.json();

  return {
    props: {data:value},
  }
}