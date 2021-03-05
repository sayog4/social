import { useQuery } from '@apollo/client'
import Image from 'next/image'
import { GET_SINGLE_POST } from '../../graphql/query'
import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { SinglePostStyles } from './styles'
import { TopStyles } from '../Card/styles'

dayjs.extend(relativeTime)

export default function SinglePostCard({ id }) {
  const { data, error, loading } = useQuery(GET_SINGLE_POST, {
    variables: { id: id },
  })
  if (loading) return <Loading />

  return (
    <SinglePostStyles>
      {error && <ErrorMessage message={error.message} />}
      <TopStyles>
        <img
          src={data?.getSinglePost.postedBy.image.url}
          alt={data?.getSinglePost.postedBy.image.url}
        />
        <p>
          <strong>{data?.getSinglePost.postedBy.name}</strong>
        </p>
        <p>{dayjs(data?.getSinglePost.createdAt).fromNow()}</p>
      </TopStyles>
      <Image
        layout="responsive"
        width={600}
        height={400}
        src={data?.getSinglePost.image.url}
        alt={data?.getSinglePost.caption}
      />
      <p>{data?.getSinglePost.caption}</p>
    </SinglePostStyles>
  )
}
