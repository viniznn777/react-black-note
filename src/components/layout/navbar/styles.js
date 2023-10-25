import styled from "styled-components";
import { Colors } from "../../utilities/variables";

const { defaultGreen } = Colors;

const Header = styled.header`
  z-index: 999;
  width: 60px;
  height: 100vh;
  background-color: #131313;
  position: absolute;
  position: fixed;
  margin-right: 45px;
  p.fs-3 {
    writing-mode: vertical-lr;
    text-orientation: upright;
    white-space: nowrap;
    height: 100%;
    padding-left: 10px;
    color: ${defaultGreen};
    letter-spacing: 1.1rem;
  }
  nav {
    width: 100%;
    height: 100%;
    ul {
      list-style: none;
      padding: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-evenly;
      button {
        border: none;
        outline: none;
        color: #fff;
        &:hover {
          color: ${defaultGreen};
        }
      }
      li a {
        color: #fff;
        font-size: 1.2rem;
        &:hover {
          color: ${defaultGreen};
        }
      }
      .plus {
        font-size: 1.4rem;
        color: ${defaultGreen};
      }
    }
  }

  @media screen and (max-width: 658px) {
    width: 100%;
    height: 50px;
    bottom: 0;
    p.fs-3 {
      writing-mode: horizontal-tb;
      white-space: nowrap;
      height: 100%;
      padding-left: 10px;
      color: ${defaultGreen};
      letter-spacing: 1.1rem;
    }
    nav {
      ul {
        flex-direction: row;
      }
    }
  }
`;

export default Header;
