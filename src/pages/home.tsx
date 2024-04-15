import { Dashboard } from '@/components/dashboard'
import { Profile } from '@/components/profile'

export function Home() {
  return (
    <div className="mx-auto">
      <Profile />
      <Dashboard />
    </div>
  )
}
