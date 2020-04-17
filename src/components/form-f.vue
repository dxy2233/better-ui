<script>
export default {
  name: 'Form',
  props: {
    form: {
      type: Object
    },
    rules: {
      type: Object
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
  render() {
    return <form>sdfdsf</form>
  }
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
