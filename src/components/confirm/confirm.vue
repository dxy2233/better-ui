<template>
  <div v-if="visible" class="confirm" :style="'z-index:2001'">
    <header>
      <!-- <span> <slot name="title"/> </span> -->
      <span>提示</span>
      <!-- <span @click="close"> <svg-icon icon-class="close"/> </span> -->
    </header>
    <main>
      {{ content }}
    </main>
    <footer>
      <button @click="sure">确定</button>
      <button class="fail" @click="close">取消</button>
    </footer>
  </div>
</template>

<script>
import { addMask, cutMask } from './../public'

export default {
  name: 'confirm',
  data() {
    return {
      visible: false,
      content: '',
      promiseStatus: ''
    }
  },
  watch: {
    visible(val) {
      if (val) addMask()
      else {
        cutMask()
      }
    }
  },
  methods: {
    confirm() {
      let _this = this
      return new Promise((resolve, reject) => {
        _this.promiseStatus = { resolve, reject }
      })
    },
    sure() {
      this.promiseStatus.resolve()
      this.visible = false
    },
    close() {
      this.promiseStatus.reject()
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm {
  position: fixed;
  width: 420px;
  background: #fff;
  border-radius: 4px;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  padding: 20px;
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
  header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    font-size: 18px;
    color: #045fc9;
    font-weight: bold;
  }
  footer {
    margin-top: 20px;
    float: right;
    button {
      background: #045fc9;
      color: #fff;
      padding: 0 10px;
      margin-left: 10px;
      &:hover {
        background: #0196e0;
      }
    }
    button.fail {
      color: #666;
      background: #fff;
      border: 1px solid #666;
      &:hover {
        background: #666;
        color: #fff;
      }
    }
  }
}
</style>
