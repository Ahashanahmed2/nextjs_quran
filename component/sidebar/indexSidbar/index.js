import { Container, Row, Col, ListGroup, Card, Tab } from "react-bootstrap";
import Classess from "../../../styles/Home.module.css";
import Link from "next/link";

import axios from "axios";
export default function IndexSidebar({ data }) {
  return (
    <Col className="d-md-block d-none">
      {data.map((value, key) => (
        <Card key={key} border="secondary" style={{ width: "100%" }}>
          <Card.Header className="text-center text-dark">
            <Link
              className="text-warning"
              href={`/book/${value.book}`}
              passHref
            >
              {value.book}
            </Link>
          </Card.Header>
        </Card>
      ))}
    </Col>
  );
}
