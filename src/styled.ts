import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
  }

  div, button, input {
    box-sizing: border-box;
    border: none;
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
    background: transparent;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  #root {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  ul[class],
  ol[class] {
    padding: 0;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul[class],
  ol[class],
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  body {
    height: 100%;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
    font-family: "Minecraft";
    overflow: hidden;
  }

  ul[class],
  ol[class] {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  img {
    max-width: 100%;
    display: block;
  }

  article > * + * {
    margin-top: 1em;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #b0b0b0;
  background-size: 60px 60px;
  height: 100%;
  padding: 20px 20px 20px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  column-gap: 20px;
  align-items: center;
`;

export const InputsWrapper = styled(ButtonsWrapper)`
  margin-top: 20px;
`;

export const Input = styled.input`
  width: 150px;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  border: 1px solid #3a59a9;
`;

export const InfoText = styled.div`
  font-size: 16px;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  span {
    font-weight: bold;
  }
`;

export const Cell = styled.button<{ color: string }>`
  width: 30px;
  height: 30px;
  border: 1px solid #333;
  background: ${({ color }) => color};
  border-radius: 5px;
  transition: opacity 0.3s;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f1f1f1;
  background: #3a59a9;
  border-radius: 5px;
  padding: 5px 10px;
  min-width: 150px;
  font-size: 16px;
  text-transform: uppercase;
  transition: opacity .3s;
  font-family: "Roboto", sans-serif;
  
  &:hover {
    opacity: 0.7;
  }
`;
