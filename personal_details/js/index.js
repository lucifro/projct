/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = '老李'
axios({
    url: 'http://hmajax.itheima.net/api/settings',
    params: {
        creator
    }
}).then(result => {
    const userObj = result.data.data
    // 回显数据到标签上
    Object.keys(userObj).forEach(key => {
        // 单独选择头像
        if (key === 'avatar') {
            // 赋予头像
            document.querySelector('.prew').scr = userObj[key]
            // 单独选择性别
        } else if (key === 'gender') {
            const genderlist = document.querySelectorAll('.gender')
            // 获取性别数字 0-男 1-女
            const genderNum = userObj[key]
            // 通过性别数字记为下标找到单选框设为选中状态
            genderlist[genderNum].checked = true
        } else {
            // 通过属性当作标签默认赋值
            document.querySelector(`.${key}`).value = userObj[key]
        }
    })
})
/*
    目标2：修改头像
    2.1获取头像文1
    2,2提交服务器并更新头像
*/
document.querySelector('.upload').addEventListener('change', e => {
    // 获取头像文件并存入FormData
    const fd = new FormData()
    fd.append('avatar', e.target.files[0])
    fd.append('creator', creator)
    axios({
        url: 'http://hmajax.itheima.net/api/avatar',
        method: 'PUT',
        data: fd
    }).then(result => {
        // 获取返回的图片地址并渲染
        const imgurl = result.data.data.avatar
        document.querySelector('.prew').src = imgurl
    })
})
/*  
    目标3：提交表单
    3.1收集表单信息
    3.2提交到服务器保存

    目标4：结果提示
    4.1创建toast对象
    4.2调用show方法->显示提示框
*/
document.querySelector('.submit').addEventListener('click', e => {
    // 收集表单信息
    const userForm = document.querySelector('.user-form')
    const userObj = serialize(userForm, { hash: true, empty: true })
    // 新增外号
    userObj.creator = creator
    // 转换性别字符串为数字
    userObj.gender = +userObj.gender
    // 提交服务器保存
    axios({
        url: 'http://hmajax.itheima.net/api/settings',
        method: 'PUT',
        data: userObj
    }).then(result => {
        // 创建toast对象
        const toastDom = document.querySelector('.my-toast')
        const toast = new bootstrap.Toast(toastDom)
        // 调用show方法显示
        toast.show()
    })
})