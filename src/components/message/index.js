import MessageComponents from './message.vue'

export default function (Vue) {
  let count = 0,
    messageCon,
    instance
  Vue.prototype.$message = (options) => {
    count++
    if (count === 1) {
      messageCon = Vue.extend(MessageComponents)
      instance = new messageCon().$mount()
    }
    document.body.appendChild(instance.$el)
    instance.count = count
    let nowIndex = instance.lists.length
    instance.lists.push(options)
    setTimeout(() => {
      instance.$set(instance.lists, nowIndex, null)
    }, options.time || 3000)
  }
}
