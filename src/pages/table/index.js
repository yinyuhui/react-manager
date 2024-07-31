import { lazy } from 'react'

const Basic = lazy(() => import('./basic'))
const High = lazy(() => import('./high'))

export {
    Basic,
    High,
}