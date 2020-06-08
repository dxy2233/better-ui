export function isEmpty(v) {
  switch (typeof v) {
    case 'undefined':
      return true
    case 'string':
      if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0)
        return true
      break
    case 'boolean':
      if (v !== true && v !== false) return true
      break
    case 'number':
      if (isNaN(v)) return true
      break
    case 'object':
      if (null === v || v.length === 0) return true
      for (var i in v) {
        return false
      }
      return true
  }
  return false
}

export function verify(array, form, key) {
  for (let i = 0; i < array.length; i++) {
    let res = form
    key.split('.').forEach((item) => {
      res = res[item]
    })
    // required
    if (array[i].required && isEmpty(res)) {
      return [array[i].message, array[i].trigger]
    }
    // 正则
    else if (array[i].validator && !array[i].validator.test(res)) {
      return [array[i].message, array[i].trigger]
    }
    // 自定义方法
    else if (array[i].other && !array[i].other(form)) {
      return [array[i].message, array[i].trigger]
    }
  }
  // 验证通过后返回null直接赋值给错误文字的字段
  return [null, null]
}

export function searchParent(node) {
  let res = {}
  !(function loop(node) {
    if (node.form) res = node.form
    else loop(node.$parent)
  })(node)
  return res
}
