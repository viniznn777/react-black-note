import React from "react";
import Container from "./styles";
import Form from "./Form";

const EditNote = () => {
  return (
    <Container className="container-fluid">
      <div className="container">
        <p className="fs-1 fw-bold text-light text-center">Editar nota 🖊</p>
        <Form />
      </div>
    </Container>
  );
};

export default EditNote;
