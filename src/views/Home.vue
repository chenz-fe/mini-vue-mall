<template>
  <div class="home">
    <x-header title="小菠萝商城"></x-header>
    <cube-slide
      ref="slide"
      :data="slider"
    >
      <cube-slide-item
        v-for="(item, index) in slider"
        :key="index"
      >
        <router-link :to="`/detail/${item.id}`">
          <img
            :src="item.img"
            class="slider"
          >
        </router-link>
      </cube-slide-item>
    </cube-slide>
    <cube-button @click="showCatg">选择分类</cube-button>
    <cube-drawer
      ref="drawer"
      title="请选择"
      :data="[drawerList]"
      @select="selectHandler"
    ></cube-drawer>
    <!-- 商品列表 -->
    <goods-list
      :goods="filterGoods"
      @addCart="onAddCart"
    ></goods-list>
    <!-- 加购物车动画 -->
    <div class="ball-wrap">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <div
          class="ball"
          v-show="ball.show"
        >
          <div class="inner">
            <div class="cubeic-add"></div>
          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
import GoodsList from '../components/GoodsList.vue'
import XHeader from '../components/Header.vue'
const labels = {
  phone: '手机数码',
  equipment: '家用电器',
  market: '生鲜超市',
  book: '图书音像',
  sport: '运动户外'
}
export default {
  name: 'home',
  data() {
    return {
      slider: [],
      goods: [],
      selectedKeys: [],
      keys: [],
      ball: {
        show: false,
        el: null
      }
    }
  },
  components: {
    GoodsList,
    XHeader
  },
  created() {
    this.getGoodsListData()
  },
  methods: {
    async getGoodsListData() {
      const {
        data: { data: goods, slider, keys }
      } = await this.$http.get('/api/goods')
      this.slider = slider
      this.goods = goods
      this.keys = keys
      this.selectedKeys = [...this.keys]
    },
    showCatg() {
      this.$refs.drawer.show()
    },
    selectHandler(val) {
      this.selectedKeys = [...val]
    },
    onAddCart(el) {
      this.ball.el = el
      this.ball.show = true
    },
    beforeEnter(el) {
      const dom = this.ball.el
      const rect = dom.getBoundingClientRect()
      console.log('====================================')
      console.log(rect.top, rect.left)
      console.log('====================================')
      const x = rect.left - window.innerWidth / 2
      const y = -(window.innerHeight - rect.top - 30)
      el.style.transform = `translate3d(0,${y}px,0)`
      const inner = el.querySelector('.inner')
      console.log('====================================')
      console.log(inner)
      console.log('====================================')
      inner.style.transform = `translate3d(${x}px,0,0)`
    },
    enter(el, done) {
      document.body.offsetHeight
      el.style.transform = `translate3d(0,0,0)`
      const inner = el.querySelector('.inner')
      inner.style.transform = `translate3d(0,0,0)`
      el.addEventListener('transitionend', done)
    },
    afterEnter(el) {
      this.ball.show = false
      el.style.display = 'none'
    }
  },
  computed: {
    filterGoods() {
      let ret = []
      this.selectedKeys.forEach(v => {
        ret = ret.concat(this.goods[v])
      })
      return ret
    },
    drawerList() {
      return this.keys.map(v => {
        return {
          value: v,
          text: labels[v]
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.cube-slide-item img {
  width: 100%;
  height: auto;
}

.cube-slide-dots {
  bottom: 10px;
}

.ball-wrap {
  .ball {
    position: fixed;
    left: 50%;
    bottom: 10px;
    z-index: 100000;
    color: red;
    transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41);

    .inner {
      width: 16px;
      height: 16px;
      transition: all 0.5s linear;

      .cubeic-add {
        font-size: 22px;
      }
    }
  }
}
</style>
