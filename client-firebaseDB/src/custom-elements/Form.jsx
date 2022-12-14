import styled from "styled-components";

const Form = styled.form`
  & * {
    font-family: "Franklin", "Helvetica";
    font-weight: 400;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 300px;
  margin: auto auto 5rem auto;
  background: #8e630645;
  border: 1px solid #2d292273;
  border-radius: 8px;

  & input {
    width: 140px;
    height: 30px;
    border: none;
    padding: 0 6px;
    margin-top: 6px;
    border-radius: 3px;
  }

  & label {
  }

  & .login-input {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
    width: 200px;
  }
  & .login-input > button {
    font-weight: 600;
    background: #fff;
    font-size: 0.8rem;
    width: 80px;
    height: 35px;
  }
  & .login-input > button:first-child {
    background: #d8a330 !important;
  }
  & .login-input > button:hover {
    background: #0000008f !important;
    color: #fff;
  }
  & .login-input > button:active {
    background: #0000004a !important;
  }

  & .error {
    border: 1px solid #f43838;
  }

  & .dataChecker {
    font-weight: 600;
    color: #f43838;
    margin-top: 3px;
    padding: 0;
    font-size: 0.5rem;
  }

  @media (max-width: 500px) {
    width: auto;
    min-height: 260px;
    height: auto;

    & .login-input > button {
      font-weight: 600;
      font-size: 0.6rem;
      width: 60px;
    }
  }
`;

export default Form;
