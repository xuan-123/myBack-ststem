<template>
<!-- // 相册左侧栏 -->
    <div>
        <li  
           :class="albumindex?'active listactive':''"
           class="  list-group-item list-group-item-action d-flex align-item-center"
            @click.stop="$emit('change',index)"
            >
               <span class="mt-1">{{item.name}}</span>
               <el-dropdown class="ml-auto">
                <span class="btn btn-light btn-sm border">
                    {{item.num}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.open.native="$emit('edit',{index,item})">修改</el-dropdown-item>
                    <el-dropdown-item @click.stop.native="$emit('del',index)">删除</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
           </li>
    </div>
</template>
<script>
    export default{
        props:{
            albumindex:Boolean,
            item:Object,
            index:Number
        }
    }
</script>
<style  scoped>
.listactive{
    color:#67c23a !important;
    background-color: #f0f9eb!important;
    border-color:#c2e7b0!important
}
</style>