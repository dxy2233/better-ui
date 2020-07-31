<script>
export default {
  name: 'Table',
  props: {
    tableData: {
      type: Array,
    },
    rowClass: {
      type: Function,
      default: function () {},
    },
  },
  methods: {
    rowClick(item, index) {
      this.$emit('rowClick', item, index)
    },
  },
  render() {
    if (!this.tableData || !this.$slots.default) return
    let resData = this.$slots.default.filter((item) => item.tag)
    return (
      <table width="100%" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            {resData.map((item) => (
              <th>{item.componentOptions.propsData.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.tableData.map((item, index) => {
            return (
              <tr
                onClick={() => this.rowClick(item, index)}
                class={this.rowClass(item, index)}
              >
                {resData.map((item2) => {
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
  },
}
</script>

<style lang="scss" scoped></style>
