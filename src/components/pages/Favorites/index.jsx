import React, { useContext, useEffect, useState } from "react";
import Container from "./styles";
import { LoadFavorites } from "./Functions/LoadFavorites";
import { Context } from "../../contexts/AuthContext";
import Loader from "../../utilities/Loader";
import Blocks from "../Home/Blocks";

const Favorites = () => {
  const { user, token } = useContext(Context);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    LoadFavorites(user, token, setData)
      .then(() => setIsLoading(false))
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    document.title = "BlackNote | Favoritos";
  }, [user, token]);

  return (
    <Container className="container-fluid">
      <div className="container">
        <p className="fs-2 text-center text-light fw-bold">Favoritos ⭐</p>
        <div className="row">
          {isLoading ? (
            <Loader />
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <Blocks
                title={item.title}
                key={index}
                favoriteValue={item.favorite}
                id={item._id}
              />
            ))
          ) : (
            <p className="fs-2 fw-bold text-light text-center">
              Você ainda não tem notas favoritas 🔎
            </p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Favorites;
