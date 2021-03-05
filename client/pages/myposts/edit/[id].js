import CheckAuth from '../../../components/CheckAuth'
import EditPost from '../../../components/EditPost'

export default function ID({ query }) {
  return (
    <CheckAuth>
      <EditPost id={query.id} />
    </CheckAuth>
  )
}
