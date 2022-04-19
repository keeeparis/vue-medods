import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import App from './App.vue'

Vue.config.devtools = true
Vue.config.productionTip = false

Vue.use(VueCompositionApi)

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.event = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event, binding.arg);
      }
    };
    document.body.addEventListener('click', el.event)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.event)
  },
});

new Vue({
  render: h => h(App)
}).$mount('#app')
