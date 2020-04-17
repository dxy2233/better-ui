<template>
  <div id="app">
    <baseTable :tableData="tableData" :rowClass="tableRowClassName">
      <baseCol prop="projectCode" label="项目编号" />
    </baseTable>
    <baseCascader
      v-model="dutyDepartment"
      :data="dutyDepartmentData"
      placeholder="请输入责任部门"
    />
  </div>
</template>

<script>
import baseTable from './components/table'
import baseCol from './components/col'
import baseCascader from './components/cascader'

export default {
  name: 'app',
  components: { baseTable, baseCol, baseCascader },
  data() {
    return {
      tableData: [{ projectCode: 123 }, { projectCode: 121 }],
      dutyDepartment: '1EAE1A18B25344599A5351A606364AB4',
      dutyDepartmentData: []
    }
  },
  created() {
    setTimeout(() => {
      this.dutyDepartmentData = [
        {
          id: '1EAE1A18B25344599A5351A606364AB4',
          orgName: '大数据智能中心',
          orgCode: 'CQYD_005',
          orgType: '业务扩展部门',
          parentId: '9692EF34328747E59798D95BC1079344',
          editVisble: false,
          createVisble: false,
          deleteVisble: false,
          nextNodes: null
        },
        {
          id: '22F7CA13747445B68BA459AAAB2D6AD7',
          orgName: '全业务支撑中心',
          orgCode: 'CQYD_004',
          orgType: '业务支撑部门',
          parentId: '9692EF34328747E59798D95BC1079344',
          editVisble: false,
          createVisble: false,
          deleteVisble: false,
          nextNodes: null
        },
        {
          id: '616072E0F3FF4637AF0582FD8146A813',
          orgName: '信息安全部',
          orgCode: 'CQYD_001',
          orgType: '信息安全部',
          parentId: '9692EF34328747E59798D95BC1079344',
          editVisble: false,
          createVisble: false,
          deleteVisble: false,
          nextNodes: null
        },
        {
          id: '7D9BA4FCA3554D79A38F5788EB1D600C',
          orgName: '信息系统支撑部',
          orgCode: 'CQYD_002',
          orgType: '信息系统支撑部',
          parentId: '9692EF34328747E59798D95BC1079344',
          editVisble: false,
          createVisble: false,
          deleteVisble: false,
          nextNodes: null
        },
        {
          id: 'D29FC5BB59ED499A90D5518E46DB8671',
          orgName: '计划部',
          orgCode: 'CQYD_003',
          orgType: '计划部',
          parentId: '9692EF34328747E59798D95BC1079344',
          editVisble: false,
          createVisble: false,
          deleteVisble: false,
          nextNodes: null
        }
      ]
    }, 1000)
  },
  methods: {
    tableRowClassName(row) {
      if (row.projectCode === 123) return 'prompt'
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  /deep/ .prompt {
    background: red;
  }
}
</style>
