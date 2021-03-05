import CheckAuth from '../../components/CheckAuth'
import MyPosts from '../../components/MyPosts'

export default function MyPostsPage() {
  return (
    <CheckAuth>
      <MyPosts />
    </CheckAuth>
  )
}
