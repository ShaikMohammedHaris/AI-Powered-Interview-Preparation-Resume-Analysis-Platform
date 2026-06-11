import {createBrowserRouter} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Protect from './features/auth/components/Protect'
import Home from './features/interview/pages/Home'
import Interview from './features/interview/pages/Interview'
export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path:'/',
        element: <Protect><Home /></Protect>
    },
    {
        path:'/interview/:interviewId',
        element: <Protect><Interview /></Protect>
    } 


])