// axios 公共配置
// 基地址
axios.defaults.baseURL = 'http://geek.itheima.net'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = `Bearer ${token}`)
    return config
}, function (error) {
    return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const result = response.data
    return result;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.dir(error)
    // 判断token码
    if (error?.response?.status === 401) {
        alert('身份验证失败,请重新登录')
        // 清空本地
        localStorage.clear()
        // 跳转到首页
        location.href = '../login/index.html'
    }
    return Promise.reject(error);
});