import React, { useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import LoginForm from '../components/LoginForm.jsx';
// CSS import is removed as it is being handled in app.jsx

function Login(props) {

  return (
    <>
      <Header auth={props.auth} admin={props.admin} runCheck={props.runCheck} />
      <div className="hero">
        <img src="\hero_image_2.png" alt="Auction Event" />
      </div>
      <LoginForm runCheck={props.runCheck}/>
      <Footer />
    </>
  );
}

export default Login;
