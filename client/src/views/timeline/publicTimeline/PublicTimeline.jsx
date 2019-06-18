import React, { useEffect, useState } from "react";
import ReviewOnTimeline from "../../../components/reviewPost/ReviewOnTimeline";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

function PublicTimeline() {
  const [usePosts, setPosts] = useState({});

  let posts = [];

  const getPosts = async () => {
    let posts = await axios.get("/api/posts/public");
    console.log("axiospost");
    console.log(posts.data);
    setPosts({
      ...usePosts,
      posts: posts.data
    });
  };
  useEffect(() => {
    getPosts();
  }, []);

  let postsInState = usePosts.posts;
  if (postsInState) {
    postsInState.forEach(post => {
      let postBody = {
        imageUrl: post.imageUrl,
        reviewSubject: post.reviewSubject,
        reviewPreview: post.reviewPreview
      };
      console.log("post");
      console.log(post);
      console.log("postBody");
      console.log(postBody);
      posts.push(
        <ReviewOnTimeline
          imageUrl={postBody.imageUrl}
          reviewSubject={postBody.reviewSubject}
          reviewPreview={postBody.reviewPreview}
        />
      );
    });
  }

  // for (let post, index in usePosts.posts) {

  // }

  return (
    <Row>
      <Col />
      <Col xs={5}>
        <div>{posts}</div>
      </Col>
      <Col />
    </Row>
  );
}

export default PublicTimeline;
