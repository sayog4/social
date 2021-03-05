import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import Link from 'next/link'
import { DELETE_POST } from '../../graphql/mutation'
import { MY_POSTS } from '../../graphql/query'
import { CardWrapperStyles, TopStyles } from './styles'
import ErrorMessage from '../ErrorMessage'

dayjs.extend(relativeTime)

export default function Card({
  showButtons = false,
  createdAt,
  _id,
  caption,
  image: { url },
  postedBy: {
    name,
    image: { url: authorimg },
  },
}) {
  const router = useRouter()
  const [deletePost, { data, error, loading }] = useMutation(DELETE_POST)

  const handleDelete = async (e) => {
    if (window.confirm('Are you sure to delete????')) {
      await deletePost({
        variables: { id: _id },
        refetchQueries: [{ query: MY_POSTS }],
      })
    } else {
      return
    }
  }

  return (
    <CardWrapperStyles>
      {error && <ErrorMessage message={error.message} />}
      <TopStyles>
        <img src={authorimg} alt={name} />
        <p>
          <strong>{name}</strong>
        </p>
        <p>{dayjs(createdAt).fromNow()}</p>
      </TopStyles>
      <Image
        layout="responsive"
        width={320}
        height={200}
        src={
          !url
            ? 'https://res.cloudinary.com/dmododwax/image/upload/v1614936940/bcw4utskg881rnyerbtp.jpg'
            : url
        }
        alt={caption}
        onClick={() => router.push(`/post/${_id}`)}
      />
      <Link href={`/post/${_id}`}>
        <p className="mark">{caption}</p>
      </Link>
      {showButtons && (
        <div className="buttons">
          <Link href={`/myposts/edit/${_id}`}>Edit</Link>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </CardWrapperStyles>
  )
}
