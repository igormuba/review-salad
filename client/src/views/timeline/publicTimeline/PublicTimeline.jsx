import React, { useEffect, useState } from "react";
import ReviewOnTimeline from "../../../components/reviewPost/ReviewOnTimeline";
import FullReview from "../../../components/reviewPost/FullReview";
import axios from "axios";
import { Col, Row, Button } from "react-bootstrap";

function PublicTimeline() {
  const [usePosts, setPosts] = useState({ reviewOpen: false });

  let posts = [];

  const getPosts = async () => {
    let firstPosts = await axios.get("/api/posts/public");

    setPosts({
      ...usePosts,
      posts: firstPosts.data
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
  const loadMorePosts = async () => {
    console.log("LOADING MORE POSTS");
    let postsInState = usePosts.posts;
    if (postsInState) {
      let lastPostDate = postsInState[posts.length - 1].date;
      let morePosts = await axios.get("/api/posts/public/more", {
        params: {
          createdOnBefore: lastPostDate
        }
      });
      if (morePosts.data) {
        morePosts.data.forEach(newPost => {
          let loadedPosts = usePosts.posts;
          loadedPosts.push(newPost);
          setPosts({
            ...usePosts,
            posts: loadedPosts
          });
          posts.push(
            <ReviewOnTimeline
              imageUrl={newPost.imageUrl}
              reviewSubject={newPost.reviewSubject}
              reviewPreview={newPost.reviewPreview}
              fullReview={newPost.fullReview}
              postId={newPost._id}
              openPost={e =>
                openAPost(
                  newPost._id,
                  newPost.imageUrl,
                  newPost.reviewSubject,
                  newPost.reviewPreview,
                  newPost.fullReview
                )
              }
            />
          );
        });
      }
    }
  };

  let isReviewOpen = usePosts.reviewOpenBool;
  if (isReviewOpen) {
    return (
      <Row>
        <Col />
        <Col xs={6}>
          <FullReview
            imageUrl={usePosts.reviewOpenObject.imageUrl}
            reviewSubject={usePosts.reviewOpenObject.reviewSubject}
            reviewPreview={usePosts.reviewOpenObject.reviewPreview}
            fullReview={usePosts.reviewOpenObject.fullReview}
            postId={usePosts.reviewOpenObject._id}
          />
        </Col>
        <Col />
      </Row>
    );
  } else {
    return (
      <Row>
        <Col />
        <Col xs={6}>
          <div>{posts}</div>
          <Button
            size="lg"
            block
            variant="outline-success"
            onClick={e => loadMorePosts()}
          >
            Carregar mais
          </Button>
        </Col>
        <Col />
      </Row>
    );
  }
}

export default PublicTimeline;
