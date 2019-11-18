import Home from '../pages/Home'
import * as UI from '../pages/ui'
import * as Form from '../pages/form'
import * as Table from '../pages/table'
import Rich from '../pages/rich'
import City from '../pages/city'
import Order from '../pages/order'
import User from '../pages/user'

export default [{
    label: '首页',
    modules: Home,
    key: '/admin/home'
}, {
    label: 'UI',
    modules: UI,
    key: '/admin/ui',
    children: [{
        label: '按钮',
        key: '/admin/ui/buttons'
    }, {
        label: '弹框',
        key: '/admin/ui/modals'
    }, {
        label: 'Loading',
        key: '/admin/ui/loadings'
    }, {
        label: '通知提醒',
        key: '/admin/ui/notifications'
    }, {
        label: '全局Message',
        key: '/admin/ui/messages'
    }, {
        label: 'Tab页签',
        key: '/admin/ui/tabs'
    }, {
        label: '瀑布图',
        key: '/admin/ui/gallery'
    }, {
        label: '轮播图',
        key: '/admin/ui/carousel'
    }]
}, {
    label: '表单',
    key: '/admin/form',
    modules: Form,
    children: [{
        label: '登录',
        key: '/admin/form/login'
    }, {
        label: '注册',
        key: '/admin/form/reg'
    }]
}, {
    label: '表格',
    key: '/admin/table',
    modules: Table,
    children: [{
        label: '基础表格',
        key: '/admin/table/basic'
    }, {
        label: '高级表格',
        key: '/admin/table/high'
    }]
}, {
    label: '富文本',
    key: '/admin/rich',
    modules: Rich,
}, {
    label: '城市管理',
    key: '/admin/city',
    modules: City,
}, {
    label: '订单管理',
    key: '/admin/order',
    modules: Order,
}, {
    label: '员工管理',
    key: '/admin/user',
    modules: User,
}]