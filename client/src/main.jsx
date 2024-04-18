import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import './index.css'

const router = createBrowserRouter([
  { path: '/', 
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
    ]
 },
  

ReactDOM.createRoot(document.getElementById('root')).render(
  ( <RouterProvider router={router}>
      <App />
    </RouterProvider> )
)]) // Add closing parenthesis here
