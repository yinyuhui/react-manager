import React from 'react';
import ReactDOM from 'react-dom'
import 'antd/dist/antd.less'
import './style/common.less'

import axios from './axios'
import dayjs from 'dayjs'

import Router from './router'

// 全局注册方法 通过 React.$axios 可访问
React.$get = axios.get
React.$post = axios.post
React.$dayjs = dayjs

ReactDOM.render(<Router />, document.getElementById('root'));


