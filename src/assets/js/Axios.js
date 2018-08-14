import axios from 'axios'
import selfConfig from '../../../config/selfConfig'
import {Message} from 'element-ui'
// element Message配置
const ERROR_MSG_OP = {showClose: true, duration: 0}
const SUCC_MSG_OP = {showClose: true, duration: 2000}

// 超时时间
// axios.defaults.timeout = 8000
axios.defaults.baseURL = selfConfig.API_SERVER
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// http请求拦截器
axios.interceptors.request.use(function (config) {
	return config
}, function (error) {
	Message.error({message: '请求错误', ...ERROR_MSG_OP})
	return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(function (res) {
	if (res.data.returnType === '1') {
		// 如果returnCode=200，表示操作正常完成
		if (res.data.returnCode === '200') {
			let msg = res.data.returnMsg ? res.data.returnMsg : '操作成功!'
			Message.success({message: msg, ...SUCC_MSG_OP})
		} else { // 如果非等于200，代表操作失败。则给出操作失败的原因。如：因为有关系数据不能正常删除等。
			if (res.data.returnCode === '499') {
				Message.error({message: '操作失败！', ...ERROR_MSG_OP})
			} else {
				let msg = res.data.returnMsg ? res.data.returnMsg : '操作失败！'
				Message.error({message: msg, ...ERROR_MSG_OP})
			}
			return Promise.reject(res)
		}
	}
	return res
}, function (error) {
	Message.error({message: '请求错误', ...ERROR_MSG_OP})
	return Promise.reject(error)
})
export default axios
