import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-evenly;
  gap: 6px;
  align-items: center;
  width: 500px;
  height: 600px;
  box-shadow: 2px 4px 20px #00000081;
  background-color: #fde4b5;
  margin: 2rem auto 0 auto;
  border-radius: 16px;
  & h1 {
    margin-top: auto;
    margin-bottom: 4rem;
  }

  & .statusMessage {
    visibility: ${({ credentialsMatch }) =>
      credentialsMatch === false ? "visible" : "hidden"};
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 40px;
    background-color: #ed9090;
    color: #bb2727;
    border-radius: 8px;
  }
  & form > input {
    ${({ credentialsMatch }) =>
      credentialsMatch === false && "border: 1px solid red"}
  }

  @media (max-width: 500px) {
    font-size: 12px;
    width: 300px;
    height: 400px;
  }
`;

export default Div;
