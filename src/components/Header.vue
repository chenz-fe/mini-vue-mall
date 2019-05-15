<template>
  <div class="header">
    <i class="cubeic-back" v-if="$routerHistory.canBack()" @click="back"></i>
    <div class="title">{{title}}</div>
    <div class="extend">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    back() {
      this.$router.goBack()
    }
  }

}
</script>

<style lang="stylus" scoped>
.header
  height 50px
  display flex
  align-items center
  font-size 20px
  position relative

  .title
    position absolute
    left 50%
    transform translate3d(-50%,0,0)

</style>
