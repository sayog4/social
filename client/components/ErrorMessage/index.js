import { ErrorMesssageStyles } from './styles'
export default function ErrorMessage({ message }) {
  return (
    <ErrorMesssageStyles>
      <p>{message}</p>
    </ErrorMesssageStyles>
  )
}
