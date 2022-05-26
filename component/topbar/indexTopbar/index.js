import {
  ListGroup,
  Card,
  Tab,
  Row,
  Dropdown,
  Form,
  FormControl,
  Navbar,
  Col,
  Container,
} from "react-bootstrap";
import { useState } from "react";
import Classess from "../../../styles/Home.module.css";
import axios from "axios";
import Link from "next/link";
export default function Index({ data, name, placeholder, book, surah }) {
  const [change, setChange] = useState("");
  const [focus, setfocus] = useState("d-block");

  const [Index, setIndex] = useState([]);
  const [books, setBook] = useState([]);
  const [surahs, setSurahs] = useState([]);

  let pageOnfocus = () => {
    setfocus("d-none");
    if (change == "") {
      setIndex([]);
      setBook([]);
      setSurahs([]);
    }
  };

  let pageOnblur = () => {
    setfocus("d-block");
    if (change == "") {
      setIndex([]);
      setBook([]);
      setSurahs([]);
    }
  };

  let pageOnchange = (e) => {
    setChange(e.target.value);
    if (e.target.name === "index") {
      axios
        .get(`https://tafsir-database.herokuapp.com/quran/subjectOne/${e.target.value}`)
        .then((value) => {
          setIndex(value.data);
        })
        .catch((err) => {
          console.log({ message: err });
        });
    } else if (e.target.name === "book") {
      axios
        .get(
          `https://tafsir-database.herokuapp.com/quran/subject/${book}/${e.target.value}`
        )
        .then((value) => {
          setBook(value.data);
        })
        .catch((err) => {
          console.log({ message: err });
        });
    } else if (e.target.name === "surah") {
      axios
        .get(
          `https://tafsir-database.herokuapp.com/quran/subjectThree/${book}/${surah}/${e.target.value}`
        )
        .then((value) => {
          setSurahs(value.data);
        })
        .catch((err) => {
          console.log({ message: err });
        });
    } else {
      console.log("ahsan");
    }
  };

  return (
    <div>
      <Navbar sticky="top" expand={false} className="bg-warning">
        <Container fluid>
          <Col className={focus}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {book ? book : "book name"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {data.map((v, i) => (
                  <div key={i}>
                    <Dropdown.Item href={`/book/${v.book}`}>
                      {v.book}
                    </Dropdown.Item>
                  </div>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <div className="py-1">
              <Form>
                <FormControl
                  type="search"
                  placeholder={placeholder}
                  name={name}
                  value={change}
                  onFocus={() => pageOnfocus()}
                  onBlur={() => pageOnblur()}
                  onChange={(e) => pageOnchange(e)}
                />
              </Form>
            </div>
          </Col>
        </Container>
      </Navbar>

      {Index &&
        Index.map((value, key) => (
          <Row key={key}>
            <Col>
              <Card border="secondary" style={{ width: "100%" }}>
                <Card.Header className="d-flex bg-dark bg-opacity-10 text-dark">
                  <Col> {value.book}</Col>
                  <Col>
                    {value.number} - {value.name}
                  </Col>
                </Card.Header>
                <Card.Body className="bg-info opacity-10">
                  <Card.Text>
                    <div className="bg-secondary text-light p-1">
                      <div className="d-flex font-weight-bold">
                        <p>
                          ${value.verses}
                          <span className="bg-warning text-dark mx-2 p-1 font-weight-bold">
                            [{value.name} - {value.number}:{value.versesNumber}]
                          </span>
                        </p>
                      </div>
                    </div>
                    <Tab.Container id="list-group-tabs-example">
                      <Row>
                        <Col>
                          <ListGroup>
                            <ListGroup.Item action href="#link1">
                              সারসংক্ষেপ
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link2">
                              আনুসঞ্জিক বিষয়
                            </ListGroup.Item>
                          </ListGroup>
                        </Col>
                      </Row>
                      <Row className="bg-light bg-opacity-10">
                        <Col>
                          <Tab.Content>
                            <Tab.Pane eventKey="#link1">
                              {value.summary}
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link2">
                              {value.ancillary_issue}
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      {books &&
        books.map((value, key) => (
          <Row key={key}>
            <Col>
              <Card border="secondary" style={{ width: "100%" }}>
                <Card.Header className="d-flex bg-dark bg-opacity-10 text-dark">
                  <Col>{value.book}</Col>
                  <Col>
                    {value.number} :- {value.name}
                  </Col>
                </Card.Header>
                <Card.Body className="bg-info opacity-10">
                  <Card.Text>
                    <div className="bg-secondary text-light p-1">
                      <div className="d-flex text font-weight-bold">
                        <p>
                          {value.verses}
                          <span className="bg-warning text-dark mx-2 p-1 font-weight-bold">
                            [{value.name} - {value.number}:{value.versesNumber}]
                          </span>
                        </p>
                      </div>
                    </div>
                    <Tab.Container id="list-group-tabs-example">
                      <Row>
                        <Col>
                          <ListGroup>
                            <ListGroup.Item action href="#link1">
                              সারসংক্ষেপ
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link2">
                              আনুসঞ্জিক বিষয়
                            </ListGroup.Item>
                          </ListGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Tab.Content>
                            <Tab.Pane eventKey="#link1">
                              {value.summary}
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link2">
                              {value.ancillary_issue}
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      
      {surahs && surahs.length > 0 && surahs.map((value, key) => (
        <Row key={key}>
          <Col>
            <Card border="secondary" style={{ width: "100%" }}>
              <Card.Header className="d-flex bg-dark bg-opacity-10 text-dark">
                <Col>{value.book}</Col>
                <Col>
                  {value.number} :- {value.name}
                </Col>
              </Card.Header>
              <Card.Body className="bg-info opacity-10">
                <Card.Text>
                  <div className="bg-secondary text-light p-1">
                    <div className="d-flex text font-weight-bold">
                      <p>
                        {value.verses}
                        <span className="bg-warning text-dark mx-2 p-1 font-weight-bold">
                          [{value.name} - {value.number}:{value.versesNumber}]
                        </span>
                      </p>
                    </div>
                  </div>
                  <Tab.Container id="list-group-tabs-example">
                    <Row>
                      <Col>
                        <ListGroup>
                          <ListGroup.Item action href="#link1">
                            সারসংক্ষেপ
                          </ListGroup.Item>
                          <ListGroup.Item action href="#link2">
                            আনুসঞ্জিক বিষয়
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Tab.Content>
                          <Tab.Pane eventKey="#link1">{value.summary}</Tab.Pane>
                          <Tab.Pane eventKey="#link2">
                            {value.ancillary_issue}
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </div>
  );
}
