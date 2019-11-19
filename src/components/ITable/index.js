import React, { Component } from 'react'
import { Table } from 'antd'

export default class ITable extends Component {
    handleItemClick(record, index) {
        let { selectionType, updateSelected, selectedItems, selectedRowKeys } = this.props
        if(selectionType === 'checkbox') {
            let checkedKeys = selectedRowKeys || []
            let checkedRows = selectedItems || []
            let i = checkedKeys.indexOf(index + 1)

            // 不存在则存入 否则取出 
            let keys = checkedKeys
            let items = checkedRows
            if(i === -1) {
                keys.push(index + 1)
                items.push(record)
            }
            else {
                keys.splice(i, 1)
                items.splice(i, 1)
            }
            updateSelected(keys, items)
        } else {
            let selectedRowKeys = [index + 1]
            let selectedItem = [record]
            updateSelected(selectedRowKeys, selectedItem)
        }
    }

    renderTable = () => {
        let { selectionType, selectedRowKeys, updateSelected } = this.props
        let row_selection = {
            type: 'radio',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                updateSelected(selectedRowKeys, selectedRows)
            }
        }
        const rowCheck = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                updateSelected(selectedRowKeys, selectedRows)
            }
        }
        if(selectionType === false || selectionType === null ) {
            selectionType = false
        } else if(selectionType === 'checkbox') {
            row_selection.type = 'checkbox'
        } else {
            row_selection.type = 'radio'
        }
        let rowSelection = selectionType ? (selectionType === 'checkbox' ? rowCheck : row_selection) : null
        return <Table 
            bordered
            {...this.props}
            rowSelection={rowSelection}
            onRow={(record, index) => {
                return {
                    onClick: () => {
                        return this.handleItemClick(record, index)
                    }
                }
            }}
        />
    }

    render() {
        return (
            <div>
                {
                    this.renderTable()
                }
            </div>
        )
    }
}
