<template>
  <RenderTableColumn v-bind="column" />
</template>
<script setup lang="jsx" name="TableColumn">
import { ref,useSlots} from "vue";
const props = defineProps({
  column:{
    type:Array,
    default(){
      return []
    }
  }
})
const slots = useSlots();
const RenderTableColumn=(item)=>{
  return (
      <>
        {
          item.isShow && (
              <el-table-column
                  {...item}
                  align={item.align ?? "center"}
                  showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== "operation"}
              ></el-table-column>
            )
        }
      </>
  )
}
</script>



<style scoped lang="less">

</style>
