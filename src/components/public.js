export function addMask() {
  let mask = document.body.querySelector('.mask')
  if (mask) {
    let count = parseInt(mask.getAttribute('count'))
    mask.setAttribute('count', count + 1)
  } else {
    let dom = document.createElement('div')
    dom.className = 'mask'
    dom.style['z-index'] = 2000
    dom.setAttribute('count', 1)
    document.body.appendChild(dom)
  }
}

export function cutMask() {
  let mask = document.body.querySelector('.mask')
  mask.getAttribute('count') === '1'
    ? mask.remove()
    : mask.setAttribute('count', parseInt(mask.getAttribute('count')) - 1)
}
