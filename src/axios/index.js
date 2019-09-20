import axios from 'axios'

axios.interceptors.response.use(resp => {
    if(resp.status === 200) {
        return resp.data
    }
    else {
        return Promise.reject(resp.data)
    }
})

export default class Axios {
    static get(url, params) {
        return axios.get(url, { params })
    }
    static post(url, data) {
        return axios.post(url, { data })
    }
}