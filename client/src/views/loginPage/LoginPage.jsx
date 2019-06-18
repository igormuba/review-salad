import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const LoginPage = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const changeName = e => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const changePassword = e => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const sendForm = e => {
    e.preventDefault();
    const { email, password } = formData;
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <Form onSubmit={e => sendForm(e)}>
        <Form.Group controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            required="true"
            name="email"
            type="email"
            placeholder="email@email.com"
            onChange={e => changeName(e)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            required="true"
            name="password"
            type="password"
            placeholder="Senha"
            onChange={e => changePassword(e)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Entrar
        </Button>
      </Form>
    </div>
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(LoginPage);
