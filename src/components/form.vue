<script>
export default {
  name: 'Form',
  props: {
    form: {
      type: Object,
    },
    rules: {
      type: Object,
    },
  },
  data() {
    return {
      validateErrMessage: {},
    }
  },
  created() {
    // 添加错误提示的字段
    this.$slots.default.forEach((item) => {
      if (item.componentOptions && item.componentOptions.propsData.prop) {
        this.$set(
          this.validateErrMessage,
          item.componentOptions.propsData.prop,
          ''
        )
      }
    })
  },
  methods: {
    validate() {
      let pass = true
      let validateData = this.$slots.default
        .map(
          (item) =>
            item.componentOptions && item.componentOptions.propsData.prop
        )
        .filter((item) => item)
      // 筛选出当前需要验证的字段
      for (let index = 0; index < validateData.length; index++) {
        let key = validateData[index]
        this.validateErrMessage[key] = ''
        for (let i = 0; i < this.rules[key].length; i++) {
          if (this.rules[key][i].hasOwnProperty('required')) {
            /* 必填 */
            if (
              this.form[key] === '' ||
              this.form[key] === null ||
              this.form[key].length < 1
            ) {
              this.validateErrMessage[key] = this.rules[key][i].message
              pass = false
              break
            }
          } else if (this.rules[key][i].hasOwnProperty('validator')) {
            /* 正则 */
            if (!this.rules[key][i].validator.test(this.form[key])) {
              this.validateErrMessage[key] = this.rules[key][i].message
              pass = false
              break
            }
          } else if (this.rules[key][i].hasOwnProperty('other')) {
            /* 自定义方法 */
            if (!this.rules[key][i].other(this.form)) {
              this.validateErrMessage[key] = this.rules[key][i].message
              pass = false
              break
            }
          }
        }
      }
      return pass
    },
    clearErr() {
      for (const key in this.validateErrMessage)
        this.validateErrMessage[key] = ''
    },
    test(e, index, type, info) {
      const nowValue = e ? e.target.value : info
      this.validateErrMessage[index] = ''
      let executeRule = this.rules[index].filter(
        (item) => item.trigger === type
      )
      for (let i = 0; i < executeRule.length; i++) {
        if (executeRule[i].hasOwnProperty('required')) {
          /* 必填 */
          if (nowValue === '' || nowValue.length < 1) {
            this.validateErrMessage[index] = executeRule[i].message
            break
          }
        } else if (executeRule[i].hasOwnProperty('validator')) {
          /* 正则 */
          if (!executeRule[i].validator.test(nowValue)) {
            this.validateErrMessage[index] = executeRule[i].message
            break
          }
        } else if (executeRule[i].hasOwnProperty('other')) {
          /* 自定义方法 */
          if (!executeRule[i].other(this.form)) {
            this.validateErrMessage[index] = executeRule[i].message
            break
          }
        }
      }
    },
  },
  render() {
    return (
      <form>
        {this.$slots.default.map((item) => {
          if (item.componentOptions && item.componentOptions.propsData.prop) {
            const loop = (array) => {
              for (let i = 0; i < array.length; i++) {
                // vue组件绑定事件,改变update
                if (array[i].tag && array[i].tag.includes('vue')) {
                  let temUpdate = array[i].componentOptions.listeners.update
                  array[i].componentOptions.listeners.update = (
                    info,
                    address = item.componentOptions.propsData.prop,
                    type = 'change'
                  ) => {
                    Array.isArray(temUpdate)
                      ? Object.assign(
                          {},
                          temUpdate.forEach((item) => item(info)),
                          this.test(null, address, type, info)
                        )
                      : Object.assign(
                          {},
                          temUpdate(info),
                          this.test(null, address, type, info)
                        )
                  }
                }
                // 原生dom绑定事件
                else if (
                  array[i].tag === 'input' ||
                  array[i].tag === 'select' ||
                  array[i].tag === 'textarea'
                ) {
                  array[i].data.on['blur'] = (
                    e,
                    address = item.componentOptions.propsData.prop,
                    type = 'blur'
                  ) => {
                    this.test(e, address, type)
                  }
                  let temChange = array[i].data.on['change'] || function () {}
                  array[i].data.on['change'] = (
                    e,
                    address = item.componentOptions.propsData.prop,
                    type = 'change'
                  ) => {
                    Array.isArray(temChange)
                      ? Object.assign(
                          {},
                          temChange.forEach((item) => item(e)),
                          this.test(e, address, type)
                        )
                      : Object.assign(
                          {},
                          temChange(e),
                          this.test(e, address, type)
                        )
                  }
                }
                // 递归
                if (array[i].children) loop(array[i].children)
              }
            }
            loop(item.componentOptions.children)
          }
          return item.componentOptions ? (
            <div class="form-gound">
              <div class="form-item">
                <label>
                  {item.data.attrs.hasOwnProperty('required') ? <em>*</em> : ''}
                  {item.componentOptions.propsData.label}
                </label>
                <div>{item.componentOptions.children}</div>
              </div>
              <div
                v-show={
                  this.validateErrMessage[item.componentOptions.propsData.prop]
                }
                class="form-err"
              >
                {this.validateErrMessage[item.componentOptions.propsData.prop]}
              </div>
            </div>
          ) : (
            item
          )
        })}
      </form>
    )
  },
}
</script>

<style lang="scss" scoped>
form {
  width: 80%;
  margin: 0 auto;
  .form-item {
    display: flex;
    align-items: center;
    padding: 5px 0;
    > label {
      flex: 2;
      align-self: flex-start;
      text-align: right;
      margin-top: 6px;
      margin-right: 10px;
      em {
        color: red;
        margin-right: 5px;
      }
    }
    > div {
      flex: 7;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      min-height: 31px;
      label {
        margin-right: 10px;
        margin-top: 5px;
      }
      button {
        padding: 0 10px;
        margin: 0 10px 0 0;
        background: #fff;
        border: 1px solid #158ae7;
        color: #158ae7;
        &:hover {
          background: #158ae7;
          color: #fff;
        }
      }
    }
  }
  .form-err {
    color: #ff4949;
    margin-left: 25%;
  }
  button {
    display: block;
    background: #045fc9;
    color: #fff;
    margin: 15px auto;
    padding: 0 10px;
    &:hover {
      background: #158ae7;
    }
  }
}
</style>
