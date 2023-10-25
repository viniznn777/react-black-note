import React from "react";
import FormLogin from "./Form";
import Container from "./styles";

const Login = () => {
  return (
    <Container className="container-fluid">
      <div className="container">
        <FormLogin />
      </div>
    </Container>
  );
};

export default Login;
