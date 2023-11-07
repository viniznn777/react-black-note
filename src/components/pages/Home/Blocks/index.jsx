import React, { useContext, useState } from "react";
import Container from "./styles";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Context } from "../../../contexts/AuthContext";
import { Colors } from "../../../utilities/variables";
import {
  Favorite,
  Unfavorite,
} from "../../Note/functions/FavoriteAndUnfavorite";

const Blocks = ({ title, favoriteValue, id }) => {
  const [favorite, setFavorite] = useState(favoriteValue);
  const { user, token } = useContext(Context);

  const favoriteComponent = favorite ? (
    <div
      className="icon-star"
      onClick={() => Unfavorite(setFavorite, favorite, id, user, token)}
    >
      <AiFillStar style={{ color: `${Colors.defaultGreen}` }} />
    </div>
  ) : (
    <div
      className="icon-star"
      onClick={() => Favorite(setFavorite, id, user, token)}
    >
      <AiOutlineStar style={{ color: `${Colors.defaultGreen}` }} />
    </div>
  );

  return (
    <Container className="col-lg-3">
      {favoriteComponent}
      <div className="title">
        <Link to={`/note/${id}`}>
          <p className="fs-4 text-light">{title}</p>
        </Link>
      </div>
    </Container>
  );
};

export default Blocks;
