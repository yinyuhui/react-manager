import React from 'react'
const pagination = (data, callback) => {
    const { total } = data.result
    return {
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        onChange: (page, pageSize) => {
            callback(page, pageSize)
        },
        total,
        showTotal: total => `共 ${total} 条`,
        showQuickJumper: true,
        onShowSizeChange: (current, size) => {
            callback(current, size)
        }
    }
}

async function getList(_this, url, params) {
    let res = await React.$get(url, params)
    if (res && res.result) {
        if (!_this.getData) {
            console.error('列表刷新方法名为 getData !')
            return
        }
        _this.setState({
            list: res.result.list,
            pagination: pagination(res, (currentPage, pageSize) => {
                _this.params.limit = pageSize
                _this.params.offset = (currentPage - 1) * pageSize
                _this.getData()
            }),
            selectedKey: [],
            selectedItem: []
        })
    }
}

function updateTableSelected(selectedKey, selectedItem) {
    this.setState({
        selectedKey,
        selectedItem
    })
}

export { getList, pagination, updateTableSelected }
