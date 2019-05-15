<template>
  <div>
    <div
      class="item"
      v-for="item in goods"
      :key="item.id"
    >
      <router-link :to="`/detail/${item.id}`">
        <div class="left">
          <!-- 点击图片显示预览图 -->
          <img
            :src="item.img"
            alt
            @click.stop.prevent="imgPreview(item.img)"
          >
        </div>
        <div class="right">
          <div class="title">{{item.title}}</div>
          <div class="info">
            <span>{{item.count}}人购买</span>
            <i
              class="cubeic-add"
              @click.stop.prevent="addCart($event,item)"
            ></i>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['goods'],
  methods: {
    addCart($event, item) {
      this.$store.commit('addCart', item)
      this.$emit('addCart', $event.target)
    },
    imgPreview(img) {
      this.$createImagePreview({
        imgs: [img]
      }).show()
    }
  }
}
</script>

<style lang="stylus" scope>
.item
  padding: 10px
  overflow: hidden
  .left
    width: 130px
    float: left
    img
      width: 100%
  .right
    float right
    text-align: left
    height 75px
    .info span
      display: inline-block
      width: 110px
      margin-top 10px
    .title
      line-height: 30px
      font-size 18px
    .cubeic-add
      font-size: 20px
      margin-right: 20px
</style>
