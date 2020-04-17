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
      <button type="button" @click="submit">
        <svg-icon icon-class="save" />保存
      </button>
    </baseForm>
  </div>
</template>

<script>
import baseForm from './components/form-f'
import baseFormItem from './components/formItem'

export default {
  name: 'app',
  components: { baseForm, baseFormItem },
  data() {
    return {
      form: {
        type: null
      },
      rules: {}
    }
  },
  created() {},
  methods: {}
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
