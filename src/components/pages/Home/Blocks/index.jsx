import React, { useState } from "react";
import Container from "./styles";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const Blocks = ({ title, favoriteValue, id }) => {
  const [favorite, setFavorite] = useState(favoriteValue);

  const toogleFavorite = () => {
    // "!" ivertendo o valor da variável que está atualmente.
    setFavorite(!favorite);
  };

  const favoriteComponent = favorite ? (
    <AiFillStar />
  ) : (
    <AiOutlineStar style={{ color: "#a8a8a8" }} />
  );

  return (
    <Container className="col-lg-3">
      <div className="icon-star" onClick={toogleFavorite}>
        {favoriteComponent}
      </div>
      <div className="title">
        <p className="fs-4 text-light">{title}</p>
      </div>
    </Container>
  );
};

export default Blocks;
