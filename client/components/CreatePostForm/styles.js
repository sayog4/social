import styled from 'styled-components'

export const CreateFormStyles = styled.form`
  border-radius: 5px;
  padding: 1.5rem 0;
  color: var(--primary-dark);
  display: flex;
  justify-content: center;

  --padding: 0.2rem 0.5rem;
  margin-bottom: 0.5rem;
  label {
    font-weight: var(--fw-bold);
  }

  input {
    padding: 0.6rem;
    font-size: 1.4rem;
    border: 1px solid var(--primary-dark);
    border-radius: 10px;
    background: none;
    font-family: inherit;
    color: inherit;
    transition: all 0.2s;
    &:focus {
      transition: all 0.2s;
      outline: none;
      background-color: rgba(0, 0, 0, 0.6);
      color: white;
      border-color: var(--primary-dark);
    }
  }
  input[type='text'] {
    margin: 0 0.7rem;
  }
  input[type='file'] {
    display: none;
    & + label {
      background: var(--primary-light);
      border: none;
      border-radius: 5px;
      color: var(--black);
      cursor: pointer;
      display: inline-block;
      font-size: inherit;
      font-weight: var(--fw-bold);
      outline: none;
      padding: 0.5rem 1rem;
    }
  }

  button {
    background: var(--primary-dark);
    color: white;
    padding: 0.5rem 1rem;
  }
  fieldset {
    border: 0;
    padding: 0;
    display: flex;
    &[disabled] {
      opacity: 0.7;
    }
  }
`
