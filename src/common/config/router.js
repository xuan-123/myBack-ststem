let routes = [
    {
        path: '/',
        name: 'layout',
      
        redirect: { name: 'index' },
        component: 'Layout',
        children: [
            {
                path: 'index',
                name: 'index',
                meta:{title:'后台首页'},
                component: 'index/Index'
            },
            {
                path:'goodlist',
                name:'goodlist',
                meta:{title:'商品列表'},
                component:'shop/GoodList'
            },
            {
                path:'image',
                name:'image',
                meta:{title:'相册管理'},
                component:'image/Image'
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: { title: '登录' },
        component: 'login/Login'
    },
    {
        path: '*',
        redirect: 'index'
    }
]

//获取路由信息方法
let getRoutes = function(){
    //自动生成路由
    createRoute(routes)
    return routes
}
//自动生成路由方法函数
function createRoute(arr){
    for(let i = 0;i<arr.length;i++){
        if(!arr[i].component) return
        //自动生成component
        let componentFun = import(`../../views/${arr[i].component}.vue`)
        arr[i].component = ()=> componentFun
        if(arr[i].children && arr[i].children.length > 0){
            createRoute(arr[i].children)
        }
    }
}



export default getRoutes()