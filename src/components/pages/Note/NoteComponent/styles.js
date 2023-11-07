import styled from "styled-components";
import { Colors } from "../../../utilities/variables";

const { defaultGreen } = Colors;

const ContainerNoteComponent = styled.div`
  padding-top: 45px;

  p.fs-5 {
    color: ${defaultGreen};
  }
  p.fs-3 {
    color: #fff;
  }
  .note-content {
    padding-bottom: 15px;
  }
  .container-nav {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    nav {
      display: flex;
      ul {
        gap: 23px;
        list-style: none;
        display: flex;
        flex-direction: row;
        li,
        a {
          cursor: pointer;
          color: ${defaultGreen};
          font-size: 1.2rem;
          &:hover {
            color: #fff;
          }
        }
      }
    }
  }
`;

export default ContainerNoteComponent;
