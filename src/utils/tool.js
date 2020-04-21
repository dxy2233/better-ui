export function isEmpty(v) {
  switch (typeof v) {
    case 'undefined':
      return true
    case 'string':
      if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0)
        return true
      break
    case 'boolean':
      if (!v) return true
      break
    case 'number':
      if (0 === v || isNaN(v)) return true
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
    //   required
    if (array[i].required && isEmpty(form[key])) {
      return [array[i].message, array[i].trigger]
    }
    // 正则
    else if (array[i].validator && !array[i].validator.test(form[key])) {
      return [array[i].message, array[i].trigger]
    }
    // 自定义方法
    else if (array[i].other && array[i].other(form)) {
      return [array[i].message, array[i].trigger]
    }
  }
  return [null, null]
}
