import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(ElementUI, { locale })
Vue.use(VueAxios, axios)
