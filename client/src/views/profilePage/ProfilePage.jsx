import React/*, { Component, useState }*/ from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import {setAlert} from '../../actions/alert';
import {Container, Row, Col} from 'react-bootstrap';
import ProfileForm from '../../components/profile/ProfileForm';

function ProfilePage() {
    
    return (
       <Container>
        <ProfileForm/>
       </Container>
    )
}

const mapStateToProps = state=>({
    profile: state.profile
});

export default connect(mapStateToProps)(ProfilePage);