import ConfirmComponents from './confirm.vue'

export default function (Vue) {
  let confirmCon = Vue.extend(ConfirmComponents)
  let instance = new confirmCon().$mount()
  Vue.prototype.$confirm = (content, title) => {
    document.body.appendChild(instance.$el)
    instance.content = content
    instance.title = title
    instance.visible = true
    return instance.confirm()
  }
}
