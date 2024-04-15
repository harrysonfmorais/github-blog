import ReactMarkdown from 'react-markdown'

interface PostContentProps {
  content: string
}

export function PostContent({ content }: PostContentProps) {
  return (
    <section className="mb-32 flex flex-col gap-4 px-10 py-8">
      <ReactMarkdown children={content} />
    </section>
  )
}
