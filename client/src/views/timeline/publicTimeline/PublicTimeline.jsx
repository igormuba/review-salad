import React, { useEffect, useState } from "react";
import ReviewOnTimeline from "../../../components/reviewPost/ReviewOnTimeline";
import FullReview from "../../../components/reviewPost/FullReview";
import axios from "axios";
import { Col, Row, Button } from "react-bootstrap";
import ProfileOverview from "../../../components/profile/ProfileOverview";
import FullReviewComment from "../../../components/reviewPost/FullReviewComments";

function PublicTimeline() {
  const [usePosts, setPosts] = useState({});

  let posts = [];

  const getPosts = async () => {
    let firstPosts = await axios.get("/api/posts/public");
    console.log(firstPosts);
    setPosts({
      ...usePosts,
      posts: firstPosts.data
    });
  };
  useEffect(() => {
    getPosts();
  }, []);

  const openAPost = async (
    postId,
    imageUrl,
    reviewSubject,
    reviewPreview,
    fullReview,
    user
  ) => {
    console.log("user");
    console.log(user);

    let userProfile = {};
    if (user) {
      userProfile = await axios.get("/api/profile/profile", {
        params: {
          user: user
        }
      });
    }

    setPosts({
      ...usePosts,
      reviewOpenBool: true,
      reviewOpenObject: {
        postId,
        imageUrl,
        reviewSubject,
        reviewPreview,
        fullReview,
        user,
        userProfile
      }
    });
  };

  let postsInState = usePosts.posts;
  if (postsInState) {
    postsInState.forEach(post => {
      let user = "";
      if (post.user) {
        user = post.user;
      }
      posts.push(
        <ReviewOnTimeline
          imageUrl={post.imageUrl}
          reviewSubject={post.reviewSubject}
          reviewPreview={post.reviewPreview}
          fullReview={post.fullReview}
          postId={post._id}
          openPost={openAPost}
          user={user}
        />
      );
    });
  }
  const loadMorePosts = async () => {
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
          let user = "";
          if (newPost.user) {
            user = newPost.user;
          }
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
              user={user}
              openPost={openAPost}
            />
          );
        });
      }
    }
  };

  const closeFullReview = (loadedPostsOnState, loadedPostsOnTimeline) => {
    posts = loadedPostsOnTimeline;
    setPosts({
      ...usePosts,
      posts: loadedPostsOnState,
      reviewOpenBool: false
    });
  };

  if (usePosts.reviewOpenBool) {
    return (
      <Row>
        <Col />
        <Col xs={6}>
          <FullReview
            closeFullReview={closeFullReview}
            imageUrl={usePosts.reviewOpenObject.imageUrl}
            reviewSubject={usePosts.reviewOpenObject.reviewSubject}
            reviewPreview={usePosts.reviewOpenObject.reviewPreview}
            fullReview={usePosts.reviewOpenObject.fullReview}
            postId={usePosts.reviewOpenObject._id}
            loadedPostsOnState={usePosts.posts}
            loadedPostsOnTimeline={posts}
          />
          <br />
          <FullReviewComment post={usePosts.reviewOpenObject.postId} />
        </Col>
        <Col>
          <ProfileOverview
            user={usePosts.reviewOpenObject.user}
            userProfile={usePosts.reviewOpenObject.userProfile}
          />
        </Col>
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
