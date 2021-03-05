import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Image from 'next/image'
import omitDeep from 'omit-deep-lodash'
import { useMemo, useState } from 'react'
import { resizeFile } from '../../lib/resize'
import FormStyles from '../CommonStyles/Form'
import { GET_SINGLE_POST, MY_POSTS } from '../../graphql/query'
import { UPDATE_POST, UPLOAD_FILE } from '../../graphql/mutation'
import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'

export default function EditPost({ id }) {
  const router = useRouter()
  const { error, data, loading } = useQuery(GET_SINGLE_POST, {
    variables: { id },
  })
  const [values, setValues] = useState({
    caption: '',
    image: {
      url: '',
      public_id: '',
    },
  })
  const [
    uploadFile,
    { data: uploadData, error: updateError, loading: uploadLoading },
  ] = useMutation(UPLOAD_FILE)

  // UPDATE USER Mutation here
  const [
    updatePost,
    { data: updatedData, error: updatedError, loading: updatedLoading },
  ] = useMutation(UPDATE_POST)

  useMemo(() => {
    if (uploadData) {
      setValues({
        ...values,
        image: omitDeep(uploadData.uploadFile, ['__typename']),
      })
    }
  }, [uploadData])

  useMemo(() => {
    if (data && data.getSinglePost) {
      setValues({
        caption: data.getSinglePost.caption,
        image: omitDeep(data.getSinglePost.image, ['__typename']),
      })
    }
  }, [data])

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    const image = await resizeFile(file, 700, 500)

    await uploadFile({
      variables: {
        file: image,
      },
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updatePost({
      variables: {
        data: {
          id: data.getSinglePost._id,
          ...values,
        },
      },
      refetchQueries: [{ query: MY_POSTS }],
    })
    router.push('/myposts')
  }
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }
  if (loading) return <Loading />

  return (
    <FormStyles onSubmit={handleSubmit}>
      <h2 className="text-center">Edit Post</h2>
      {error && <ErrorMessage message={error.message} />}
      {updatedError && <ErrorMessage message={updatedError.message} />}
      {updateError && <ErrorMessage message={updateError.message} />}
      <fieldset
        disabled={loading || uploadLoading || updatedLoading}
        aria-busy={updatedLoading || loading || uploadLoading}
      >
        <label htmlFor="caption">Caption</label>
        <input
          style={{
            marginBottom: '.5rem',
          }}
          type="text"
          id="caption"
          name="caption"
          value={values.caption}
          onChange={handleChange}
          placeholder="Put Caption"
          required
        />
        {values.image?.url && (
          <Image
            src={values.image.url}
            alt={values.caption}
            layout="responsive"
            width={500}
            height={250}
          />
        )}
        <input
          type="file"
          id="file"
          accept="image/*"
          name="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file"> Upload Image</label>
        <button type="submit">Update</button>
      </fieldset>
    </FormStyles>
  )
}
