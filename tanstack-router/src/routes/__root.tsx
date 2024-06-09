import React, { Suspense } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

const TanStackRouterDevtools = process.env.NODE_ENV === "production" ? () => null
  : React.lazy(() =>
    import("@tanstack/router-devtools").then((res) => ({
      default: res.TanStackRouterDevtools,
    })),
  )

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">Home</Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">About</Link>{' '}
        <Link to="/posts" className="[&.active]:font-bold">Posts</Link>{' '}
      </div>
      <hr />
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools initialIsOpen={false} />
      </Suspense>
    </>
  )

}
