import React, { useContext, useEffect, useState } from "react";
import Container from "./styles";
import Blocks from "./Blocks";
import { Context } from "../../contexts/AuthContext";
import { LoadMyNotes } from "./functions/LoadMyNotes";
import Loader from "../../utilities/Loader";

const Home = () => {
  const { user, token, handleLogout } = useContext(Context);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Função para carregar as notas do usuário
    LoadMyNotes(user, token, setData, handleLogout)
      .then(() => setIsLoading(false))
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
    document.title = "BlackNote";
  }, [user, token, handleLogout]);

  return (
    <Container className="container-fluid">
      <div className="container">
        <p className="fs-2 text-center text-light fw-bold">BlackNote</p>
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
              Você ainda não tem notas 🔎
            </p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Home;
