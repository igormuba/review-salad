import React from "react";
import { Card, Button } from "react-bootstrap";

const ReviewOnTimeline = props => {
  return (
    <Card>
      <Card.Img variant="top" src={props.imageUrl} />
      <Card.Body>
        <Card.Title>{props.reviewSubject}</Card.Title>
        <Card.Text>{props.reviewPreview}</Card.Text>
        <Button variant="primary">Ver Review</Button>
      </Card.Body>
    </Card>
  );
};

export default ReviewOnTimeline;
