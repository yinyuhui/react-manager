import React from 'react'
const pagination = (data, callback) => {
    const { page, pageSize, total } = data.result
    return {
        // page: 1,
        // offset: 0,
        // current: 1,
        // pageSize: 3,
        // showQuickJumper: true,
        // showSizeChanger: true,
        // showTotal: (total) => `共${total}页`,
        // pageSizeOptions: ['10', '20', '50', '100'],
        onChange: (current) => {
            callback(current)
        },
        current: +page,
        pageSize,
        total,
        showTotal: (total) => `共${total}条`,
        showQuickJumper: true,
    }
}   

async function getList(_this, url, params) {
    let res = await React.$get(url, params)
    if(res && res.result) {
        if(!_this.getData) {
            console.error("列表刷新方法名为 getData !")
            return 
        }
        _this.setState({
            list: res.result.list,
            pagination: pagination(res, (current) => {
                _this.params.page = current
                _this.getData()
            })
        })
    }
}

function updateTableSelected(selectedKey, selectedItem) {
    this.setState({
        selectedKey,
        selectedItem
    })
}

export {
    getList,
    pagination,
    updateTableSelected,
}