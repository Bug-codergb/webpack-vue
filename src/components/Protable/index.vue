<template>
  <div class="card table-main">
    <div class="table-header">
      <div class="header-button-lf">
        <slot name="tableHeader"></slot>
      </div>
      <div v-if="toolButton" class="header-button-ri">
        <slot name="toolButton"></slot>
      </div>
    </div>

    <el-table ref="tableRef"
              v-bind="$attrs"
              :data="data??tableData"
              :border="border"
              :row-key="rowKey">
      <slot></slot>
      <template v-for="item in tableColumns" :key="item">
        <el-table-column v-if="item.type && ['selection','index','expand'].includes(item.type)"
                         v-bind="item"
                         :align="item.align??'center'">
          <template v-if="item.type==='expand'" #default="scope">
            <component :is="item.render" v-bind="scope" v-if="item.render"></component>
            <slot v-else :name="item.type" v-bind="scope"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script setup>
import { defineProps,ref } from "vue";
import { useTable } from "../../hooks/useTable"
const props = defineProps({
  columns:{
    type:Array,
    default(){
      return []
    }
  },
  data:{
    type:Array,
    default(){
      return []
    }
  },
  border:{
    type:Boolean,
    default:true
  },
  toolButton:{
    type:Boolean,
    default:true
  },
  rowKey:{
    type:String,
    default:"id"
  },
  requestApi:{
    type:Function,
    default(){
      return ()=>{}
    }
  },
  initParams:{
    type:Object,
    default(){
      return {}
    }
  },
  pagination:{
    type:Boolean,
    default:true
  },
  dataCallBack:{
    type:Function,
    default(){
      return ()=>{}
    }
  },
  requestError:{
    type:Function,
    default(){
      return ()=>{}
    }
  }
})

const {
  tableData,
  pageable,
  searchParams,
  searchInitParams,
  getTableList,
  handleSizeChange,
  handleCurrentChange
} = useTable(props.requestApi,props.initParams,props.pagination,props.dataCallBack,props.requestError);

const tableColumns = ref(props.columns);

</script>

<style scoped lang="less">

</style>
