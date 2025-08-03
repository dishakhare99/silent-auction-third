import React, { useState } from "react";
// CSS import is removed as it is being handled in app.jsx
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import RegisterForm from '../components/RegisterForm.jsx';

function Register(props) {

  return (
    <>
      <Header auth={props.auth} admin={props.admin} runCheck={props.runCheck} />
      <div className="hero">
        <img src="\hero_image_2.png" alt="Auction Event" />
      </div>
      <RegisterForm runCheck={props.runCheck} />
      <Footer />
    </>
  );
}

export default Register;
