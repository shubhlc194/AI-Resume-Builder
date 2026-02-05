import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import Index from './auth/sign-in/SignInPage.jsx'
const router=createBrowserRouter([{
  path:'/',
  Element:<App/>
},{
  path:"/auth/sign-in",
  element:<signInPage/>
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
