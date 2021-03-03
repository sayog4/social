import styled, { keyframes } from 'styled-components'

const LoadingAnim = keyframes`
  0 {
    background-position: 0 0;
  }
  to {
    background-position: 100% 100%;
  }
`

const FormStyles = styled.form`
  box-shadow: var(--shadow);
  border-radius: 5px;
  padding: calc(1.5 * var(--spacer));
  color: var(--primary-dark);

  label {
    display: block;
    font-weight: var(--fw-bold);
  }
  input,
  textarea {
    width: 100%;
    padding: 0.6rem;
    font-size: 1.4rem;
    border: 0;
    border-bottom: 2px solid var(--primary-dark);
    background: none;
    font-family: inherit;
    color: inherit;
    transition: all 0.2s;
    &:focus {
      transition: all 0.2s;
      outline: none;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      border-color: var(--primary-dark);
    }
  }
  button {
    width: 100%;
    font-size: 1.5rem;
    background: var(--primary-dark);
    color: white;
    padding: 1rem 3rem;
  }
  fieldset {
    border: 0;
    padding: 0;
    & > * + * {
      margin-top: var(--spacer);
    }
    &[disabled] {
      opacity: 0.7;
    }
    &::before {
      height: 3px;
      content: '';
      display: block;
      background-image: linear-gradient(
        to right,
        var(--primary-light) 0%,
        var(--primary-dark) 50%,
        var(--primary-light) 100%
      );
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${LoadingAnim} 0.5s linear infinite;
    }
  }
`
export default FormStyles
