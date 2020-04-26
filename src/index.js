import message from './components/message'
import confirm from './components/confirm'
import baseTable from './components/table'
import baseCol from './components/col'
import basePagination from './components/pagination'
import baseDialog from './components/dialog'
import baseForm from './components/form-f'
import baseFormItem from './components/formItem-f'
// import baseForm from './components/form'
// import baseFormItem from './components/formItem'
import baseCascader from './components/cascader'
import baseTree from './components/tree'
import './style/base.scss'

// const install = function(Vue, opts = {}) {
//   components.map(component => {
//     Vue.component(component.name, component);
//   })
// }

/* 支持使用标签的方式引入 */
// if (typeof window !== 'undefined' && window.Vue) {
// install(window.Vue);
// }

export {
  message,
  confirm,
  baseTable,
  baseCol,
  basePagination,
  baseDialog,
  baseForm,
  baseFormItem,
  baseCascader,
  baseTree,
}
