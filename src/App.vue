<template>
  <div id="app">
    <baseForm ref="testForm" :form="form" :rules="rules">
      <baseFormItem label="报告类型" prop="type" required>
        <select v-model="form.type">
          <option :value="1">基线检查报告</option>
          <option :value="2">渗透测试报告</option>
          <option :value="3">漏洞扫描报告</option>
        </select>
      </baseFormItem>
      <baseFormItem label="blur测试" prop="blurTest" required>
        <input type="text" v-model="form.blurTest" />
      </baseFormItem>
      <button type="button" @click="submit">保存</button>
    </baseForm>
  </div>
</template>

<script>
import baseForm from './components/form-f'
import baseFormItem from './components/formItem-f'

export default {
  name: 'app',
  components: { baseForm, baseFormItem },
  data() {
    const projectCode = /^([0-9A-Za-z-_.]{6,32})$/
    return {
      form: {
        type: null,
        blurTest: '',
      },
      rules: {
        type: [
          { required: true, message: '请输入项目编号', trigger: 'change' },
        ],
        blurTest: [
          { required: true, message: '请输入文本', trigger: 'blur' },
          {
            validator: projectCode,
            message: '请输入由字母、数字、- 、 _ 或 . 组成的6-32位项目编号',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {},
  methods: {
    submit() {
      console.log(this.$refs.testForm.validate())
    },
  },
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  min-height: 100vh;
  background: #001f3f;
  form {
    background: #fff;
  }
}
</style>
