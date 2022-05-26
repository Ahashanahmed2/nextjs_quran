import { Card, Row, Col } from "react-bootstrap";
import Classess from "../../../styles/Home.module.css";

import axios from "axios";
 
export default function PageTwoSubject() {
 


  return (
    <Row>
      <Col>
        {surah.map((value, key) => (
          <Card key={key} border="secondary" style={{ width: "100%" }}>
            <Card.Header className="text-center text-dark">
              <div
                className={
                    `${Classess.hover} ${Classess.active} mx-2 px-2 py-1  border border-warning`
                    `${Classess.hover} ${Classess.unActive} mx-2 px-2 py-1 border border-warning`
                }
                to={`/${books}/${value}`}
              >
                {value}
              </div>
            </Card.Header>
          </Card>
        ))}
      </Col>
    </Row>
  );
}
