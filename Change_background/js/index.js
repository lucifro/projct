/**
 * 目标：网站-更换背景
 *  1. 选择图片上传，设置body背景
 *  2. 上传成功时，"保存"图片url网址
 *  3. 网页运行后，"获取"url网址使用
 * */
document.querySelector('.bg-ipt').addEventListener('change', e => {
    // 获取图片追加到FormData里
    const pic = new FormData()
    pic.append('img', e.target.files[0])
    // 上传图片
    axios({
        url: 'http://hmajax.itheima.net/api/uploadimg',
        method: 'POST',
        data: pic
    }).then(result => {
        // 获取返回的图片地址并渲染
        const imgurl = result.data.data.url
        document.body.style.backgroundImage = `url(${imgurl})`
        // 将上传的图片地址保存到浏览器
        localStorage.setItem('bgimg', imgurl)
    })
})
// 获取图片地址运行在网页上
const bgurl = localStorage.getItem('bgimg')
// 判断本地背景
bgurl && (document.body.style.backgroundImage = `url(${bgurl})`)