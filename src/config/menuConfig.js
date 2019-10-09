export default [{
    label: '首页',
    key: '/admin/home'
}, {
    label: 'UI',
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
    children: [{
        label: '按钮',
        key: '/admin/table/basic'
    }, {
        label: '弹框',
        key: '/admin/table/modals'
    }]
}, {
    label: '富文本',
    key: '/admin/rich',
}]