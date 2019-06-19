import React from "react";
import { Card, Button } from "react-bootstrap";

const FullReview = props => {
  console.log(props);
  return (
    <Card>
      <Card.Img variant="top" src={props.imageUrl} />
      <Card.ImgOverlay>
        <Button
          variant="warning"
          onClick={() =>
            props.closeFullReview(
              props.loadedPostsOnState,
              props.loadedPostsOnTimeline
            )
          }
        >
          <i className="far fa-times-circle" />
        </Button>
      </Card.ImgOverlay>
      <Card.Body>
        <Card.Title>{props.reviewSubject}</Card.Title>
        <Card.Text>{props.fullReview}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FullReview;
