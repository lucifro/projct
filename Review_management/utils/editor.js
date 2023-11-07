// 富文本编辑器
// 创建编辑器函数，创建工具栏函数
const { createEditor, createToolbar } = window.wangEditor

// 编辑器配置对象
const editorConfig = {
    // 占位提示文字
    placeholder: '发布文章内容...',
    // 编辑器变化时回调函数
    onChange(editor) {
        // 获取富文本的内容
        const html = editor.getHtml()
        console.log('editor content', html)
        // 也可以同步到 <textarea>
        // 为快速收集整个表单内容作铺垫
        document.querySelector('.publish-content').value = html
    }
}

const editor = createEditor({
    // 选择器
    selector: '#editor-container',
    // 默认内容
    html: '<p><br></p>',
    // 配置项
    config: editorConfig,
    // 配置集成模式 default:全部
    mode: 'default', // or 'simple'
})

// 工具栏
// 工具栏配置
const toolbarConfig = {}
// 创建工具栏
const toolbar = createToolbar({
    // 为指定的编辑器创建工具栏
    editor,
    // 工具栏创建的位置
    selector: '#toolbar-container',
    // 工具栏的配置对象
    config: toolbarConfig,
    // 配置集成模式 default:全部
    mode: 'default', // or 'simple'
})