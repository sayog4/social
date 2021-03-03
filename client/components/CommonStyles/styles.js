import styled from 'styled-components'

export const FormContainerStyles = styled.div`
  font-size: 1.4rem;
  color: var(--grey);
`
export const TabStyles = styled.ul`
  display: flex;

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
