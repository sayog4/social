import { useQuery } from '@apollo/client'
import { MY_POSTS } from '../../graphql/query'
import Card from '../Card'
import { HomePageStyles } from '../CommonStyles/HomeStyles'
import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'

export default function MyPosts() {
  const { data, error, loading } = useQuery(MY_POSTS)

  if (loading) return <Loading />
  return (
    <HomePageStyles>
      <h2 className="text-center">My Posts</h2>
      {error && <ErrorMessage message={error.message} />}
      {data?.myPosts.map((post) => (
        <Card showButtons={true} key={post._id} {...post} />
      ))}
    </HomePageStyles>
  )
}
