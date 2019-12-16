<script>
export default {
  name: 'Message',
  data() {
    return {
      lists: [],
      count: 0
    }
  },
  methods: {},
  render() {
    return (
      <transition-group
        name="list"
        tag="div"
        class="message"
        style={`z-index:${3000 + this.count}`}
      >
        {this.lists.map((item, index) => {
          if (item)
            return (
              <span class={item.type} key={index}>
                {item.content}
              </span>
            )
        })}
      </transition-group>
    )
  }
}
</script>

<style lang="scss" scoped>
.message {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 30px;
  pointer-events: none;
  span {
    display: block;
    min-width: 380px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 4px;
    margin-bottom: 20px;
  }
}
.success {
  background: #009933;
  opacity: 0.9;
  color: #fff;
}
// .info {

// }
.warning {
  background: #eb7f15;
  opacity: 0.9;
  color: #fff;
}
.error {
  background: #ff4949;
  opacity: 0.9;
  color: #fff;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
.list-enter-active,
.list-leave-active {
  transition: all 0.4s;
}
</style>
