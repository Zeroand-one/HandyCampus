import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        // 侧栏的开关，加入缓存判断
        isCollapse:sessionStorage.getItem('isCollapse') ? JSON.parse(sessionStorage.getItem('isCollapse')) : true,
        // 消息栏开关
        Notice:false,
    },
    // actions:{
    //     changetitle(txs,title){
    //        txs.commit('changetitle',title) 
    //     }
    // },
    mutations:{
        changetitle(state,title){
            state.isCollapse = !state.isCollapse
            sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
        },
        NoticeBar(state,bool){
            state.Notice = !state.Notice
        }
    }
})