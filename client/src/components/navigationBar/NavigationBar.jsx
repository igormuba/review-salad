import React from "react";
import { Navbar, Nav, Button, NavDropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const NavigationBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <div>
      <Nav>
        <Nav.Link href="/post">
          <Button variant="outline-success">Postar</Button>
        </Nav.Link>
        <Button variant="outline-secondary">
          <NavDropdown
            title={
              <>
                <i className="far fa-user-circle" />
                <span>Perfil</span>
              </>
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="/profile">
              <i className="far fa-user-circle" />
              Perfil
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>
              <i className="fas fa-sign-out-alt" />
              Sair
            </NavDropdown.Item>
          </NavDropdown>
        </Button>
      </Nav>
    </div>
  );
  const guestLinks = (
    <div>
      <NavDropdown title="Perfil" id="basic-nav-dropdown">
        <NavDropdown.Item href="/login">
          <i className="far fa-user-circle" />
          Login
        </NavDropdown.Item>
        <NavDropdown.Item href="/register">
          <i className="far fa-user-circle" />
          Registrar
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Review-Salad</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        {!loading && isAuthenticated ? authLinks : guestLinks}
      </Navbar>
    </div>
  );
};

NavigationBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(NavigationBar);
