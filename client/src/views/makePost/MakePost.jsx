import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

function MakePost(user) {
  const [formData, setFormData] = useState({
    preview: "",
    subject: "",
    review: "",
    selectedFile: null,
    redirect: false,
    buttonDisabled: false
  });

  const sendForm = async e => {
    e.preventDefault();
    setFormData({ ...formData, buttonDisabled: true });
    const fd = new FormData();
    fd.append("imageName", formData.selectedFile.name);
    fd.append("image", formData.selectedFile, formData.selectedFile.name);
    fd.append("preview", formData.preview);
    fd.append("subject", formData.subject);
    fd.append("review", formData.review);
    console.log(fd);

    await axios.post("/api/posts/new", fd);
    setFormData({
      ...formData,
      redirect: true,
      user
    });
  };
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileSelected = e => {
    setFormData({
      ...formData,
      selectedFile: e.target.files[0]
    });
  };

  if (formData.redirect) {
    return <Redirect to="/" />;
  } else {
    return (
      <Row>
        <Col sm />

        <Col xs={6}>
          <Form onSubmit={e => sendForm(e)}>
            <Form.Group controlId="image">
              <Form.Label>Imagem (APENAS PNG OU JPG):</Form.Label>
              <Form.Control
                required
                type="file"
                name="image"
                onChange={e => fileSelected(e)}
              />
            </Form.Group>

            <Form.Group controlId="subject">
              <Form.Label>Review de/do/da:</Form.Label>
              <Form.Control
                required
                type="text"
                name="subject"
                onChange={e => onChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="preview">
              <Form.Label>Preview (máx 120 caracteres):</Form.Label>
              <Form.Control
                required
                type="text"
                name="preview"
                onChange={e => onChange(e)}
              />
            </Form.Group>

            <Form.Group controlId="review">
              <Form.Label>O que achou/opinião/análise completa:</Form.Label>
              <Form.Control
                required
                as="textarea"
                name="review"
                onChange={e => onChange(e)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              buttonDisabled={formData.isLoading}
            >
              {!formData.isLoading ? (
                <span>Publicar</span>
              ) : (
                <span>Carregando</span>
              )}
            </Button>
          </Form>
        </Col>

        <Col sm />
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(MakePost);
