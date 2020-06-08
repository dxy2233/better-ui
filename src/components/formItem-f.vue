<script>
import { verify, searchParent } from '@/utils/tool.js'

export default {
  name: 'FormItem',
  props: {
    label: {
      type: String,
    },
    prop: {
      type: String,
    },
    rule: {
      type: Array,
    },
  },
  inject: ['rules'],
  data() {
    return {
      blurMessage: null,
      changeMessage: null,
    }
  },
  computed: {
    errMessage() {
      if (!this.blurMessage && !this.changeMessage) return null
      else return this.blurMessage || this.changeMessage
    },
    form() {
      return searchParent(this.$parent)
    },
  },
  methods: {
    mergeVerify() {
      this.clearMessage()
      const res = !this.rule
        ? verify(this.rules[this.prop], this.form, this.prop)
        : verify(this.rule, this.form, this.prop)
      if (res[0]) {
        // 返回false并给错误信息赋值
        this[res[1] + 'Message'] = res[0]
        return false
      } else return true
    },
    clearMessage() {
      this.blurMessage = null
      this.changeMessage = null
    },
  },
  mounted() {
    // 委托blur和change事件
    if (this.prop) {
      let objRules = {}
      if (this.rule) {
        objRules = {
          blur: this.rule.filter((item) => item.trigger === 'blur'),
          change: this.rule.filter((item) => item.trigger === 'change'),
        }
      } else {
        objRules = {
          blur: this.rules[this.prop].filter((item) => item.trigger === 'blur'),
          change: this.rules[this.prop].filter(
            (item) => item.trigger === 'change'
          ),
        }
      }
      for (const key in objRules) {
        if (objRules[key].length > 0) {
          this.$refs[this.prop].addEventListener(
            key,
            () => {
              this[key + 'Message'] = verify(
                objRules[key],
                this.form,
                this.prop
              )[0]
            },
            key === 'blur' && this.$children.length === 0 ? true : false
          )
        }
      }
    }
    // else if (this.prop && this.rule) {
    //   this.rule.forEach((item) => {
    //     this.$refs[this.prop].addEventListener(
    //       item.trigger,
    //       () => {
    //         this[item.trigger + 'Message'] = verify(rules[key], this.form, this.prop)[0]
    //       },
    //       item.trigger === 'blur' && this.$children.length === 0 ? true : false
    //     )
    //   })
    // }
  },
  render() {
    return (
      <div class="form-gound">
        <div class="form-item">
          <label>
            {this.$attrs.hasOwnProperty('required') &&
            this.$attrs.required !== false ? (
              <em>*</em>
            ) : null}
            {this.label}
          </label>
          <span ref={this.prop}>{this.$slots.default}</span>
        </div>
        <div v-show={this.errMessage} class="form-err">
          {this.errMessage}
        </div>
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
.form-item {
  display: flex;
  align-items: center;
  padding: 5px 0;
  > label {
    flex: 2;
    align-self: flex-start;
    text-align: right;
    margin-top: 4px;
    margin-right: 10px;
    em {
      color: red;
      margin-right: 5px;
    }
  }
  > span {
    flex: 7;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    min-height: 31px;
    label {
      margin-right: 10px;
      margin-top: -3px;
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
  margin-left: calc(100% / 9 * 2 + 10px);
}
</style>
