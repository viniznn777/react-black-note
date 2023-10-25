import React, { useContext, useEffect, useState } from "react";
import Container from "./styles";
import Blocks from "./Blocks";
import { Context } from "../../contexts/AuthContext";
import { LoadMyNotes } from "./functions/LoadMyNotes";

const Home = () => {
  const { user, token, handleLogout } = useContext(Context);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Função para carregar as notas do usuário
    LoadMyNotes(user, token, setData, handleLogout);
  }, [user, token, handleLogout]);

  return (
    <Container className="container-fluid">
      <div className="container">
        <p className="fs-2 text-center text-light fw-bold">BlackNote</p>
        <div className="row">
          {data.length > 0 ? (
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
