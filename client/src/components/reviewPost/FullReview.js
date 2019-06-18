import React from "react";
import { Card, Button } from "react-bootstrap";

const FullReview = props => {
  console.log(props);
  return (
    <Card>
      <Card.Img variant="top" src={props.imageUrl} />
      <Card.Body>
        <Card.Title>{props.reviewSubject}</Card.Title>
        <Card.Text>{props.fullReview}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FullReview;
