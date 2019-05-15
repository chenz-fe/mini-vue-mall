import Vue from 'vue'

// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  /* eslint-disable no-unused-vars */
  Style,
  // basic
  Button,
  TabBar,
  Input,
  Form,
  // popup
  Toast,
  Drawer,
  ImagePreview,
  Slide
} from 'cube-ui'

Vue.use(Button)
Vue.use(TabBar)
Vue.use(Input)
Vue.use(Form)
Vue.use(Toast)
Vue.use(Drawer)
Vue.use(ImagePreview)
Vue.use(Slide)
