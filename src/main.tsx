import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import { UserPage } from './pages/UserPage.tsx'
import { RepositoriesPage } from './pages/repositoriesPage.tsx'
import { ErrorPage } from './pages/ErrorPage.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/usuario/:user',
    element: <UserPage />,
  },
  { path: '/repositorios', element: <RepositoriesPage /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
