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
  provide() {
    return {
      form: this.form,
      rules: this.rules,
    }
  },
  methods: {
    // 验证表单所有项目并返回布尔结果
    validate() {
      let res = true
      this.$children.forEach((item) => {
        if (item.prop && !item.mergeVerify()) res = false
      })
      return res
    },
    clearErr() {
      this.$children.forEach((item) => {
        if (item.$options.name === 'FormItem' && item.prop) item.clearMessage()
      })
    },
  },
  render() {
    return <form>{this.$slots.default}</form>
  },
}
</script>

<style lang="scss" scoped>
form {
  width: 80%;
  margin: 0 auto;
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
