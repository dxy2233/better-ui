<template>
  <div v-show="visible" class="dialog" :style="'z-index:' + zIndex">
    <div class="wrap" :style="`margin-top:${top}; width:${width}`">
      <div class="dialog-title">
        <span> <slot name="title" /> </span>
        <span @click="close"> <svg-icon icon-class="close" /> </span>
      </div>
      <div class="dialog-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { addMask, cutMask } from './public'

export default {
  name: 'Dialog',
  props: {
    visible: {
      type: Boolean,
    },
    top: {
      type: String,
      default: '15vh',
    },
    width: {
      type: String,
      default: '50%',
    },
  },
  watch: {
    visible(val) {
      if (val) addMask()
      else {
        cutMask()
        this.closed()
      }
    },
  },
  data() {
    return {
      zIndex: 2001,
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    // 关闭后的回调
    closed() {
      this.$emit('closed')
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  .wrap {
    margin: 0 auto;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    .dialog-title {
      display: flex;
      justify-content: space-between;
      height: 45px;
      line-height: 45px;
      padding: 0 15px;
      color: #fff;
      background: #018ad3 linear-gradient(#0195df, #017cc8);
    }
    .dialog-body {
      box-sizing: border-box;
      background: #ebebed;
      padding: 30px 20px;
      button {
        background: #045fc9;
        color: #fff;
        margin: 10px 10px 10px 0;
        padding: 0 10px;
        &:hover {
          background: #158ae7;
        }
      }
    }
  }
}
</style>
