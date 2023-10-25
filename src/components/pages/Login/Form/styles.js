import styled from "styled-components";
import { Colors } from "../../../utilities/variables";

const { defaultGreen, defaultGrayIcons, secondaryDark } = Colors;

const ContainerForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 55px;
  form {
    width: 100%;
    .container-input {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;
      input {
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
      label {
        color: ${defaultGreen};
      }
    }
    button {
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
  }
  .container-link {
    a {
      color: ${defaultGrayIcons};
      &:hover {
        color: ${defaultGreen};
      }
    }
  }
`;

export default ContainerForm;
