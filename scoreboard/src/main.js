import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import { faPlus, faMinus, faEdit, faSave, faBan, faStopwatch, faPauseCircle, faPlayCircle, faWindowClose, faCarSide, faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus)
library.add(faMinus)
library.add(faEdit)
library.add(faSave)
library.add(faStopwatch)
library.add(faBan)
library.add(faPauseCircle)
library.add(faPlayCircle)
library.add(faWindowClose)
library.add(faCarSide)
library.add(faUserCircle)
library.add(faSearch)


Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
