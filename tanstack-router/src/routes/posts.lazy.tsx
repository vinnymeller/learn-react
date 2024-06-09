import { createLazyFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createLazyFileRoute("/posts")({
  component: Posts,
})

function Posts() {
  return (
    <>
      <h1>Posts</h1>
      <ul>
        <li>
          <Link to="/posts/$postId" params={{ postId: '1' }}>Post 1</Link>
        </li>
      </ul>
      <Outlet />
    </>
  )
}
