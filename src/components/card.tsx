import { Link } from 'react-router-dom'
import { PostProps } from './dashboard'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface CardProps {
  post: PostProps
}

export function Card({ post }: CardProps) {
  return (
    <Link
      to={`/post/${post.number}`}
      className="gap-4 rounded-lg border border-transparent bg-base-post p-8 outline-none hover:border hover:border-base-border"
    >
      <header className="flex w-full items-start justify-between">
        <h3 className=" line-clamp-2 max-w-[280px] flex-1 text-xl text-base-title">
          {post.title}
        </h3>
        <span className="w-max text-sm font-medium text-base-span">
          {formatDistanceToNow(post.created_at, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
      </header>

      <p className="mt-5 line-clamp-4 max-h-28 text-base">{post.body}</p>
    </Link>
  )
}
