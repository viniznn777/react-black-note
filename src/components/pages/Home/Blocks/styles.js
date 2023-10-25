import styled from "styled-components";
import { Colors } from "../../../utilities/variables";

const { secondaryDark, defaultGreen } = Colors;

const Container = styled.div`
  background-color: ${secondaryDark};
  overflow: hidden;
  width: 250px;
  height: 250px;
  border-radius: 15px;
  position: relative;
  display: flex;
  align-items: center;

  text-align: center;
  flex-direction: column;

  .icon-star {
    color: ${defaultGreen};
    width: 100%;
    font-size: 1.2rem;
    height: max-content;
    display: flex;
    align-items: flex-start;
    padding: 10px;
    cursor: pointer;
  }

  .title {
    height: 100%;
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Container;
