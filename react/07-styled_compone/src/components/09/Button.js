import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ $Color }) => ($Color ? "#6500c3" : "#FFD35A")};

  border: none;
  color: ${({ $Color }) => ($Color ? "#fff" : "#000")};
  padding: 16px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: ${({ $Color }) => ($Color ? "#7760b4" : "#FFDE4D")};
    /* #7760b4 */
    /* opacity: 0.4; */
  }
  display: flex;
  margin-bottom: 8px;
  width: 400px;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

export default Button;
