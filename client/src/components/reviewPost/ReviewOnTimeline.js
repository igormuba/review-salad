import React from "react";
import { Card, Button } from "react-bootstrap";

const ReviewOnTimeline = props => {
  const timelineImageStyles = {
    objectFit: "none",
    objectPosition: "center",
    width: "100%",
    maxHeight: "300px",
    marginBottom: "1rem"
  };

  return (
    <Card>
      <Card.Img
        style={timelineImageStyles}
        id="thumbnailImage"
        variant="top"
        src={props.imageUrl}
      />
      <Card.Body>
        <Card.Title>{props.reviewSubject}</Card.Title>
        <Card.Text>{props.reviewPreview}</Card.Text>
        <Button
          variant="primary"
          onClick={e =>
            props.openPost(
              props.postId,
              props.imageUrl,
              props.reviewSubject,
              props.reviewPreview,
              props.fullReview
            )
          }
        >
          Ver Review
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ReviewOnTimeline;
