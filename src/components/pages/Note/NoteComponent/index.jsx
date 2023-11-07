import React, { useContext, useState } from "react";
import ContainerNoteComponent from "./styles";
import { AiOutlineLock, AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { PiNotePencilDuotone } from "react-icons/pi";
import { Colors } from "../../../utilities/variables";
import { Context } from "../../../contexts/AuthContext";
import { Favorite, Unfavorite } from "../functions/FavoriteAndUnfavorite";
import { DeleteNote } from "../functions/DeleteNote";
import { Link } from "react-router-dom";

const NoteComponent = ({ title, note, favoriteValue, id }) => {
  const [favorite, setFavorite] = useState(favoriteValue);
  const { user, token } = useContext(Context);

  const favoriteComponent = favorite ? (
    <li
      className="icon-star"
      onClick={() => Unfavorite(setFavorite, favorite, id, user, token)}
      title="Desfavoritar Nota"
    >
      <AiFillStar style={{ color: `${Colors.defaultGreen}` }} />
    </li>
  ) : (
    <li
      className="icon-star"
      onClick={() => Favorite(setFavorite, id, user, token)}
      title="Favoritar Nota"
    >
      <AiOutlineStar style={{ color: `${Colors.defaultGreen}` }} />
    </li>
  );

  return (
    <ContainerNoteComponent className="container-fluid">
      <div className="container">
        <div className="container-nav">
          <nav>
            <ul>
              <li title="Bloquear Nota">
                <AiOutlineLock />
              </li>
              <li
                onClick={() => DeleteNote(id, user, token)}
                title="Deletar Nota"
              >
                <BiTrash />
              </li>
              <li title="Editar Nota">
                <Link to={`/edit/${id}`}>
                  <PiNotePencilDuotone />
                </Link>
              </li>
              {favoriteComponent}
            </ul>
          </nav>
        </div>
        <p className="fs-5">Título:</p>
        <p className="fs-3">{title}</p>
        <div className="note-content">
          <p className="fs-5">Nota:</p>
          <p className="fs-3">{note}</p>
        </div>
      </div>
    </ContainerNoteComponent>
  );
};

export default NoteComponent;
