import React from "react";
import { Card, Button, ListGroupItem, ListGroup } from "react-bootstrap";

function ProfileOverview(props) {
  if (!props.userProfile) {
    return <div />;
  }

  let userProfile = props.userProfile.data;
  console.log("userProfile");
  console.log(userProfile);

  const timelineImageStyles = {
    objectFit: "none",
    objectPosition: "center",
    width: "100%",
    maxHeight: "200px",
    marginBottom: "1rem"
  };

  let bio;
  if (userProfile.profile.bio) {
    bio = <Card.Text>{userProfile.profile.bio}</Card.Text>;
  } else {
    bio = (
      <Card.Text>
        <em>Usuário sem bio.</em>
      </Card.Text>
    );
  }

  let socialLinks = [];

  if (userProfile.profile.social) {
    if (userProfile.profile.social.discord) {
      socialLinks.push(
        <ListGroupItem>
          <a href={userProfile.profile.social.discord}>
            <i className="fab fa-discord" />
            &nbsp; Discord
          </a>
        </ListGroupItem>
      );
    }
    if (userProfile.profile.social.facebook) {
      socialLinks.push(
        <ListGroupItem>
          <a href={userProfile.profile.social.facebook}>
            <i className="fab fa-facebook-square" />
            &nbsp; Facebook
          </a>
        </ListGroupItem>
      );
    }
    if (userProfile.profile.social.instagram) {
      socialLinks.push(
        <ListGroupItem>
          <a href={userProfile.profile.social.instagram}>
            <i className="fab fa-instagram" />
            &nbsp; Instagram
          </a>
        </ListGroupItem>
      );
    }
    if (userProfile.profile.social.twitter) {
      socialLinks.push(
        <ListGroupItem>
          <a href={userProfile.profile.social.twitter}>
            <i className="fab fa-twitter-square" />
            &nbsp; Twitter
          </a>
        </ListGroupItem>
      );
    }
    if (userProfile.profile.social.youtube) {
      socialLinks.push(
        <ListGroupItem>
          <a href={userProfile.profile.social.youtube}>
            <i className="fab fa-youtube" />
            &nbsp; Youtube
          </a>
        </ListGroupItem>
      );
    }
  }

  return (
    <Card>
      <Card.Img
        style={timelineImageStyles}
        variant="top"
        src={userProfile.user.avatar}
      />

      <Card.Body>
        <Card.Title>{userProfile.user.name}</Card.Title>
      </Card.Body>

      <ListGroup className="list-group-flush">{socialLinks}</ListGroup>
    </Card>
  );
}

export default ProfileOverview;
