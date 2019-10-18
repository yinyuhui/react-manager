import axios from 'axios'
import { Modal } from 'antd'

const domain = 'https://www.fastmock.site/mock/1e07088f8d89e91fec628ba9ffa274e9/reactMs/'

const getUrl = (url) => {
    // 请求时 传入URL 开头可加斜线也可不加 均不会报错
    url = /^\//.test(url) ? url.substr(1) : url
    return url.includes('http') ? url : domain + url
}

const showLoading = () => {
    const loading = document.querySelector('.my-loading')
    loading.style.display = 'block'
}

const closeLoading = () => {
    const loading = document.querySelector('.my-loading')
    loading.style.display = 'none'
}

axios.interceptors.response.use(resp => {
    closeLoading()
    let res = resp.data
    if(resp.status === 200) {
        if(res.status === '1' || res.code === 200) {
            return res
        }
        Modal.info({
            title: '提示',
            content: res.msg || res.desc
        })
    }
    else {
        Modal.info({
            title: '提示',
            content: resp.desc
        })
        return Promise.reject(resp.result)
    }
})

export default class Axios {
    static get(url, params, loading = true) {
        loading && showLoading()
        return axios.get(getUrl(url), { params })
    }
    static post(url, data) {
        return axios.post(getUrl(url), { data })
    }
}