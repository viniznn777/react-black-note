import styled from "styled-components";
import { Colors } from "../../../utilities/variables";

const { defaultGrayIcons, defaultGreen, secondaryDark } = Colors;

const ContainerForm = styled.div`
  input {
    margin-bottom: 25px;
  }
  input,
  textarea {
    background-color: transparent;
    color: #fff;
    width: 100%;
    border: none;
    border-bottom: 2px solid ${defaultGrayIcons};
    padding-left: 10px;
    font-size: 1.35rem;
    outline: none;
    transition: all 0.3s;
    &:focus {
      border-bottom: 2px solid ${defaultGreen};
    }
    &::placeholder {
      color: ${defaultGrayIcons};
    }
  }
  button {
    margin-top: 25px;
    width: 100%;
    padding: 10px;
    font-weight: bold;
    color: ${defaultGreen};
    background-color: ${secondaryDark};
    outline: none;
    border: none;
    transition: all 0.3s;
    &:hover {
      background-color: ${defaultGreen};
      color: #fff;
    }
  }
`;

export default ContainerForm;
