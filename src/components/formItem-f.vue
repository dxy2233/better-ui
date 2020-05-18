<script>
import { verify } from '@/utils/tool.js'

export default {
  name: 'FormItem',
  props: {
    label: {
      type: String,
    },
    prop: {
      type: String,
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
  },
  methods: {
    mergeVerify() {
      this.clearMessage()
      const res = verify(this.rules[this.prop], this.$parent.form, this.prop)
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
    if (this.prop) {
      const rules = {
        blur: this.rules[this.prop].filter((item) => item.trigger === 'blur'),
        change: this.rules[this.prop].filter(
          (item) => item.trigger === 'change'
        ),
      }
      // 委托blur和change事件
      for (const key in rules) {
        if (rules[key].length > 0) {
          this.$refs[this.prop].addEventListener(
            key,
            () => {
              this[key + 'Message'] = verify(
                rules[key],
                this.$parent.form,
                this.prop
              )[0]
            },
            key === 'blur' && this.$children.length === 0 ? true : false
          )
        }
      }
    }
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
  margin-left: calc(100% / 9 * 2 + 10px);
}
</style>
