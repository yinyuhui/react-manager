import { lazy } from 'react'

const Bar = lazy(() => import('./bar'))
const Pie = lazy(() => import('./pie'))
const Line = lazy(() => import('./line'))

export {
    Bar,
    Pie,
    Line,
}