import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Image from 'next/image'
import omitDeep from 'omit-deep-lodash'
import { useMemo, useState } from 'react'
import { UPDATE_USER, UPLOAD_FILE } from '../../graphql/mutation'
import { ME } from '../../graphql/query'
import { resizeFile } from '../../lib/resize'
import FormStyles from '../CommonStyles/Form'
import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'

export default function UpdateProfile() {
  const router = useRouter()
  const { error, data, loading } = useQuery(ME)
  const [values, setValues] = useState({
    name: '',
    email: '',
    bio: '',
    address: '',
    image: {
      url: '',
      public_id: '',
    },
  })
  const [
    uploadFile,
    { data: imageData, error: imageError, loading: imageLoading },
  ] = useMutation(UPLOAD_FILE)

  const [
    updateUser,
    { loading: updateLoading, error: updateError, data: updateData },
  ] = useMutation(UPDATE_USER)

  useMemo(() => {
    // delete imageData?.uploadFile?.__typename

    if (imageData) {
      setValues({
        ...values,
        image: omitDeep(imageData.uploadFile, ['__typename']),
      })
    }
  }, [imageData])

  useMemo(() => {
    if (data && data.me) {
      setValues({
        name: data.me.name,
        email: data.me.email,
        bio: data.me.bio === null ? '' : data.me.bio,
        address: data.me.address === null ? '' : data.me.address,
        image:
          data.me.image.url !== ''
            ? omitDeep(data.me.image, ['__typename'])
            : {
                url: '',
                public_id: '',
              },
      })
    }
  }, [data])

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0]
      const image = await resizeFile(file, 400, 250)

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

    await updateUser({ variables: { data: values } })
    router.push('/profile')
  }

  if (loading) return <Loading />

  return (
    <FormStyles onSubmit={handleSubmit} style={{ color: 'black' }}>
      {error && <ErrorMessage message={error.message} />}
      {updateError && <ErrorMessage message={updateError.message} />}
      {imageError && <ErrorMessage message={imageError.message} />}
      <h2 className="text-center">Update Profile</h2>
      <fieldset
        disabled={imageLoading || updateLoading || loading}
        aria-busy={imageLoading || updateLoading || loading}
      >
        <label htmlFor="name">Your Name</label>
        <input
          value={values.name}
          onChange={handleChange}
          id="name"
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <label htmlFor="email">Email Address</label>
        <input
          value={values.email}
          id="email"
          type="email"
          name="email"
          placeholder="example@gmail.com"
          disabled
        />
        {values?.image?.url && (
          <Image
            src={values.image?.url}
            layout="fixed"
            width={300}
            height={150}
            alt="Post"
          />
        )}
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label htmlFor="file">Upload Picture</label>
        <label htmlFor="address"> Address</label>
        <input
          value={values.address}
          onChange={handleChange}
          id="address"
          type="text"
          name="address"
          placeholder="Address"
        />
        <label htmlFor="bio">About Yourself</label>
        <textarea
          value={values.bio}
          onChange={handleChange}
          id="bio"
          type="bio"
          name="bio"
          rows={5}
          placeholder="About You!!"
        />
        <button type="submit">Update</button>
      </fieldset>
    </FormStyles>
  )
}
