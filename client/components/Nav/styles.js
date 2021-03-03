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
  display: flex;
  ul {
    display: flex;
    margin-left: auto;
  }
  ul > * + * {
    margin-left: var(--spacer);
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
