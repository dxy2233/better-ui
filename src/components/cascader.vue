<script>
export default {
  name: 'Cascader',
  props: {
    value: {
      type: [String, Number],
    },
    data: {
      type: Array,
    },
    childrenName: {
      type: String,
      default: 'nextNodes',
    },
    label: {
      type: String,
      default: 'orgName',
    },
  },
  model: {
    event: 'update',
  },
  data() {
    return {
      boxShow: false,
      cascaderData: [], // 需要渲染的数组
      selectedData: {}, // 当前值
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        let res = {}
        const loop = (array, id) => {
          for (let index = 0; index < array.length; index++) {
            if (array[index].id === id) {
              res = array[index]
              break
            } else {
              if (array[index][this.childrenName])
                loop(array[index][this.childrenName], id)
            }
          }
        }
        loop(this.data, this.value)
        this.selectedData = res
      },
    },
    data: {
      handler() {
        let res = {}
        const loop = (array, id) => {
          for (let index = 0; index < array.length; index++) {
            if (array[index].id === id) {
              res = array[index]
              break
            } else {
              if (array[index][this.childrenName])
                loop(array[index][this.childrenName], id)
            }
          }
        }
        loop(this.data, this.value)
        this.selectedData = res
      },
    },
  },
  methods: {
    start() {
      this.cascaderData = []
      this.cascaderData[0] = this.data
      this.boxShow = true
    },
    mouserEnter(info, index) {
      !info[this.childrenName]
        ? (this.cascaderData = this.cascaderData.slice(0, index + 1))
        : this.$set(this.cascaderData, index + 1, info[this.childrenName])
    },
    selectData(info) {
      this.selectedData = info
      this.$emit('update', info.id)
      this.$emit('change', info) // change回调
      this.$refs.betterCascader.dispatchEvent(
        new Event('change', { bubbles: true })
      )
      this.$refs.betterCascader.dispatchEvent(
        new Event('blur', { bubbles: true })
      )
      this.boxShow = false
    },
  },
  render() {
    let _this = this
    document.onmouseup = function (e) {
      var e2 = e || window.event
      var target = e2.target || e2.srcElement
      var _tar = document.body.querySelector('.cascader')
      if (!(target === _tar) && !_tar.contains(e.target)) {
        _this.boxShow = false
        document.onmouseup = ''
      }
    }
    return (
      <div class="cascader">
        <span class="skin">
          <input
            ref="betterCascader"
            type="text"
            value={this.selectedData[this.label]}
            onclick={this.start}
            readonly="readonly"
            disabled={this.$attrs.disabled}
          />
        </span>
        <div v-show={this.boxShow} class="box">
          {this.cascaderData.map((item, index) => {
            return (
              <ul>
                {item.map((item2) => {
                  return (
                    <li
                      onmouseenter={() => {
                        this.mouserEnter(item2, index)
                      }}
                      onclick={(e) => {
                        e.preventDefault()
                        this.selectData(item2)
                      }}
                    >
                      {item2[this.label]}
                      {item2[this.childrenName] ? <span> &gt;</span> : ''}
                    </li>
                  )
                })}
              </ul>
            )
          })}
        </div>
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
.cascader {
  position: relative;
  z-index: 1000;
  width: 100%;
  .skin {
    position: relative;
    &::after {
      position: absolute;
      content: '';
      width: 5px;
      height: 5px;
      border-left: 2px solid #000;
      border-bottom: 2px solid #000;
      transform: rotate(-45deg);
      right: 6px;
      top: 3px;
    }
    input {
      cursor: unset;
    }
  }
  .box {
    position: absolute;
    box-sizing: border-box;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    display: flex;
    ul {
      height: 250px;
      min-width: 60px;
      overflow: auto;
      border-left: 1px solid #ccc;
      padding: 5px;
      li {
        line-height: 30px;
        white-space: nowrap;
        cursor: pointer;
        span {
          color: #ccc;
        }
        &:hover {
          color: #045fc9;
        }
      }
    }
  }
}
</style>
