import { useQuery } from '@apollo/client'
import Image from 'next/image'
import Link from 'next/link'
import { ME } from '../../graphql/query'
import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'
import { ProfileStyles } from './styles'

export default function Profile() {
  const { error, data, loading } = useQuery(ME)

  if (loading) return <Loading />

  return (
    <ProfileStyles>
      <h2 className="text-center">{data.me.name}</h2>
      {error && <ErrorMessage message={error.message} />}
      <div className="buttons">
        <Link href={`/profile/update`}>Update Profile</Link>
        <Link href="/myposts">My Posts</Link>
      </div>
      <p>
        <strong>Email:</strong> {data.me.email}
      </p>
      <hr />
      <p>
        <strong>Image:</strong>
      </p>
      {data.me.image.url ? (
        <Image
          width={200}
          height={150}
          layout="responsive"
          src={data.me.image.url}
          alt="Profile Avatar"
        />
      ) : (
        <p>You have not provided any Image.</p>
      )}
      <hr />
      <p>
        <strong>Bio:</strong>{' '}
        {data.me.bio ? data.me.bio : <p>You have not provided any Bio.</p>}
      </p>
      <hr />
      <p>
        <strong>Address:</strong>{' '}
        {data.me.address ? (
          data.me.address
        ) : (
          <p>You have not provided any address.</p>
        )}
      </p>
      <hr />
      <Link href={`/profile/update`}>Update Profile</Link>
    </ProfileStyles>
  )
}
