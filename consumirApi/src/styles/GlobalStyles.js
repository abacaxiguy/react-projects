import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body{
    font-family: sans-serif;
    background: ${colors.primaryDarkColor};
    color: ${colors.primaryDarkColor};
  }

  html, body, #root{
    height: 100%;
  }

  button{
    cursor: pointer;
    background: ${colors.primaryColor};
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: bold;
    font-size: 16px;
    transition: all 0.2s;
  }

  button:hover{
    filter: brightness(80%);
  }

  a{
    text-decoration: none;
    color: ${colors.primaryColor};
  }

  ul{
    list-style: none;
  }

`;

export const Container = styled.section`
  max-width: 500px;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 6px;
  box-shadow: 5px 5px 14px rgba(0, 0, 0, 0.1);
`;
