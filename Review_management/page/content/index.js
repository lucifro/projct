/**
 * 目标1：获取文章列表并展示
 *  1.1 准备查询参数对象
 *  1.2 获取文章列表数据
 *  1.3 展示到指定的标签结构中
 */
// 准备查询参数
const queryobj = {
    status: '', //文章状态
    channel_id: '', //文章频道
    page: 1,    // 当前页码
    per_page: 2 //当前页面条数
}
// 保存文章总条数
let totalcount = 0

async function setArtileList() {
    const res = await axios({
        url: '/v1_0/mp/articles',
        params: queryobj
    })
    // console.log(res);
    const htmlstr = res.data.results.map(item =>
        `<tr>
        <td>
          <img src="${item.cover.type === 0 ? `https://img2.baidu.com/it/u=2640406343,1419332367&amp;fm=253&amp;fmt=auto&amp;app=138&amp;f=JPEG?w=708&amp;h=500` : item.cover.images[0]}" alt="">
        </td>
        <td>${item.title}</td>
        <td>
            ${item.status === 1 ? `<span class="badge text-bg-success">审核通过</span>` : `<span class="badge text-bg-primary">待审核</span>`}
        </td>
        <td>
          <span>${item.pubdate}</span>
        </td>
        <td>
          <span>${item.read_count}</span>
        </td>
        <td>
          <span>${item.comment_count}</span>
        </td>
        <td>
          <span>${item.like_count}</span>
        </td>
        <td>
          <i class="bi bi-pencil-square edit"></i>
          <i class="bi bi-trash3 del"></i>
        </td>
      </tr>`
    ).join('')
    document.querySelector('.art-list').innerHTML = htmlstr
    // 文章总条数
    totalcount = res.data.total_count
    document.querySelector('.total-count').innerHTML = `共${totalcount}条`
}
setArtileList()
/**
 * 目标2：筛选文章列表
 *  2.1 设置频道列表数据
 *  2.2 监听筛选条件改变，保存查询信息到查询参数对象
 *  2.3 点击筛选时，传递查询参数对象到服务器
 *  2.4 获取匹配数据，覆盖到页面展示
 */
async function setChannleList() {
    const res = await axios({
        url: '/v1_0/channels'
    })
    const htmlstr = `
    <option value="" selected="">请选择文章频道</option>`+ res.data.channels.map(item =>
        `<option value="${item.id}">${item.name}</option>`
    ).join('')
    document.querySelector('.form-select').innerHTML = htmlstr
}
setChannleList()
// 筛选状态标记数字绑定到查询参数对象上
document.querySelectorAll('.form-check-input').forEach(radio => {
    radio.addEventListener('change', e => {
        queryobj.status = e.target.value
    })
})

// 筛选频道id绑定到查询参数对象上
document.querySelector('.form-select').addEventListener('change', e => {
    queryobj.channel_id = e.target.value
})
// 筛选合格的参数对象
document.querySelector('.sel-btn').addEventListener('click', () => {
    setArtileList()
})
/**
 * 目标3：分页功能
 *  3.1 保存并设置文章总条数
 *  3.2 点击下一页，做临界值判断，并切换页码参数并请求最新数据
 *  3.3 点击上一页，做临界值判断，并切换页码参数并请求最新数据
 */
// 下一页临界值判断
document.querySelector('.next').addEventListener('click', e => {
    // 当前页码小于最大页码
    if (queryobj.page < Math.ceil(totalcount / queryobj.per_page)) {
        queryobj.page++
        document.querySelector('.page-now').innerHTML = `第${queryobj.page}页`
        setArtileList()
    }
})
// 上一页临界值
document.querySelector('.last').addEventListener('click', e => {
    // 页码大于1的时候才能翻到上一页
    if (queryobj.page > 1) {
        queryobj.page--
        document.querySelector('.page-now').innerHTML = `第${queryobj.page}页`
    }
    setArtileList()
})
/**
 * 目标4：删除功能
 *  4.1 关联文章 id 到删除图标
 *  4.2 点击删除时，获取文章 id
 *  4.3 调用删除接口，传递文章 id 到服务器
 *  4.4 重新获取文章列表，并覆盖展示
 *  4.5 删除最后一页的最后一条，需要自动向前翻页
 */
// 点击删除时获取文章id
document.querySelector('.art-list').addEventListener('click', async e => {
    // 判断点击的时删除元素
    if (e.target.classList.contains('del')) {
        const delid = e.target.parentNode.dataset.id
        await axios({
            url: `/v1_0/mp/articles/${delid}`,
            method: 'DELETE'
        })
        // 删除最后一页的最后一条,需要自动向上翻页
        const children = document.querySelector('.art-list').children
        if (children.length === 1 && queryobj.page !== 1) {
            queryobj.page--
            document.querySelector('.page-now').innerHTML = `第${Object.page}页`
        }
        // 重新获取文章列表覆盖展示
        setArtileList()
    }
})
// 点击编辑时，获取文章 id，跳转到发布文章页面传递文章 id 过去

document.querySelector('.art-list').addEventListener('click', e => {
    if (e.target.classList.contains('edit')) {
        const artid = e.target.parentNode.dataset.id
        location.href = `../publish/index.html?id=${artid}`
    }
})
