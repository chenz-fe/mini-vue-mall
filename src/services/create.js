import Vue from 'vue'

function create(Component, props) {
  const instance = new Vue({
    render(h) {
      return h(Component, { props })
    }
  }).$mount() // 执行挂载
  // 将真实dom节点插入文档中
  document.body.appendChild(instance.$el)
  // 获取组件实例
  const comp = instance.$children[0]
  // 销毁组件，释放内存
  comp.remove = () => {
    instance.$destroy()
  }
  return comp
}

export default create
