import styled from 'styled-components'

export const ProfileStyles = styled.div`
  padding: var(--spacer);
  max-width: 50rem;
  margin: 0 auto;

  hr {
    color: var(--primary-light);
  }
  strong {
    color: var(--grey);
  }

  a {
    color: var(--grey);
    padding: 0.6rem var(--spacer);
    margin: 0.3rem 0;
    background: var(--primary-light);
    transform: rotate(-2deg);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  }
  .buttons {
    display: flex;
    justify-content: space-between;
  }
`
