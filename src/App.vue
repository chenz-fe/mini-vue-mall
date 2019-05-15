<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view" />
    </transition>
    <cube-tab-bar
      class="cube-container"
      v-model="selectedLabel"
      :data="tabs"
      @change="changeHandler"
    >
      <cube-tab
        class="tab-box"
        v-for="(item,index) in tabs"
        :label="item.value"
        :key="index"
      >
        <i
          slot="icon"
          :class="item.icon"
        ></i>
        <span>{{item.label}}</span>
        <span
          class="badge"
          v-if="showBadge(item.label)"
        >{{cartTotal}}</span>

      </cube-tab>
    </cube-tab-bar>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      selectedLabel: '',
      tabs: [
        {
          label: 'Home',
          value: '/',
          icon: 'cubeic-home'
        },
        {
          label: 'Mall',
          value: '/cart',
          icon: 'cubeic-mall'
        },
        {
          label: 'Me',
          value: '/login',
          icon: 'cubeic-person'
        }
      ],
      transitionName: 'route-forward'
    }
  },
  watch: {
    $route(route) {
      this.selectedLabel = route.path
      this.transitionName = this.$router.transitionName
    }
  },
  created() {
    this.selectedLabel = this.$route.path
  },
  methods: {
    changeHandler(val) {
      this.$router.push(val)
    },
    showBadge(label) {
      return label === 'Mall' && this.cartTotal > 0
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'cartTotal'])
  }
}
</script>

<style>
.cube-container {
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #f0f0f0;
}

.cube-tab {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tab-box {
  position: relative;
}

.badge {
  position: absolute;
  top: 0;
  right: 25px;
  padding: 4px;
  min-width: 18px;
  height: 18px;
  line-height: 18px;
  color: #fff;
  background-color: red;
  border-radius: 100%;
}

.route-forward-enter {
  transform: translate3d(-100%, 0, 0);
}
.route-back-enter {
  transform: translate3d(100%, 0, 0);
}

.route-forward-leave-to {
  transform: translate3d(100%, 0, 0);
}
.route-back-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.route-forward-enter-active,
.route-forward-leave-active,
.route-back-enter-active,
.route-back-leave-active {
  transition: transform 0.3s;
}

.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  padding-bottom: 50px;
}
</style>
