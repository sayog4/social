import { parseCookies } from 'nookies'

export default function ID(props) {
  // console.log(parseCookies())
  const cookies = parseCookies().token
  console.log(cookies)
  return (
    <>
      <h2>ID PAGE</h2>
    </>
  )
}
