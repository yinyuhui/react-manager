import { lazy } from 'react'

import * as UI from '../pages/ui'
import * as Form from '../pages/form'
import * as Table from '../pages/table'
import * as Charts from '../pages/charts'

const Home = lazy(() => import('../pages/Home'))
const Rich = lazy(() => import('../pages/rich'))
const City = lazy(() => import('../pages/city'))
const Order = lazy(() => import('../pages/order'))
const User = lazy(() => import('../pages/user'))
const BikeMap = lazy(() => import('../pages/bikeMap'))
const Permission = lazy(() => import('../pages/permission'))


export default [
    {
        label: '首页',
        modules: Home,
        key: '/admin/home'
    },
    {
        label: 'UI',
        modules: UI,
        key: '/admin/ui',
        children: [
            {
                label: '按钮',
                key: '/admin/ui/buttons'
            },
            {
                label: '弹框',
                key: '/admin/ui/modals'
            },
            {
                label: 'Loading',
                key: '/admin/ui/loadings'
            },
            {
                label: '通知提醒',
                key: '/admin/ui/notifications'
            },
            {
                label: '全局Message',
                key: '/admin/ui/messages'
            },
            {
                label: 'Tab页签',
                key: '/admin/ui/tabs'
            },
            {
                label: '瀑布图',
                key: '/admin/ui/gallery'
            },
            {
                label: '轮播图',
                key: '/admin/ui/carousel'
            }
        ]
    },
    {
        label: '表单',
        key: '/admin/form',
        modules: Form,
        children: [
            {
                label: '登录',
                key: '/admin/form/login'
            },
            {
                label: '注册',
                key: '/admin/form/reg'
            }
        ]
    },
    {
        label: '表格',
        key: '/admin/table',
        modules: Table,
        children: [
            {
                label: '基础表格',
                key: '/admin/table/basic'
            },
            {
                label: '高级表格',
                key: '/admin/table/high'
            }
        ]
    },
    {
        label: '图表',
        key: '/admin/charts',
        modules: Charts,
        children: [
            {
                label: '柱形图',
                key: '/admin/charts/bar'
            },
            {
                label: '饼图',
                key: '/admin/charts/pie'
            },
            {
                label: '折线图',
                key: '/admin/charts/line'
            }
        ]
    },
    {
        label: '富文本',
        key: '/admin/rich',
        modules: Rich
    },
    {
        label: '城市管理',
        key: '/admin/city',
        modules: City
    },
    {
        label: '订单管理',
        key: '/admin/order',
        modules: Order
    },
    {
        label: '员工管理',
        key: '/admin/user',
        modules: User
    },
    {
        label: '车辆地图',
        key: '/admin/bikeMap',
        modules: BikeMap
    },

    {
        label: '权限设置',
        key: '/admin/permission',
        modules: Permission
    }
]
