import React, { useEffect, useState } from "react";
import ReviewOnTimeline from "../../../components/reviewPost/ReviewOnTimeline";
import FullReview from "../../../components/reviewPost/FullReview";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

function PublicTimeline() {
  const [usePosts, setPosts] = useState({ reviewOpen: false });

  let posts = [];

  const getPosts = async () => {
    let posts = await axios.get("/api/posts/public");
    setPosts({
      ...usePosts,
      posts: posts.data
    });
  };
  useEffect(() => {
    getPosts();
  }, []);

  const openAPost = (
    postId,
    imageUrl,
    reviewSubject,
    reviewPreview,
    fullReview
  ) => {
    setPosts({
      reviewOpenBool: true,
      reviewOpenObject: {
        postId,
        imageUrl,
        reviewSubject,
        reviewPreview,
        fullReview
      }
    });
  };

  let postsInState = usePosts.posts;
  if (postsInState) {
    postsInState.forEach(post => {
      posts.push(
        <ReviewOnTimeline
          imageUrl={post.imageUrl}
          reviewSubject={post.reviewSubject}
          reviewPreview={post.reviewPreview}
          fullReview={post.fullReview}
          postId={post._id}
          openPost={e =>
            openAPost(
              post._id,
              post.imageUrl,
              post.reviewSubject,
              post.reviewPreview,
              post.fullReview
            )
          }
        />
      );
    });
  }

  let isReviewOpen = usePosts.reviewOpenBool;
  if (isReviewOpen) {
    return (
      <FullReview
        imageUrl={usePosts.reviewOpenObject.imageUrl}
        reviewSubject={usePosts.reviewOpenObject.reviewSubject}
        reviewPreview={usePosts.reviewOpenObject.reviewPreview}
        fullReview={usePosts.reviewOpenObject.fullReview}
        postId={usePosts.reviewOpenObject._id}
      />
    );
  } else {
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
}

export default PublicTimeline;
