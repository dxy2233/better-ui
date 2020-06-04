<template>
  <div id="app">
    <button @click="openDialog('新增单位')">opendialog</button>
    <baseDialog :visible.sync="dialog">
      <template #title>{{ dialogTitle }}</template>
      <baseForm ref="systemForm" :form="form" :rules="rules">
        <div v-if="dialogTitle === '新增单位'" key="key1">
          <baseFormItem label="单位名称" prop="orgName" required>
            <input type="text" v-model="form.orgName" key="orgName1" />
          </baseFormItem>
          <baseFormItem label="上级节点">
            <baseCascader v-model="form.parentId" :data="dutyDepartmentData" />
          </baseFormItem>
        </div>
        <div v-else key="key2">
          <baseFormItem label="单位名称" required>
            <input type="text" v-model="form.orgName" disabled />
          </baseFormItem>
          <baseFormItem label="系统名称" prop="name" required>
            <input type="text" v-model="form.name" />
          </baseFormItem>
        </div>
        <button type="button" @click="submit">
          保存
        </button>
      </baseForm>
    </baseDialog>

    <baseTable :tableData="tableData" @rowClick="rowClick">
      <baseCol prop="name" label="信息系统" />
      <baseCol prop="time" label="整改时间" />
    </baseTable>
  </div>
</template>

<script>
import baseForm from './components/form-f'
import baseFormItem from './components/formItem-f'
// import baseDate from './components/date'
import baseCascader from './components/cascader'
import baseDialog from './components/dialog'
import baseTable from './components/table'
import baseCol from './components/col'

export default {
  name: 'app',
  components: {
    baseForm,
    baseFormItem,
    baseCascader,
    baseTable,
    baseCol,
    baseDialog,
  },
  data() {
    // const projectCode = /^([0-9A-Za-z-_.]{6,32})$/
    // const fileNameRule = function (form) {
    //   if (form.dutyDepartment === '') return false
    //   else return true
    // }
    return {
      dutyDepartmentData: [
        {
          id: 123,
          orgName: 'sssss',
          parentId: 1232311,
        },
      ],
      dialog: false,
      dialogTitle: '',
      form: {
        orgName: '',
        parentId: '',
        // 系统
        name: '',
        orgId: '',
      },
      rules: {
        orgName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' },
        ],
        parentId: [
          { required: true, message: '请选择上级单位', trigger: 'blur' },
        ],
        name: [{ required: true, message: '请输入系统名称', trigger: 'blur' }],
      },
      tableData: [
        { name: 'name1', time: 'time1' },
        { name: 'name2', time: 'time2' },
      ],
    }
  },
  mounted() {},
  methods: {
    openDialog(type) {
      this.dialogTitle = type
      this.dialog = true
    },
    submit() {
      console.log(this.$refs.systemForm.validate())
    },
    clearErr() {
      this.$refs.testForm.clearErr()
    },
    rowClick(item, index) {
      console.log(item)
      console.log(index)
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
