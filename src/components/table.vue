<script>
export default {
  name: 'Table',
  props: {
    tableData: {
      type: Array
    },
    rowClass: {
      type: Function,
      default: function() {}
    }
  },
  render() {
    if (!this.tableData || !this.$slots.default) return
    let resData = this.$slots.default.filter(item => item.tag)
    return (
      <table
        border="1"
        width="100%"
        align="center"
        cellspacing="0"
        cellpadding="0"
      >
        <thead>
          <tr>
            {resData.map(item => (
              <th>{item.componentOptions.propsData.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.tableData.map((item, index) => {
            return (
              <tr class={this.rowClass(item, index)}>
                {resData.map(item2 => {
                  return item2.data.scopedSlots ? (
                    <td>{item2.data.scopedSlots.button({ row: item })}</td>
                  ) : (
                    <td>{item[item2.componentOptions.propsData.prop]}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}
</script>

<style lang="scss" scoped>
table {
  border: #d0e8fa;
  background: #fff;
  text-align: center;
  border-collapse: collapse;
  thead > tr {
    background: #e7f3fd;
  }
  th,
  td {
    padding: 5px 0;
  }
  tbody > tr:hover {
    background: #d0f5ea;
  }
  td {
    :not(:first-child) {
      margin-left: 10px;
    }
  }
}
</style>
