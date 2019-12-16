<script>
export default {
  name: 'Table',
  props: {
    tableData: {
      type: Array
    }
  },
  render() {
    if (!this.tableData || !this.$slots.default) return
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
            {this.$slots.default.map(item => (
              <th>{item.componentOptions.propsData.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.tableData.map(item => {
            return (
              <tr>
                {this.$slots.default.map(item2 => {
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
  .link {
    color: #158ae7;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  td {
    :not(:first-child) {
      margin-left: 10px;
    }
    button {
      border: 1px solid #158ae7;
      color: #158ae7;
      &:hover {
        background-color: #158ae7;
        color: #fff;
      }
    }
    button.remove {
      border: 1px solid #ff4949;
      color: #ff4949;
      &:hover {
        background-color: #ff4949;
        color: #fff;
      }
    }
  }
}
</style>
