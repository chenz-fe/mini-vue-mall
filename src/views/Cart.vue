<template>
  <div class="cart-container">
    <div
      class="good"
      v-for="(item,index) in cart"
      :key="item.id"
    >
      {{item.title}}
      <div class="right">
        <i
          class="cubeic-remove"
          @click="countMinus(index)"
        ></i>
        <span class="num-span">
          {{item.cartCount}}
        </span>
        <i
          class="cubeic-add"
          @click="countAdd(index)"
        ></i>
      </div>
    </div>
    <div class="totalbox">
      总价 {{total}}
    </div>
    <div class="btnbox">
      <cube-button
        :disabled="true"
        v-if="total<minTotal"
      >
        还差{{minTotal-total}}可以购买
      </cube-button>
      <cube-button v-else>
        下单
        <span v-if="!token">
          (需要登录)
        </span>
      </cube-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      minTotal: 1000
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart,
      token: state => state.token
    }),
    ...mapGetters({
      total: 'total'
    })
  },
  methods: {
    countAdd(index) {
      this.$store.commit('countAdd', index)
    },
    countMinus(index) {
      this.$store.commit('countMinus', index)
    }
  }
}
</script>

<style lang="stylus">
.cart-container
  font-size: 18px
.totalbox
  padding: 20px
.num-span
  display: inline-block
  width: 30px
  text-align: center
.good
  padding: 20px
  text-align: left
  border-bottom: 1px solid #f5f5f5
  .right
    float: right
  i
    font-size: 18px
</style>

