import { z } from 'zod'
import { Card } from './card'
import { useCallback, useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const username = import.meta.env.VITE_API_USERNAME
const reponame = import.meta.env.VITE_API_REPONAME

export interface PostProps {
  title: string
  body: string
  created_at: string
  number: number
  html_url: string
  comments: number
  user: {
    login: string
  }
}

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormSchema = z.infer<typeof searchFormSchema>

export function Dashboard() {
  const [posts, setPosts] = useState<PostProps[]>()
  const [isLoading, setIsLoading] = useState(true)

  const getPosts = useCallback(async (query: string = '') => {
    try {
      setIsLoading(true)
      const response = await api.get(
        `/search/issues?q=${query}%20repo:${username}/${reponame}`,
      )
      setPosts(response.data.items)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    getPosts()
  }, [])

  const { register, handleSubmit } = useForm<SearchFormSchema>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearch(data: SearchFormSchema) {
    await getPosts(data.query)
  }

  return (
    <section className="mt-20 flex w-app flex-col items-center justify-center">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-sm font-bold text-base-subtitle">Publicações</h3>
        <span className="text-sm font-medium text-base-span">
          {posts?.length} publicações
        </span>
      </div>

      <form className="w-full" onSubmit={handleSubmit(handleSearch)}>
        <input
          type="text"
          className="mt-3 flex h-12 w-full rounded-md border border-base-border bg-base-input px-4 text-sm outline-none placeholder:text-base-label focus:border-blue"
          placeholder="Buscar conteúdo"
          {...register('query')}
        />
      </form>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-card">
        {posts?.map((post) => {
          return <Card key={post.number} post={post} />
        })}
      </div>
    </section>
  )
}
