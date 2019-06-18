import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

const RegisterPage = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({});

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // this.setState({[e.target.name]:e.target.value});
    console.log(formData);
  };

  const sendForm = async e => {
    e.preventDefault();
    console.log("sending form");
    const { name, email, password } = formData;
    register(name, email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <Form onSubmit={e => sendForm(e)}>
        <Form.Group controlId="username">
          <Form.Label>Nome de usuário</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nome"
            name="name"
            onChange={e => onChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="email@email.com"
            name="email"
            onChange={e => onChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Senha"
            name="password"
            onChange={e => onChange(e)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Registrar
        </Button>
      </Form>
    </div>
  );
};

RegisterPage.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(RegisterPage);
