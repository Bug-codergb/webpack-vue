import { reactive,computed,toRefs } from "vue";
export const useTable=(api,initParam,isPageable,dataCallBack,requestError)=>{
  const state = reactive({
    tableData:[],
    pageable:{
      pageNum:1,
      pageSize:10,
      total:0
    },
    searchParams:{},
    searchInitParams:{},
    totalParams:{}
  })

  const pageParam = computed({
    get:()=>{
      return {
        pageNum:state.pageable.pageNum,
        pageSize:state.pageable.pageSize
      }
    }
  })

  const getTableList = async()=>{
    if(!api){return};
    try{
      Object.assign(state.totalParams,initParam,isPageable ? pageParam.value:{});
      let { data } = await api({...state.searchInitParams,...state.totalParams});
      dataCallBack && (data = dataCallBack(data));
      state.tableData = isPageable ? data.list : data;
    }catch (e) {

    }
  }

  const handleSizeChange= (val)=>{
    state.pageable.pageNum = 1;
    state.pageable.pageSize = val;
    getTableList();
  }
  const handleCurrentChange=(val)=>{
    state.pageable.pageNum = val;
    getTableList();
  }
  return {
    ...toRefs(state),
    getTableList,
    handleCurrentChange,
    handleSizeChange
  }
}
