import { useQuery } from '@apollo/client'
import Card from '../components/Card'
import { HomePageStyles } from '../components/CommonStyles/HomeStyles'
import CreatePostForm from '../components/CreatePostForm'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { ALL_POSTS } from '../graphql/query'

export default function Home() {
  const { data, loading, error, fetchMore } = useQuery(ALL_POSTS)

  if (loading) return <Loading />
  return (
    <>
      <CreatePostForm />
      <HomePageStyles>
        {data?.allPosts.posts.map((post) => (
          <Card key={post._id} {...post} />
        ))}
      </HomePageStyles>
      {error && <ErrorMessage message={error.message} />}
      {data?.allPosts.hasNextPage && (
        <button
          onClick={async () => {
            await fetchMore({ variables: { cursor: data.allPosts.cursor } })
          }}
          className="load-more"
          type="button"
        >
          Load More
        </button>
      )}
    </>
  )
}
