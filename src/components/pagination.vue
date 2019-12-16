<template>
  <div class="pagination">
    <span
      >共<strong>{{ total }}</strong
      >条记录</span
    >
    <ul>
      <li @click="clickPage(currentPage - 1)">
        <svg-icon icon-class="previousPage" />
      </li>
      <li
        v-for="(item, index) in totalPages"
        :key="index"
        @click="clickPage(item, index)"
        :class="{ active: item === currentPage }"
      >
        {{ item }}
      </li>
      <li @click="clickPage(currentPage + 1)">
        <svg-icon icon-class="nextPage" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number // 当前页
    },
    total: {
      type: Number // 总条数
    },
    pages: {
      type: Number // 总页数
    }
  },
  computed: {
    totalPages() {
      const c = this.currentPage
      const t = this.pages
      // 总页数小于等于7
      if (t <= 7) return t
      // 总页数大于7
      if (c < 5) return [1, 2, 3, 4, 5, 6, '...', t]
      else if (c >= t - 3)
        return [1, '...', t - 5, t - 4, t - 3, t - 2, t - 1, t]
      else return [1, '...', c - 2, c - 1, c, c + 1, c + 2, '...', t]
    }
  },
  methods: {
    clickPage(page, direction) {
      if (page < 1 || page > this.pages || page === this.currentPage) return
      if (page === '...') {
        if (direction === 1) this.clickPage(this.currentPage - 5)
        else this.clickPage(this.currentPage + 5)
      } else {
        // 改变当前页码，触发父级回调
        this.$emit('update:currentPage', page)
        this.$emit('changeCurrentPage')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  padding: 15px 0;
  display: flex;
  strong {
    padding: 0 3px;
    color: #158ae7;
  }
  ul {
    li {
      background: #ebebed;
      margin: 0 5px;
      border-radius: 3px;
      float: left;
      padding: 0 5px;
      cursor: pointer;
      svg {
        font-size: 10px;
        position: relative;
        top: -2px;
      }
    }
    .active {
      background: #158ae7;
      color: #fff;
    }
  }
}
</style>
