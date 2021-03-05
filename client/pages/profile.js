import CheckAuth from '../components/CheckAuth'
import Profile from '../components/Profile'
export default function ProfilePage() {
  return (
    <CheckAuth>
      <Profile />
    </CheckAuth>
  )
}
