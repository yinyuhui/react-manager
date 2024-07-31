import { lazy } from 'react'

const Login = lazy(() => import('./login'))
const Reg = lazy(() => import('./register'))

export {
    Login,
    Reg
}