import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { updateProfile, getCurentProfile } from "../../actions/profile";
import store from "../../store";

const ProfileForm = ({ profile, updateProfile, getCurentProfile }) => {
  useEffect(() => {
    store.dispatch(getCurentProfile);
  }, []);

  const [formData, setFormData] = useState({
    bio: "",
    youtube: "",
    twitter: "",
    facebook: "",
    instagram: "",
    discord: ""
  });

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // this.setState({[e.target.name]:e.target.value});
    console.log(formData);
  };

  const { bio, youtube, twitter, facebook, instagram, discord } = formData;
  const sendForm = async e => {
    e.preventDefault();
    console.log("sending form");

    updateProfile(bio, youtube, twitter, facebook, instagram, discord);
    console.log("form sent");
  };
  console.log(profile);
  // let bio, youtube, twitter;

  return (
    <Form onSubmit={e => sendForm(e)}>
      <Form.Group controlId="bio">
        <Form.Label>Bio:</Form.Label>
        <Form.Control
          defaultValue={bio}
          name="bio"
          type="text"
          onChange={e => onChange(e)}
        />
      </Form.Group>
      <Form.Group controlId="youtube">
        <Form.Label>youtube:</Form.Label>
        <Form.Control name="youtube" type="text" onChange={e => onChange(e)} />
      </Form.Group>
      <Form.Group controlId="twitter">
        <Form.Label>twitter:</Form.Label>
        <Form.Control name="twitter" type="text" onChange={e => onChange(e)} />
      </Form.Group>
      <Form.Group controlId="facebook">
        <Form.Label>facebook:</Form.Label>
        <Form.Control name="facebook" type="text" onChange={e => onChange(e)} />
      </Form.Group>
      <Form.Group controlId="instagram">
        <Form.Label>instagram:</Form.Label>
        <Form.Control
          name="instagram"
          type="text"
          onChange={e => onChange(e)}
        />
      </Form.Group>
      <Form.Group controlId="discord">
        <Form.Label>discord:</Form.Label>
        <Form.Control name="discord" type="text" onChange={e => onChange(e)} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { updateProfile, getCurentProfile }
)(ProfileForm);
