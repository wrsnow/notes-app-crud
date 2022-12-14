import styled from "styled-components";

const HeaderEl = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-around;
  background: #e6ecbf;
  align-items: center;
  padding: 0.4rem 1.8rem;

  & span {
    font-size: 0.9rem;
  }

  & ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin: 0;
    padding: 0;
  }

  & .logged-user-container {
    margin-left: auto;
    display: flex;
    font-size: 0.7rem;
    flex-direction: column;
    align-items: center;
    min-width: 120px;
    width: auto;
    height: 60px;
  }
  & .user-info {
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 6px;
  }
  & .user-info > button {
    padding: 16px;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
  }
  & .user-info > button:hover {
    background-color: rgb(0, 0, 0, 0.2);
  }
  & .user-info > button:active {
    background-color: rgb(0, 0, 0, 0.4);
  }
`;

export default HeaderEl;
