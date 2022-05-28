import styled from 'styled-components';

export const Wrapper = styled.button`
  display: flex;
  padding: 5px 10px;
  text-transform: uppercase;
  color: #f1f1f1;
  background: #3a59a9;
  border-radius: 5px;
  transition: opacity .3s;
  font-family: "Roboto", sans-serif;

  &:hover {
    opacity: 0.7;
  }
`;
