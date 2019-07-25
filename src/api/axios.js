import axios from 'axios'
import store from '@/store'
import {getCookiesObj} from '@/util/tool.js'
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true // 跨域请求，允许保存cookie
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	if (store.getters.token) {
		config.headers['token'] = store.getters.token // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改 
	}

	var cookies = "Token=5e92ccaa; OpenId=; returnCode=window.location.href%3D%22http%3A%2F%2Ft-mappv2.xueerqin.net%2Fcommon%2Flogin.shtml%23page2%22; loginName=14100000001; roleCode=Parent; parentId=f888ad84b7564dbe98abc21528eaa835; realName=%E5%90%B4%E6%B3%BD%E6%88%90%E5%A7%A8%E5%A7%A8; loginUserId=f06bb0e73f284f1ba70b08cfb55874ce; img=null; studentId=984ff3cb0791493597288b523d89cead"
    var cookiesObj = getCookiesObj(cookies)
	// console.log(cookiesObj)
	config.headers['loginName'] = cookiesObj.loginName 
	config.headers['roleCode'] = cookiesObj.roleCode 
	config.headers['Token'] = cookiesObj.Token
	return config
}, function (error) {
	console.log('error' + error)
	return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	return response
}, function (error) {
	console.log(error)
	return Promise.reject(new Error('服务器君开小差了，请稍后再试'))
})
export default axios
