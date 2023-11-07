import React, { useContext } from "react";
import Header from "./styles";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineStar } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";
import { Context } from "../../contexts/AuthContext";

const NavBar = () => {
  const { handleLogout, authenticated } = useContext(Context);

  return (
    <Header>
      {authenticated ? (
        <nav>
          <ul>
            <li>
              <Link to="/">
                <AiOutlineHome />
              </Link>
            </li>
            <li>
              <Link to="/new-note" className="plus">
                <BsPlusCircleFill />
              </Link>
            </li>
            <li>
              <Link to="/favorites">
                <AiOutlineStar />
              </Link>
            </li>
            <li>
              <button
                className="bg-transparent"
                onClick={handleLogout}
                title="Sair"
              >
                <MdLogout />
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        <p className="fs-3 text-center fw-bold">BlackNote</p>
      )}
    </Header>
  );
};

export default NavBar;
