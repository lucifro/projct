const creator = '张三'
function getbooklist() {
    axios({
        url: 'http://hmajax.itheima.net/api/books',
        params: {
            creator
        }
    }).then(result => {
        const booklist = result.data.data
        const htmltr = booklist.map((item, index) => {
            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.bookname}</td>
                    <td>${item.author}</td>
                    <td>${item.publisher}</td>
                    <td data-id=${item.id}>
                        <span class="del">删除</span>
                        <span class="edit">编辑</span>
                    </td>
                </tr>
            `
        }).join('')
        // 渲染图书列表
        document.querySelector('.list').innerHTML = htmltr

    })
}
getbooklist()
// 创建弹框对象
const addmodalDom = document.querySelector('.add-modal')
const addmodal = new bootstrap.Modal(addmodalDom)
// 保存按钮
document.querySelector('.add-btn').addEventListener('click', () => {
    // 收集表单
    const addform = document.querySelector('.add-form')
    const bookobj = serialize(addform, { hash: true, empty: true })
    axios({
        url: 'http://hmajax.itheima.net/api/books',
        method: 'POST',
        data: {
            ...bookobj,
            creator
        }
    }).then(result => {
        // 重新请求并渲染列表
        getbooklist()
        // 重置表单
        addform.reset()
        // 隐藏弹框
        addmodal.hide()
    })
})
// 删除按钮
document.querySelector('.list').addEventListener('click', e => {
    // 判断点击的是删除元素
    if (e.target.classList.contains('del')) {
        const theid = e.target.parentNode.dataset.id
        axios({
            url: `http://hmajax.itheima.net/api/books/${theid}`,
            method: 'DELETE'
        }).then(() => {
            getbooklist()
        })
    }
})
// 编辑按钮
const editDom = document.querySelector('.edit-modal')
const editModal = new bootstrap.Modal(editDom)
document.querySelector('.list').addEventListener('click', e => {
    // 判断是否为编辑按钮
    if (e.target.classList.contains('edit')) {
        // 获取当前编辑数据
        const theid = e.target.parentNode.dataset.id
        axios({
            url: `http://hmajax.itheima.net/api/books/${theid}`
        }).then(e => {
            const bookObj = e.data.data
            // 获取数据
            const keys = Object.keys(bookObj)
            // 遍历数据追加到当前弹框内
            keys.forEach(key => {
                document.querySelector(`.edit-form .${key}`).value = bookObj[key]
            })
        })
        // 打开弹窗
        editModal.show()

    }
})
// 点击修改按钮会隐藏弹框
document.querySelector('.edit-btn').addEventListener('click', e => {
    const editForm = document.querySelector('.edit-form')
    const { id, bookname, author, publisher } = serialize(editForm, { hash: true, empty: true })
    axios({
        url: `http://hmajax.itheima.net/api/books/${id}`,
        method: 'PUT',
        data: {
            bookname,
            author,
            publisher,
            creator
        }
    }).then(() => {
        // 刷新渲染
        getbooklist()
        // 关闭弹窗
        editModal.hide()
    })
})
