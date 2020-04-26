<script>
function createNum(start, end) {
  let res = []
  for (let index = start; index <= end; index++) {
    index < 10 ? res.push(`0${index}`) : res.push(index)
  }
  return res
}

export default {
  name: 'Date',
  props: {
    value: {
      type: String,
    },
  },
  model: {
    event: 'update',
  },
  data() {
    return {
      date: '',
      time: ['00', '00', '00'],
      boxShow: false,
    }
  },
  methods: {
    inputChange($event) {
      this.$emit('update', $event.target.value)
    },
    dateChange($event) {
      this.date = $event.target.value
      this.valChange()
    },
    timeChange(val, type) {
      this.time[type] = val
      this.valChange()
    },
    valChange() {
      if (this.date === '') {
        let myDate = new Date()
        this.date = myDate.toLocaleDateString().replace(/\//g, '-')
      }
      this.$emit('update', `${this.date} ${this.time.join(':')}`)
    },
    submit($event) {
      $event.stopPropagation()
      this.boxShow = false
    },
    start() {
      this.boxShow = true
    },
  },
  render() {
    let _this = this
    document.onmouseup = function (e) {
      var e2 = e || window.event
      var target = e2.target || e2.srcElement
      var _tar = document.body.querySelector('.date-control')
      if (!(target === _tar) && !_tar.contains(e.target)) {
        _this.boxShow = false
        document.onmouseup = ''
      }
    }
    return (
      <div class="date-control" onclick={this.start}>
        <input
          type="text"
          placeholder="请选择日期和时间"
          value={this.value}
          oninput={this.inputChange}
        />
        <div v-show={this.boxShow} class="box">
          <input type="date" value={this.date} oninput={this.dateChange} />
          <hr />
          <div class="time">
            <ul>
              {createNum(0, 23).map((item) => {
                return (
                  <li
                    onclick={() => {
                      this.timeChange(item, 0)
                    }}
                    class={{ active: item === this.time[0] }}
                  >
                    {item}
                  </li>
                )
              })}
            </ul>
            <ul>
              {createNum(0, 59).map((item) => {
                return (
                  <li
                    onclick={() => {
                      this.timeChange(item, 1)
                    }}
                    class={{ active: item === this.time[1] }}
                  >
                    {item}
                  </li>
                )
              })}
            </ul>
            <ul>
              {createNum(0, 59).map((item) => {
                return (
                  <li
                    onclick={() => {
                      this.timeChange(item, 2)
                    }}
                    class={{ active: item === this.time[2] }}
                  >
                    {item}
                  </li>
                )
              })}
            </ul>
          </div>
          <hr />
          <button type="button" onclick={this.submit}>
            确认
          </button>
        </div>
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
.date-control {
  position: relative;
  .box {
    position: absolute;
    box-sizing: border-box;
    border-radius: 4px;
    width: 250px;
    height: 250px;
    padding: 10px;
    background: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    input {
      margin-bottom: 10px;
    }
    hr {
      margin: 0 -10px;
    }
    .time {
      display: flex;
      height: 160px;
      margin: 0 -10px;
      ul {
        overflow-y: auto;
        flex: 1;
        text-align: center;
        display: flex;
        flex-flow: column;
        li {
          cursor: pointer;
          &:hover {
            background: #f3f3f3;
          }
        }
        .active {
          background: #f3f3f3;
        }
      }
    }
    button {
      float: right;
      margin-top: 2px;
      color: #fff;
      background-color: #39f;
      border-color: #39f;
    }
  }
}
</style>
