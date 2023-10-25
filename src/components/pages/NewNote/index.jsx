import React, { useContext, useState } from "react";
import Container from "./styles";
import { capitalize } from "../../utilities/capitalize";
import SendData from "./SendData";
import { Context } from "../../contexts/AuthContext";

const NewNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user, token } = useContext(Context);
  const author = user;

  return (
    <Container className="container-fluid">
      <div className="container">
        <p className="fs-1 fw-bold text-light text-center">Criar nota ➕</p>
        <form
          method="post"
          onSubmit={(event) =>
            SendData(
              event,
              title,
              content,
              setTitle,
              setContent,
              author,
              user,
              token
            )
          }
        >
          <div className="container-input">
            <input
              type="text"
              maxLength={21}
              placeholder="Título"
              onChange={(e) => setTitle(capitalize(e.target.value))}
              value={title}
            />
          </div>
          <div className="container-textarea">
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="10"
              placeholder="Notas"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
          </div>
          <button>Guardar</button>
        </form>
      </div>
    </Container>
  );
};

export default NewNote;
