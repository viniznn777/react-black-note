import React, { useContext, useState, useEffect } from "react";
import Container from "./styles";
import { useParams } from "react-router-dom";
import NoteComponent from "./NoteComponent";
import { Context } from "../../contexts/AuthContext";
import { LoadNote } from "./functions/LoadNote";
import Loader from "../../utilities/Loader/index";

const Note = () => {
  const { id } = useParams();
  const { user, token } = useContext(Context);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    LoadNote(id, user, token, setData)
      .then(() => setIsLoading(false))
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [id, user, token]);

  return (
    <Container className="container-fluid">
      <div className="container">
        {isLoading ? (
          <Loader />
        ) : data.length > 0 ? (
          data.map((item, index) => (
            <NoteComponent
              title={item.title}
              note={item.content}
              favoriteValue={item.favorite}
              id={item._id}
              key={index}
            />
          ))
        ) : (
          <p className="fs-3 text-light text-center fw-bold">
            Não foi possível mostrar a nota!
          </p>
        )}
      </div>
    </Container>
  );
};

export default Note;
