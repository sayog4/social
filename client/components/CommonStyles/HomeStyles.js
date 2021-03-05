import styled from 'styled-components'

export const HomePageStyles = styled.section`
  --gap: var(--spacer);
  display: grid;
  gap: var(--gap);
  padding: var(--spacer) 0;

  @media (min-width: 550px) {
    padding: 2rem 0;
    grid-template-columns: 1fr 1fr;
    --gap: 3rem;
  }
`
