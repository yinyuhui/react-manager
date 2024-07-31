import { lazy } from 'react'

const Buttons = lazy(() => import('./buttons'))
const Loadings = lazy(() => import('./loadings'))
const Modals = lazy(() => import('./modals'))
const Notifications = lazy(() => import('./notifications'))
const Messages = lazy(() => import('./messages'))
const Tabs = lazy(() => import('./tabs'))
const Gallery = lazy(() => import('./gallery'))
const Carousel = lazy(() => import('./carousel'))

export {
    Buttons,
    Loadings,
    Modals,
    Notifications,
    Messages,
    Tabs,
    Gallery,
    Carousel,
}