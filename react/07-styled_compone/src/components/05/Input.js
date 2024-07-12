import styled from "styled-components";

const SIZE = {
  large: 25,
  medium: 20,
  small: 16,
};
const Input = styled.input`
  padding: 16px;
  border: 2px solid ${({ $error }) => ($error ? "#f44336" : "#eee")};

  font-size: ${({ size }) => SIZE[size] ?? SIZE["medium"]}px;

  border-radius: ${({ $round }) => ($round ? "9999px" : "4px")};

  outline: none; // focus 했을때 나오는 테두리!!
  &:focus {
    border-color: ${({ $error }) => ($error ? "#f44336" : "#7760b4")};
  }
`;

export default Input;
