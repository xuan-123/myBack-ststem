<template>
    <div>
        <!-- 数据统计 -->
        <el-row :gutter="20">
            <el-col :span="6" v-for="(item,index) in counts" :key="index">
                <el-card class="box-card" shadow="hover">
                    <div class=" d-flex align-items-center">
                        <i :class="[item.icon,item.color]" class=' border h4 mb-0  text-white' style="width:40px;height:40px;text-align:center;line-height:40px"></i>
                        <div class="ml-3">
                            <h4 class="mb-1">{{item.num}}</h4>
                            <small class="text-muted">{{item.desc}}</small>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mt-3" > 
            <el-col :span="12" class="d-flex flex-column" style="height:370px">
                <el-card class="box-card mb-auto" shadow="never">
                    <div slot="header" class="clearfix">
                        <span>店铺及商品提示</span>
                        <el-button style="float: right; padding: 3px 0" type="text">您需要关注的店铺以及待处理事项</el-button>
                    </div>
                <div class="row">
                    <div class="col" :span="3" v-for="(item,index) in shoping" :key="index">
                        <button class="btn btn-light w-100">
                            <h4 class="mb-1">{{item.num}}</h4>
                            <small class="text-muted">{{item.text}}</small>
                        </button>
                    </div>                   
                </div>

                </el-card>
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span>交易提示</span>
                        <el-button style="float: right; padding: 3px 0"  type="text">您需要立即处理的交易订单</el-button>
                    </div>
                    <div>
                        <div class="row">
                    <div class="col" :span="2" v-for="(item,index) in jyi" :key="index">
                        <button class="btn btn-light w-100">
                            <h4 class="mb-1">{{item.num}}</h4>
                            <small class="text-muted">{{item.text}}</small>
                        </button>
                    </div>
                     
                    
                </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12" >
                <el-card class="box-card" style="height:370px" shadow="never">
                    <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <!-- 统计图 -->
                    <div ref="myChart" style="width:100%;height:270px"></div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 销售情况统计  -->
        <el-row :gutter="20" class="mt-3">
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                    <el-button style="float:right;padding:3px 0;type='text'">操作按钮</el-button>
                    </div>
                    <div class="media  border">
                        <span class="mr-3 py-4 px-3 bg-light">昨日销量</span>
                        <div class="media-body">
                            <div class="pt-2 pb-1 border-bottom"><span>订单量</span>12</div>
                            <div class="pt-1"><span>订单金额</span>12</div>
                        </div>
                    </div>
                    <div class="media  border mt-3">
                        <span class="mr-3 py-4 px-3 bg-light">本月销量</span>
                        <div class="media-body">
                            <div class="pt-2 pb-1 border-bottom"><span>订单量</span>12</div>
                            <div class="pt-1"><span>订单金额</span>12</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>单品销售</span>
                    <el-button style="float:right;padding:3px 0;type='text'">操作按钮</el-button>
                    </div>
                    <div>
                         <el-table
                            :data="tableData"
                            height="200"
                            border
                            style="width: 100%">
                            <el-table-column
                            prop="id"
                            label="#"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="商品信息"
                            >
                            </el-table-column>
                             <el-table-column
                            prop="num"
                            label="销量"
                            style="width:50px"
                           >
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import echarts from 'echarts'
    export default{
        data(){
            return {
                counts:[
                    { icon:'el-icon-user-solid',num:30,desc:'关注人数（个）' ,color:"bg-primary"},
                    { icon:'el-icon-s-finance',num:120,desc:'订单总数(笔)',color:"bg-success"},
                    { icon:'el-icon-s-order',num:41,desc:'今日订单总金额(元)',color:"bg-danger"},
                    { icon:'el-icon-s-data',num:100,desc:'本月销量(笔)',color:"bg-warning"}
                ],
                shoping:[
                    { num:'64',text:'出售中'},
                    { num:'10',text:'待回复'},
                    { num:'0',text:'库存预警'},
                    { num:'3',text:'仓库中'},
                ],
                jyi:[
                    { num:'0',text:'待付款'},
                    { num:'10',text:'待发货'},
                    { num:'0',text:'已发货'},
                    { num:'3',text:'已收货'},
                    { num:'3',text:'退款中'},
                    { num:'3',text:'待售后'},
                    
                ],
                tableData: [
                    {
                        name:'小天鹅',
                        num:'9'
                    },
                    {
                        name:'小天鹅',
                        num:'9'
                    },
                    {
                        name:'小天鹅',
                        num:'9'
                    },
                    {
                        name:'小天鹅',
                        num:'9'
                    },
                    {
                        name:'小天鹅',
                        num:'9'
                    },
                    {
                        name:'小天鹅',
                        num:'9'
                    }
                ]
        }
            
        },
        mounted(){
            // 画统计 图
            this.drawLine()
        },
        methods:{
            drawLine(){
               let myChart = echarts.init(this.$refs.myChart)
               myChart.setOption({
                   title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
               })
            }
        }
    }
</script>