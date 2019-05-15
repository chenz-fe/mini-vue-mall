<template>
  <div class="form-container">
    <cube-form
      v-if="!isLogin"
      :model="model"
      :schema="schema"
      @validate="validateHandler"
      @submit.prevent="submitHandler"
    ></cube-form>
    <div
      v-else
      @click="logout"
    >
      <div class="userinfo-box">你好，小菠萝！</div>
      <cube-button>退出登录</cube-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      model: {
        userName: '',
        password: ''
      },
      schema: {
        fields: [
          {
            type: 'input',
            modelKey: 'username',
            label: '用户名',
            props: {
              placeholder: '请输入用户名'
            },
            rules: {
              required: true
            },
            trigger: 'blur',
            messages: {
              required: '用户名为必填项'
            }
          },
          {
            type: 'input',
            modelKey: 'password',
            label: '密码',
            props: {
              placeholder: '请输入密码',
              type: 'password',
              eye: { open: false }
            },
            rules: {
              required: true
            },
            trigger: 'blur',
            messages: {
              required: '密码为必填项'
            }
          },
          {
            type: 'submit',
            label: '登录',
            props: {
              class: 'submit-btn',
              style: 'marginTop: 60px'
            }
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    validateHandler(result) {
      this.validity = result.validity
      this.valid = result.valid
      console.log('校验')
    },
    async submitHandler() {
      const res = await this.$http.get('/api/login', {
        params: {
          username: this.model.username,
          password: this.model.password
        }
      })
      const { code, token, message } = res.data
      if (code === 0) {
        this.$store.commit('setToken', token)
        localStorage.setItem('token', token)
        const { redirect = '/' } = this.$route.query
        this.$router.push(redirect)
      } else {
        const toast = this.$createToast({
          time: 2000,
          txt: message || '登录失败',
          type: 'error'
        })
        toast.show()
      }
    },
    logout() {
      this.$http.get('/api/logout')
    }
  }
}
</script>

<style lang="stylus" scoped>
.form-container
  margin-top: 100px
.userinfo-box
  display: flex
  justify-content: center
  height: 150px
  font-size: 20px
</style>
