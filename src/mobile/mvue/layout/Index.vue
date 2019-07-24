<template>
  <div class="layout">
    <!--<div class="layout-header">
      <i class="micon micon-1" @click="goBack"></i>
      <div>{{title}}</div>
      <i class="micon micon-2" v-if="$route.path == '/calendar'"></i>
      <i class="micon micon-3" v-if="$route.path == '/index'||$route.path == '/sign-clock'" @click="goUrl('/calendar')"></i>
    </div>-->
    <div class="layout-main">
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      userData:{}, // 用户信息
      fromPath:''
    }
  },
  computed: {
    ...mapGetters(['title'])
  },
  watch: {
    '$route' (to, from) {
      this.fromPath = from.path
      // console.log(this.fromPath)
    }
  },
  created () {
    // this.getUserInfo();//获取用户信息
  },
  mounted () {
  },
  methods: {
    logout () {
      this.showConfirm('提示', '确定要退出吗？', () => {
          this.$store.dispatch('mobileUser/Logout').then(res => {
              if (res.success) {
                  this.$router.push('/')
              } else {
                  this.showToast(res.message)
              }
          })
      })
    },
    //后退
    goBack(){
      if(this.$route.path=='/index'||this.$route.path=='/sign-clock'){
        this.$store.dispatch('clock/GetConfigInfo').then(res=>{
          if(res.success){
            location.href=res.data.backUrl
          }
        })
      }else if(this.$route.path=='/calendar'){
        if(this.fromPath=='/index'){
          this.$router.push('/index')
        }else if(this.fromPath=='/sign-clock'){
          this.$router.push('/sign-clock')
        }else{
          this.$router.go(-1)
        } 
      }else{
        this.$router.go(-1)
      }
    },
    //获取用户信息
    getUserInfo () {
      this.$store.dispatch('clock/GetUserInfo')
    }
  }
}
</script>

<style scoped lang="less">
.layout{
  width: 100%;
  height: 100%;
  .layout-header{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 41px;
    line-height: 41px;
    background: #2185d0;
    color: #fff;
    text-align: center;
    font-size: 18px;
    z-index: 10;
  }
  .layout-header span{
      position: absolute;
      right: 0;
      top: 0;
  }
  .layout-main{
    padding: 0px 0 0;
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .layout-main>div{
    width:100%;
    height:100%;
    overflow-y:auto;
    box-sizing: border-box;
  }
  .micon{
    width: 41px;
    height: 41px;
    display:inline-block;
  }
  .micon-1{
    background: url(./img/a-left.png) no-repeat 0 0;
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
  }
  .micon-2{
    background: url(./img/logout.png) no-repeat 0 0;
    background-size: cover;
    position: absolute;
    right: 0;
    top: 0;
    display: none;
  }
  .micon-3{
    background: url(./img/cal.png) no-repeat 0 0;
    background-size: cover;
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
