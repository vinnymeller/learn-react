import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/posts/$postId')({
  component: PostId,
})

function PostId() {
  const { postId } = Route.useParams()
  return (
    <div className="p-2">
      <h3>Post ID: {postId}</h3>
    </div>
  )

}
