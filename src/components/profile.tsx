import { api } from '@/lib/axios'
import {
  Building2,
  Github,
  SquareArrowOutUpRight,
  UsersRound,
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const username = import.meta.env.VITE_API_USERNAME

interface ProfileProps {
  login: string
  bio: string
  avatar_url: string
  html_url: string
  name: string
  company?: string
  followers: number
}

export function Profile() {
  const [profile, setProfile] = useState<ProfileProps>({} as ProfileProps)
  const [isLoading, setIsLoading] = useState(true)

  const getProfile = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await api.get(`/users/${username}`)
      setProfile(response.data)
    } finally {
      setIsLoading(false)
    }
  }, [profile])

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <section className="mx-auto -mt-20 flex min-h-52 w-app flex-row gap-8 rounded-lg bg-base-profile p-8">
      <img className="size-36 rounded-lg" src={profile.avatar_url} alt="" />
      <div className="flex flex-1 flex-col items-start justify-center">
        <header className="mt-2 flex w-full items-center justify-between">
          <h1 className="text-2xl font-medium text-base-title">
            {profile.name}
          </h1>
          <Link
            to={profile.html_url}
            target="_blank"
            className="flex items-center gap-2 border-b border-b-transparent text-xs text-blue hover:border-b-blue"
          >
            GITHUB
            <SquareArrowOutUpRight className="size-3" />
          </Link>
        </header>
        <p className="mt-2 flex flex-1 font-medium">{profile.bio}</p>
        <ul className="mt-auto flex items-center gap-6">
          <li className="flex items-center gap-2 font-medium text-base-subtitle">
            <Github className="size-5 text-base-label" />
            {profile.login}
          </li>

          {profile?.company && (
            <li className="flex items-center gap-2 font-medium text-base-subtitle">
              <Building2 className="size-5 text-base-label" />
              {profile.company}
            </li>
          )}

          <li className="flex items-center gap-2 font-medium text-base-subtitle">
            <UsersRound className="size-5 text-base-label" />
            {profile.followers} seguidores
          </li>
        </ul>
      </div>
    </section>
  )
}
