import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter, NotFoundRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './routes/__root.tsx'
import NotFound from './404'


// import the generated route tree
import { routeTree } from "./routeTree.gen"

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFound,
})

// create a new router instance
const router = createRouter({ routeTree, notFoundRoute })

// this gives us type safety for the router 
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}


