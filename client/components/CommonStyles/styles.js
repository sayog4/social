import styled from 'styled-components'

export const FormContainerStyles = styled.div`
  font-size: 1.4rem;
  color: var(--grey);
  padding: 2rem 0;
`
export const TabStyles = styled.ul`
  display: flex;
  margin: 0;
  margin-bottom: 2rem;
  & > * {
    width: 100%;
  }
  li {
    padding: 0.7rem 0;
    cursor: pointer;
    font-weight: var(--fw-bold);
    background: #e7e7e7;
  }

  .active {
    background: var(--primary-dark);
    color: white;
  }
`
