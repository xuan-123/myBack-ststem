<template> 
<div>
<el-container style="position:absolute;left:0;right:0;top:55px;bottom:0">
  <el-header class="d-flex align-item-center border-bottom pt-2">
      <div class="d-flex mr-auto" >
        <el-select class="mr-2" style="width:150px" placeholder="请选择图片排序方式"
            v-model="searchForm.order"
         >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="shanghai"></el-option>
        </el-select>
      <el-input class="mr-2" style="width:150px" placeholder="请输入相册名称"
        v-model="searchForm.order"
      ></el-input>
      <el-button type="primary" size="mini">搜索</el-button>
      </div>
      <el-button type="success" size="mini" @click=openAlbum(false)>创建相册</el-button>
      <el-button type="warning" size="mini">上传图片</el-button>

  </el-header>
  <el-container>
      <!-- 侧边 -->
    <el-aside width="200px" class="bg-white border-right" style="position:absolute;top:60px;left:0;bottom:60px;right:0">
       <ul class="list-group list-group-flush">
 <!-- 相册左侧栏 -->
           <albums-list v-for="(item,index) in albums" :key="index" :albumindex="albumsIndex===index" :item="item" :index="index"
            @change="imageList"
            @edit="openAlbum"
            @del="imageDel"
           ></albums-list>
       </ul>
    </el-aside>
    <el-container >
        <!-- 主内容 -->
      <el-main style="position:absolute;top:60px;left:200px;bottom:60px;right:0">

      </el-main>
    </el-container>
  </el-container>
    <el-footer>Footer</el-footer>
</el-container>
<!-- 修改创建相册 -->
<el-dialog
    title="修改相册"
    :visible.sync="albumModel"
    >
    <el-form ref="form" :model="albumForm" label-width="80px">
        <el-form-item label="相册名称">
            <el-input v-model="albumForm.name" size="mdeium"
                placeholder="请输入相册名"
            ></el-input>
        </el-form-item>
         <el-form-item label="相册排序">
            <el-input v-model="albumForm.order"></el-input>
        </el-form-item>
    </el-form>
       

    <span slot="footer" class="dialog-footer">
        <el-button @click="albumModel = false">取 消</el-button>
        <el-button type="primary" @click="confimalbumModel">确 定</el-button>
    </span>
</el-dialog>
</div>
</template>
<script>
import AlbumsList from '../../components/image/AlbumsList'
    export default{
        components:{
            AlbumsList
        },
        data(){
            return{
                albumModel:false,
                searchForm:{
                    order:"",
                    keyword:""
                },
                albumsIndex:0,
                albumsEditIndex:-1,
                albumForm:{
                    name:"",
                    order:0
                },
                albums:[

                ]
            }
        },
        created(){
            this.__init()
        },
        methods:{
            // 相册左侧数据
            __init(){
                for(var i = 0;i<20;i++){
                    this.albums.push({
                        name:'相册'+i,
                        num:Math.floor(Math.random()*100),
                        order:0
                    })
                }
            },
            openAlbum(obj){
                //修改数据
                if(obj){
                    let {item,index} = obj
                    this.albumForm.name=item.name
                    this.albumForm.order=index
                    this.albumsEditIndex = index
                    //打开修改创建框
                    return  this.albumModel = true
                }
                //创建
                this.albumForm ={
                    name:'',
                    order:0
                }
                this.albumsEditIndex = -1
                this.albumModel = true

            },
            confimalbumModel(){
                //判断是否为修改
                if(this.albumsEditIndex > -1){
                    this.albumEdit()
                    return this.albumModel = false
                }
                //创建追加
                this.albums.unshift({
                    name:this.albumForm.name,
                    order:this.albumForm.order,
                    num:0
                })
                this.albumModel = false
            },
            //修改相册
            albumEdit(){
                this.albums[this.albumsEditIndex].name=this.albumForm.name
                this.albums[this.albumsEditIndex].order=this.albumForm.order
            },
            imageList(index){
                this.albumsIndex = index
            },
            imageDel(index){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.albums.splice(index,1)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
               
            }
        }
    }
</script>
<style scoped>

.el-button{
    height: 40px;
}
 .el-header{
    
    color: #333;
  
  }
 .el-footer {
     background-color: #eee;
     color: #333;
  }
  
  .el-aside {
    color: #333;
  
  }
  
  .el-main {
    color: #333;

  }
</style>