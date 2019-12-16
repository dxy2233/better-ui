<script>
export default {
  name: 'Cascader',
  props: {
    value: {
      type: [String, Number]
    },
    data: {
      type: Array
    }
  },
  model: {
    event: 'update'
  },
  data() {
    return {
      boxShow: false,
      cascaderData: [], // 需要渲染的数组
      selectedData: {} // 当前值
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        let res = {}
        function loop(array, id) {
          for (let index = 0; index < array.length; index++) {
            if (array[index].id === id) {
              res = array[index]
              break
            } else {
              if (array[index].nextNodes) loop(array[index].nextNodes, id)
            }
          }
        }
        loop(this.data, this.value)
        this.selectedData = res
      }
    }
  },
  methods: {
    start() {
      this.cascaderData = []
      this.cascaderData[0] = this.data
      this.boxShow = true
    },
    mouserEnter(info, index) {
      !info.nextNodes
        ? (this.cascaderData = this.cascaderData.slice(0, index + 1))
        : this.$set(this.cascaderData, index + 1, info.nextNodes)
    },
    selectData(info) {
      this.selectedData = info
      this.$emit('update', info.id)
      this.$emit('change', info) // change回调
      this.boxShow = false
    }
  },
  render() {
    let _this = this
    document.onmouseup = function(e) {
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
        <select value="1" onclick={this.start} disabled={this.$attrs.disabled}>
          <option value="1" style="display:none;">
            {this.selectedData.orgName}
          </option>
        </select>
        <div v-show={this.boxShow} class="box">
          {this.cascaderData.map((item, index) => {
            return (
              <ul>
                {item.map(item2 => {
                  return (
                    <li
                      onmouseenter={() => {
                        this.mouserEnter(item2, index)
                      }}
                      onclick={() => {
                        this.selectData(item2)
                      }}
                    >
                      {item2.orgName}
                      {item2.nextNodes ? <span> ></span> : ''}
                    </li>
                  )
                })}
              </ul>
            )
          })}
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.cascader {
  position: relative;
  z-index: 1000;
  width: 100%;
  .box {
    position: absolute;
    box-sizing: border-box;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    display: flex;
    ul {
      height: 250px;
      overflow: auto;
      border-left: 1px solid #ccc;
      padding: 5px;
      li {
        line-height: 30px;
        cursor: pointer;
        span {
          color: #ccc;
        }
        &:hover {
          color: #045fc9;
        }
      }
    }
    ul:first-child {
      width: 80px;
    }
    ul:nth-child(2) {
      width: 160px;
    }
    ul:nth-child(3) {
      width: 150px;
    }
  }
}
</style>
