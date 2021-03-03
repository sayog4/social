import styled, { createGlobalStyle } from 'styled-components'
import Nav from '../Nav'

const GlobalStyles = createGlobalStyle`
  :root {
    --spacer: 1rem;
    --fw-normal: 400;
    --fw-light: 300;
    --fw-bold: 700;
    --black: #393939;
    --grey: #555454;
    --max-width: 900px;
    --shadow: 0 0.25em 1.5em rgba(0, 0, 0, 0.15);
    --primary-light: #59e89c;
     --primary-dark: #00986a;

     --ff: 'Roboto', sans-serif;
  }
  /* -----------BASIC RESET---------------- */
  *,*::before,*::after{
    box-sizing: border-box;
  }
  h1,h2,h3{
    line-height: 1.2;
  }
  h1,h2,h3{
    margin: 0;
  }
  ul,ol{
    list-style: none;
    padding: 0;
  }
   ul{
    list-style: none;    
  }
  img{
    max-width: 100%;
    height: aoto;
    display: block;
  }
  a{
    display: inline-block;
    text-decoration: none;
  }
  /* -----------BASIC Typography---------------- */
  html{   
    font-size: 62.5%;
  }
  body{
    font-family: var(--ff);
    font-size: 1.3rem;
    line-height: 1.6;
    margin: 0;
    background: radial-gradient(circle, rgba(67,92,222,1) 0%, rgba(235,97,209,1) 0%);
    color: var(---grey);
  }
  a,button{
    font-family: var(---ff);
  }
  .mb{
    margin-bottom: var(--spacer);
  }
  .text-center{
    text-align: center;
  }
  h1,h2,h3{ 
    color: var(--primary-dark);
  }
  button{
    display: inline-block;
    cursor: pointer;
    border: 0;
  }
`
const ContainerStyles = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 var(--spacer);
  background: white;
`

export default function Page({ children }) {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <ContainerStyles>{children}</ContainerStyles>
    </>
  )
}
