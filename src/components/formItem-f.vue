<script>
export default {
  name: 'FormItem',
  props: {
    label: {
      type: String
    },
    prop: {
      type: String
    }
  },
  inject: ['form', 'rules'],
  methods: {
    test(array, key) {
      this[key + 'Message'] = null
      for (let i = 0; i < array.length; i++) {
        //   required
        if (array[i].required && this.form[this.prop].length < 1) {
          this[key + 'Message'] = array[i].message
          break
        }
        // 正则
        else if (
          array[i].validator &&
          !array[i].validator.test(this.form[this.prop])
        ) {
          this[key + 'Message'] = array[i].message
          break
        }
        // 自定义方法
        else if (array[i].other && array[i].other(this.form)) {
          this[key + 'Message'] = array[i].message
          break
        }
      }
    }
  },
  data() {
    return {
      blurMessage: null,
      changeMessage: null
    }
  },
  computed: {
    errMessage() {
      if (!this.blurMessage && !this.changeMessage) return null
      else return this.blurMessage || this.changeMessage
    }
  },
  mounted() {
    if (this.prop) {
      const rules = {
        blur: this.rules[this.prop].filter(item => item.trigger === 'blur'),
        change: this.rules[this.prop].filter(item => item.trigger === 'change')
      }
      for (const key in rules) {
        if (rules[key].length > 0) {
          this.$refs[this.prop].addEventListener(
            key,
            () => {
              this.test(rules[key], key)
            },
            true
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
            {this.$attrs.hasOwnProperty('required') ? <em>*</em> : null}
            {this.label}:
          </label>
          <span ref={this.prop}>{this.$slots.default}</span>
        </div>
        <div v-show={this.errMessage} class="form-err">
          {this.errMessage}
        </div>
      </div>
    )
  }
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
