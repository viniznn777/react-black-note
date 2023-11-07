import React, { useState, useContext, useEffect } from "react";
import ContainerForm from "./styles";
import { capitalize } from "../../../utilities/capitalize";
import { Context } from "../../../contexts/AuthContext";
import { LoadNote } from "../functions/LoadMyNote";
import { useParams } from "react-router-dom";
import Loader from "../../../utilities/Loader";
import { SendDataForm } from "../functions/SendData";

const Form = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useContext(Context);

  useEffect(() => {
    LoadNote(id, user, token, setTitle, setContent)
      .then(() => setIsLoading(false))
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id, user, token]);

  return (
    <ContainerForm className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <form
          method="post"
          onSubmit={(event) =>
            SendDataForm(event, id, user, token, title, content)
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
          <button>Editar</button>
        </form>
      )}
    </ContainerForm>
  );
};

export default Form;
