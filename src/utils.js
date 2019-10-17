export const pagination = (data, callback) => {
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