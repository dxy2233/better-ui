<script>
export default {
  name: 'Tree',
  props: {
    treeData: {
      type: Array,
    },
    label: {
      type: String,
    },
    children: {
      type: String,
    },
    removeField: {
      type: String,
    },
  },
  data() {
    return {
      ifShow: {},
      activeRow: {},
    }
  },
  methods: {
    nodeClick(info, key) {
      if (this.ifShow.hasOwnProperty(key)) this.ifShow[key] = !this.ifShow[key]
      this.activeRow = info
      this.$emit('nodeClick', info)
    },
    remove(info) {
      this.$emit('remove', info)
    },
  },
  render() {
    const loop = (array, label, children, key) => {
      return array.map((item, index) => {
        if (item[children] && !this.ifShow.hasOwnProperty(key + index)) {
          this.$set(this.ifShow, key + index, false) // 添加伸缩绑定值
        }
        return item[children] ? (
          <ul>
            <li
              class={{ active: item.id === this.activeRow.id }}
              style={`padding-left:${
                (key + index).toString().split('-').length * 20
              }px;`}
              onClick={() => this.nodeClick(item, key + index)}
            >
              <span class="forward">
                {this.ifShow[key + index] ? (
                  <svg-icon icon-class="u-reduce" />
                ) : (
                  <svg-icon icon-class="u-add" />
                )}
              </span>
              <span class="txt">{item[label]}</span>
              {item[this.removeField] ? (
                <span
                  class="afterward"
                  onClick={(e) => {
                    e.stopPropagation()
                    this.remove(item)
                  }}
                >
                  删除
                </span>
              ) : (
                ''
              )}
            </li>
            <div v-show={this.ifShow[key + index]}>
              {loop(item[children], label, children, key + index + '-')}
            </div>
          </ul>
        ) : (
          <ul>
            <li
              class={{ active: item.id === this.activeRow.id }}
              style={`padding-left:${
                (key + index).toString().split('-').length * 20
              }px;`}
              onClick={() => this.nodeClick(item, null)}
            >
              <span class="txt">{item[label]}</span>
              {item[this.removeField] ? (
                <span class="afterward" onClick={() => this.remove(item)}>
                  删除
                </span>
              ) : (
                ''
              )}
            </li>
          </ul>
        )
      })
    }
    return (
      <div class="tree">
        {loop(this.treeData, this.label, this.children, 0)}
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
ul {
  li {
    padding: 5px 0 5px 20px;
    cursor: pointer;
    &:hover {
      color: #158ae7;
      background: #cee9f8;
    }
    .forward {
      text-align: center;
      background: #43acff;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      display: inline-block;
      position: relative;
      top: 3px;
      margin-right: 5px;
      svg {
        position: absolute;
        left: 2px;
        top: 2px;
        font-size: 10px;
        color: #fff;
      }
    }
    .afterward {
      float: right;
      margin-right: 20px;
      color: #ff4949;
    }
  }
  .active {
    color: #045fc9;
    font-weight: bold;
    background: #d0e8fa;
  }
}
</style>
