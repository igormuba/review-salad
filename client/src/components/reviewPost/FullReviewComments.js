import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";

function FullReviewComments(props) {
  let [getComment, setComment] = useState({ isLoading: true, comments: [] });

  const editCommentBody = e => {
    setComment({
      ...getComment,
      comment: e.target.value
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  let comentarios = [];
  const getComments = async () => {
    let commentsRetrieved = await axios.get("/api/posts/comment/post", {
      params: {
        post: props.post
      }
    });
    console.log("commentsRetrieved");

    console.log(commentsRetrieved);
    let commentsData = commentsRetrieved.data;
    if (commentsData) {
      commentsData.forEach(async comment => {
        let userProfile = await axios.get("/api/profile/profile", {
          params: {
            user: comment.user
          }
        });
        console.log("userProfile");

        console.log(userProfile);
        let commentsInState = getComment.comments;
        commentsInState.push({
          ...comment,
          user: userProfile
        });
        setComment({
          ...getComment,
          commments: commentsInState
        });
      });
    }

    console.log("getComment");
    console.log(getComment);
  };

  const sendComment = async e => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    let post = props.post;

    let comment = getComment.comment;
    let body = JSON.stringify({ comment, post });
    await axios.post("/api/posts/comment/post", body, config);
  };
  let makeCommentBody;
  if (props.isAuthenticated) {
    makeCommentBody = (
      <Card>
        <Card.Header as="h5">Comentar</Card.Header>
        <Card.Body>
          <Form onSubmit={e => sendComment(e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                as="textarea"
                placeholder="Seu comentário"
                onChange={e => editCommentBody(e)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Postar comentário
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  } else {
    makeCommentBody = (
      <Card>
        <Card.Header as="h5">Comentar</Card.Header>
        <Card.Body>
          <Button variant="outline-success" href="/login">
            Login
          </Button>
          &nbsp;ou&nbsp;
          <Button variant="outline-warning" href="/register">
            Registrar
          </Button>
          &nbsp; para comentar
        </Card.Body>
      </Card>
    );
  }

  let commentsInState = getComment.commments;

  if (commentsInState) {
    commentsInState.forEach(async comment => {
      console.log("comment");
      console.log(comment);

      comentarios.push(
        <Card key={comment.date}>
          <Card.Header as="h5">{comment.user.data.user.name}</Card.Header>
          <Card.Body>{comment.comment}</Card.Body>
        </Card>
      );
    });
  }

  if (getComment.commments) {
    return (
      <div>
        {makeCommentBody}
        <br />
        {comentarios}
      </div>
    );
  } else {
    return <div>{makeCommentBody}</div>;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(FullReviewComments);
