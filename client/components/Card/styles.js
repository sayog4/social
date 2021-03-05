import styled from 'styled-components'

export const CardWrapperStyles = styled.article`
  background: white;
  padding: var(--spacer);
  box-shadow: var(--shadow);

  p {
    font-size: 1.5rem;
    font-weight: var(--fw-light);
  }
  .mark {
    background: #faf8f8;
    padding: 0.2rem 0.5rem;
    text-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  .buttons {
    display: flex;
    justify-content: space-around;
    padding: var(--spacer) 0;
    button,
    a {
      color: inherit;
      padding: 0.7rem 2rem;
      box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
      background: var(--primary-light);
    }
    button {
      background: #e64e4e;
      color: #fff;
    }
  }
  img:hover {
    cursor: pointer;
  }
`
export const TopStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  padding: 0.7rem 0;
  font-family: cursive;

  color: var(--grey);
  & > p {
    margin-top: auto;
    text-align: right;
    margin-bottom: 0;
  }
  & > p + p {
    grid-column: 2 / -1;
  }
  img {
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    grid-row: span 2;
  }
`
