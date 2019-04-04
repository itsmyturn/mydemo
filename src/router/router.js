import Vue from 'vue'
import VueRouter from 'vue-router'
import routeConfig from  './routes'

Vue.use(VueRouter)

const router=new VueRouter({
    routes:routeConfig
})

export default router