import styled from 'styled-components'

export const HeaderStyles = styled.header`
  color: white;
  background: var(--primary-light);
  padding: 1rem 1rem;
  font-size: 1.6rem;

  a {
    color: inherit;
    &:active,
    &:hover {
      color: var(--grey);
    }
  }
`

export const NavStyles = styled.nav`
  padding: 0 var(--spacer);
  display: flex;
  --margin: 1rem;
  ul {
    display: flex;
    margin-left: auto;
  }
  ul > * + * {
    margin-left: var(--margin);
    @media (min-width: 500px) {
      --margin: 3rem;
    }
  }
  span {
    cursor: pointer;
  }
`
export const LogoStyles = styled.div`
  font-size: 1.7rem;
  font-weight: var(--fw-bold);
  margin-right: var(--spacer);
  cursor: pointer;
`
