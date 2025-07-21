import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import {AllPosts, AddPost, EditPost, Home, Login, Post, SignUp} from './Pages/index.js'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { AuthLayout } from './components/index.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <SignUp/>
          </AuthLayout>
        )
      },
      {
        path: '/all-posts',
        element: (
          <AuthLayout authentication={true}>
            <AllPosts/>
          </AuthLayout>
        )
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication>
            <AddPost/>
          </AuthLayout>
        )
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication>
            <EditPost/>
          </AuthLayout>
        )
      },
      {
        path: '/post/:slug',
        element: (
         <Post />
        )
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
