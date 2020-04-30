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
      <el-button v-if="ChooseList.length" type="warning" size="mini" @click="unChoose">取消选择</el-button>
      <el-button type="danger" size="mini" @click="imageDelAll" v-if="ChooseList.length">批量删除</el-button>
      <el-button type="success" size="mini" @click=openAlbum(false)>创建相册</el-button>
      <el-button type="warning" size="mini" @click="uploadModel=true">上传图片</el-button>

  </el-header>
  <el-container>
      <!-- 侧边 -->
    <el-aside width="200px" class="bg-white border-right" style="position:absolute;top:60px;left:0;bottom:60px;right:0">
       <ul class="list-group list-group-flush">
 <!-- 相册左侧栏 -->
           <albums-list v-for="(item,index) in albums" :key="index" :albumindex="albumsIndex===index" :item="item" :index="index"
            @change="imageLists"
            @edit="openAlbum"
            @del="imageDel"
           ></albums-list>
       </ul>
    </el-aside>
    <el-container >
        <!-- 主内容 -->
      <el-main style="position:absolute;top:60px;left:200px;bottom:60px;right:0">
            <el-row :gutter="10">
                <el-col class="elcol" :span="24" :lg="4" :md="6" :sm="8" style="box-sizing:border-box"  v-for="(item,index) in imageList" :key="index">
                    <el-card class="box-card mb-3 position-relative"  shadow="hover" :body-style="{'padding':'0'}">
                        <div :class="{'redborder':item.isChoose}"  >
                            <span class="badge badge-danger" style="position:absolute;right:0;top:0" v-if="item.isChoose" >{{item.ChooseOrder}}</span>
                            <img :src="item.url"  class=" w-100" style="height:120px" alt="" @click="imageClick(item)">
                            <div  style="background:rgba(0,0,0,.3);margin-top:-25px;position:absolute;width:100%;text-align:center;color:#fff">{{item.name}}</div>
                            <div class="p-2 ml-5">
                            <el-button-group>
                                <el-button type="" @click="priview(item)" size="mini" icon="el-icon-view"></el-button>
                                <el-button type="" @click="editImage(item,index)" size="mini" icon="el-icon-share"></el-button>
                                <el-button type="" @click="delImage(item,index)" size="mini" icon="el-icon-delete"></el-button>
                            </el-button-group>
                        </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
      </el-main>
    </el-container>
  </el-container>
    <el-footer class="border-top d-flex  align-items-center px-0">
        <div style="width:200px" class="border-right flex-shrink:0 h-100 d-flex align-items-center justify-content-center ">
            <el-button-group>
                <el-button size="mini">上一页</el-button>
                <el-button size="mini">下一页</el-button>
            </el-button-group>
        </div>
        <div style="flex:1" class="px-2">
                 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
        </div>
    </el-footer>
</el-container>
<!-- 修改创建相册 -->
<el-dialog
    :title="albumModelTitle"
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
<!-- 上传图片 -->
<el-dialog title="上传图片" class="m-auto" style="width:1000px" :visible.sync="uploadModel">
    <el-upload
        class="upload-demo ml-5"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div class="dialog-footer" slot="footer">
        <el-button @click="uploadModel = false">取消</el-button>
        <el-button type="primary" @click="uploadModel = false">确定</el-button>
    </div>
</el-dialog>
<!-- 预览图片 -->
<el-dialog :visible.sync="previewModel" width="60%" top="5vh">
    <div style="margin:-60px -20px -30px -20px">
        <img class="w-100" style="height:600px" :src="prevImage" alt="">
    </div>

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
                previewModel:false,
                uploadModel:false,
                albumModel:false,
                prevImage:'',
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

                ],
                ChooseList:[],
                imageList:[
             
                ],
                currentPage:1

            }
        },
        computed:{
            albumModelTitle(){
                return this.albumsEditIndex>-1?'修改相册':'创建相册'
            }
        },
        created(){
            this.__init()
        },
        methods:{
            //分类
              handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //取消选中
      unChoose(){
          this.imageList.forEach(img=>{
           let i = this.ChooseList.findIndex(item=>{
                  return item.id === img.id
              })
              console.log(i)
              if(i>-1){
                  img.isChoose = false
                  img.checkOrder = 0
                  this.ChooseList.splice(i,1)
              }
          })
      },
            //批量删除
            imageDelAll(){

                 this.$confirm('是否删除选中图片', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:"warning"
                }).then(() => {
                    
                let list = this.imageList.filter(img=>{
                    return !this.ChooseList.some(c=>{
                        return c.id ===img.id
                    })
                })
                this.imageList = list
                this.ChooseList =[]
                        this.$message({
                            type: 'success',
                            message: '删除成功' 
                        });
                })
     

            },
            imageClick(item){
                if(!item.isChoose){
                    this.ChooseList.push({id:item.id,url:item.url })
                    item.ChooseOrder = this.ChooseList.length
                    item.isChoose = true
                    return;
                }
                let i = this.ChooseList.findIndex(v=>v.id === item.id)
                if(i === -1) return 
                let length = this.ChooseList.length
                if(i+1 <= length){
                    for(let j = i;j<length;j++){
                        let no = this.imageList.findIndex(v=>v.id ===this.ChooseList[j].id)
                        if(no > -1){
                            this.imageList[no].ChooseOrder--
                        }
                    }
                    this.ChooseList.splice(i,1)
                    item.isChoose = false
                    item.checkOrder =0
                }
                
            },
            editImage(item,index){
                this.$prompt('请输入名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue:item.name,
                inputValidator(val){
                    if(val ===''){
                        return '图片名称'
                    }
                }
                }).then(({ value }) => {
                    item.name = value
                this.$message({
                    type: 'success',
                    message: '修改成功'
                });
                })
            },
          delImage(item,index){
              this.$confirm('是否删除', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:"warning"
                }).then(() => {
                      this.imageList.splice(index,1)
                        this.$message({
                            type: 'success',
                            message: '删除成功' 
                        });
                })
     
          },
            //预览图片
            priview(item){
                this.prevImage=item.url
                this.previewModel=true
            },
            // 相册左侧数据
            __init(){
                for(var i = 0;i<20;i++){
                    this.albums.push({
                        name:'相册'+i,
                        num:Math.floor(Math.random()*100),
                        order:0
                    })
                }
                for(var i = 0;i<30;i++){
                    this.imageList.push(
                        {
                        id:i,
                        url:'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg',
                        name:'图片'+`${i}`,
                        isChoose:false,
                        ChooseOrder:0
                    },
                    )
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
            imageLists(index){
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
   
     color: #333;
  }
  
  .el-aside {
    color: #333;
  
  }
  
  .el-main {
    color: #333;

  }
  .redborder{
      border-left: 1px solid red;
      border-right: 1px solid red;
     
  }

</style>