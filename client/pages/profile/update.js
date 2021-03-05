import { parseCookies } from 'nookies'
import { initializeApollo } from '../../lib/apolloClient'
import UpdateProfile from '../../components/UpdateProfile'
import { ME } from '../../graphql/query'

export default function Update() {
  return (
    <div>
      <UpdateProfile />
    </div>
  )
}
