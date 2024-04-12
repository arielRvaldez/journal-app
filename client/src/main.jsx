import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        component: <App />,
        errorElement: <NoMatch />,  
        children: [
        { index: true, element: <Home />},
        { path: 'login', element: Login },
        { path: 'signup', component: Signup },
        ],
    },
    ]);
