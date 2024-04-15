import { PostProps } from '@/components/dashboard'
import { PostContent } from '@/components/post-content'
import { api } from '@/lib/axios'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  CalendarDaysIcon,
  ChevronLeft,
  Github,
  MessageCircle,
  SquareArrowOutUpRight,
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const username = import.meta.env.VITE_API_USERNAME
const reponame = import.meta.env.VITE_API_REPONAME

export function Post() {
  const [post, setPost] = useState<PostProps>({} as PostProps)
  const [isLoading, setIsLoaging] = useState(true)

  const { id } = useParams()

  const getPostDetails = useCallback(async () => {
    try {
      setIsLoaging(true)
      const response = await api.get(
        `/repos/${username}/${reponame}/issues/${id}`,
      )
      console.log(response.data)
      setPost(response.data)
    } finally {
      setIsLoaging(false)
    }
  }, [post])

  useEffect(() => {
    getPostDetails()
  }, [])

  return (
    <div>
      <section className="mx-auto">
        <div className="mx-auto -mt-20 flex h-52 w-app flex-col gap-8 rounded-lg bg-base-profile p-8">
          <header className="flex w-full items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-1 border-b border-b-transparent text-xs uppercase text-blue hover:border-b-blue"
            >
              <ChevronLeft className="size-4" />
              Voltar
            </Link>
            <Link
              to={post.html_url}
              target="_blank"
              className="flex items-center gap-2 border-b border-b-transparent text-xs uppercase text-blue hover:border-b-blue"
            >
              ver no github
              <SquareArrowOutUpRight className="size-3" />
            </Link>
          </header>

          <h1 className="text-2xl font-bold">{post.title}</h1>

          <ul className="mt-auto flex flex-wrap items-center gap-6">
            {post.user?.login && (
              <li className="flex items-center gap-2 font-medium text-base-span">
                <Github className="size-5" />
                {post.user.login}
              </li>
            )}

            {post?.created_at && (
              <li className="flex items-center gap-2 font-medium text-base-span">
                <CalendarDaysIcon className="size-5" />
                {formatDistanceToNow(post.created_at, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </li>
            )}

            <li className="flex items-center gap-2 font-medium text-base-span">
              <MessageCircle className="size-5" />
              {post.comments} comentários
            </li>
          </ul>
        </div>
      </section>
      {!isLoading && <PostContent content={post.body} />}
    </div>
  )
}
