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

  </div>
</template>

<script>
import GoodsList from '../components/GoodsList.vue'
import create from '../services/create.js'
import BallAnimation from '../components/BallAnimation.vue'
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
      keys: []
    }
  },
  components: {
    GoodsList
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
      const anim = create(BallAnimation, { el })
      anim.start()
      anim.$on('transitionend', () => {
        anim.remove()
      })
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

</style>
