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
    }]
}, {
    label: '表单',
    key: '/admin/form',
    children: [{
        label: '按钮',
        key: '/admin/form/buttons'
    }, {
        label: '弹框',
        key: '/admin/form/modals'
    }]
}, {
    label: '表格',
    key: '/admin/table',
    children: [{
        label: '按钮',
        key: '/admin/table/buttons'
    }, {
        label: '弹框',
        key: '/admin/table/modals'
    }]
}, {
    label: '富文本',
    key: '/admin/rich',
}]