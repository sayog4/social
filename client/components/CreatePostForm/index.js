import { useState, useMemo } from 'react'
import { CreateFormStyles } from './styles'
import useForm from '../../lib/useForm'
import { useMutation } from '@apollo/client'
import { CREATE_POST, UPLOAD_FILE } from '../../graphql/mutation'
import { toast } from 'react-toastify'
import { resizeFile } from '../../lib/resize'
import { ALL_POSTS } from '../../graphql/query'

import { useContext } from 'react'
import { AuthContext } from '../../lib/useAuth'
import ErrorMessage from '../ErrorMessage'

export default function CreatePostForm() {
  const { token } = useContext(AuthContext)
  const [uploadFile, { data, error, loading }] = useMutation(UPLOAD_FILE)

  const [
    createPost,
    { data: newPost, error: newPostError, loading: newPostLoading },
  ] = useMutation(CREATE_POST)

  const [image, setImage] = useState('')
  useMemo(() => {
    delete data?.uploadFile?.__typename

    setImage(data?.uploadFile)
  }, [data])

  const { handleChange, values, clearForm } = useForm({
    caption: '',
  })

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0]
      const image = await resizeFile(file, 700, 500)
      console.log(image)
      await uploadFile({
        variables: {
          file: image,
        },
      })
    } catch (err) {
      toast.error(err.message)
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      image,
      caption: values.caption,
    }
    await createPost({
      variables: { data },
      refetchQueries: [{ query: ALL_POSTS }],
    })
    clearForm()
    toast.success('New Post Is Created')
  }

  return (
    token && (
      <CreateFormStyles onSubmit={handleSubmit}>
        {newPostError && <ErrorMessage message={newPostError.message} />}
        <fieldset disabled={loading || newPostLoading}>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            required={true}
            onChange={handleFileChange}
          />
          <label htmlFor="file">Image</label>
          <input
            type="text"
            placeholder="Caption.."
            value={values.caption}
            onChange={handleChange}
            id="caption"
            name="caption"
          />
          <button type="submit">Post</button>
        </fieldset>
      </CreateFormStyles>
    )
  )
}
