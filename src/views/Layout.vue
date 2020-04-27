<template>
    <div>
        <el-container style="position:absolute;left:0;top:0;bottom:0;right:0;overflow:hidden">
            <el-header class="d-flex align-item-center" style="background:#545c64">
                <a class="h5 mt-3 text-light align-middle mb-0 mr-auto">{{$conf.logo}}</a>
                <el-menu
                    :default-active="navBar.active"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item :index="index|numToString" v-for="(item,index) in navBar.list" :key="index">
                        {{item.name}}
                    </el-menu-item>
                   
                    <el-submenu index="6">
                            <template slot="title">
                                <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                                summer
                            </template>
                            <el-menu-item index="6-1">修改</el-menu-item>
                            <el-menu-item index="6-2">退出</el-menu-item>
                        </el-submenu>
                </el-menu>
            </el-header>
            <el-container >
                <el-aside width="200px" >
                     <el-menu
                     style="height:100%"
                    :default-active="slideMenuActive"
                    @select="slideSelect"
                    >
                    <el-menu-item :index="index|numToString" v-for="(item,index) in slideMenus" :key="index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.name}}</span>
                    </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main class="bg-light" style="position:relative;height:100%">
                    <!-- 面包屑导航 -->
                   <div class="border-bottom mb-3 bg-white" style="padding:20px;margin:-20px" v-if="bran.length>0">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item v-for="(item,index) in bran" :key="index"
                                :to="{path:item.path}"
                            >{{item.title}}</el-breadcrumb-item>
                        </el-breadcrumb>
                   </div>
                  
                   <!-- 主内容 -->
                    <router-view ></router-view>
                    
                   <!-- 回到顶部 -->
                   <el-backtop target=".el-main" :bottom="100">
                    <div
                    style="{
                        height: 100%;
                        width: 100%;
                        background-color: #f2f5f6;
                        box-shadow: 0 0 6px rgba(0,0,0, .12);
                        text-align: center;
                        line-height: 40px;
                        color: #1989fa;
                    }"
                    >
                    UP
                    </div>
                </el-backtop>
                </el-main>
            </el-container>
        </el-container>
        
    </div>
</template>
<script>
import mixins from '../common/mixins/mixins'

 export default {
     mixins:[mixins],
    data() {
      return {
          navBar:[],
          bran:[]
      }
    },
    created(){
        //初始化菜单 
        this.navBar = this.$conf.navBar
        this.getRouterBran()
        //初始化选中菜单
        this.__initNavBar()
    },
    watch:{
        '$route'(to,from){
            localStorage.setItem('navActive',JSON.stringify({
                top:this.navBar.active,
                left:this.slideMenuActive
            }))
            this.getRouterBran()
        }
    },
    computed:{
        slideMenuActive:{
            get(){
                return this.navBar.list[this.navBar.active].subActive || '0'
            },
            set(val){
                this.navBar.list[this.navBar.active].subActive = val
            }
        },
        slideMenus(){
            return this.navBar.list[this.navBar.active].submenu || []
        }
    },
    methods: {
        //
        __initNavBar(){
          let r =  localStorage.getItem('navActive')
            if(r){
                r = JSON.parse(r)
                this.navBar.active = r.top
                this.slideMenuActive = r.left
            }
        },
        //面包屑导航
        getRouterBran(){
            let b = this.$route.matched.filter(v=>v.name)
            console.log(b)
            let arr =[]
            b.forEach((v,k)=>{
                if(v.name ==='index' || v.name==="layout") return
                arr.push({
                    name:v.name,
                    path:v.path,
                    title:v.meta.title
                })
            })
            if(arr.length>0){
                arr.unshift({name:'index',path:'/index',title:'后台首页'})
            }
            this.bran = arr
            console.log(arr)
        },
      handleSelect(key, keyPath) {
       
          if(key === '6-1'){
              return console.log('修改')
          }
          if(key === '6-2'){
              {
              return console.log('退出')
          }
          }
        this.navBar.active = key
        //默认选中跳转到当前激活
        this.slideMenuActive ='0'
        if(this.slideMenus.length>0){
        this.$router.push({
            name:this.slideMenus[this.slideMenuActive].pathname
        })
        }
        
      },
      slideSelect(key, keyPath) {
          console.log(key)
        this.slideMenuActive = key
        //跳转到指定页面
        this.$router.push({
            name:this.slideMenus[key].pathname
        })
      },
    },
    
  }
</script>
<style scoped>

.el-header {
    background-color: #B3C0D1;
    color: #333;
  
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
   
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  
  }
</style>