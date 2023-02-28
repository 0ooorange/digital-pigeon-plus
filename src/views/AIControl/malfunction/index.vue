<template>
  <div class="top">
    <el-select
      v-model="selectData.departmentsValue"
      class="m-2"
      placeholder="选择部门"
      style="width: 150px"
      @change="departmentsOnChange"
    >
      <el-option
        v-for="item in departments"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="selectData.basesValue"
      class="m-2"
      placeholder="选择基地"
      style="width: 150px"
      @change="basesOnChange"
      :disabled="!bases.length"
    >
      <el-option
        v-for="item in bases"
        :key="item.id"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="selectData.shedsValue"
      class="m-2"
      placeholder="选择车间/棚"
      style="width: 150px"
      @change="shedsOnChange"
      :disabled="!sheds.length || !bases.length"
    >
      <el-option
        v-for="item in sheds"
        :key="item.id"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-button type="primary" plain style="float: right">智能识别</el-button>

    <!-- <div class="block">
           <el-cascader
                class="m-2"
                v-model="value"
                placeholder="选择部门、基地、车间/棚"
                style="width: 210px"
                :options="options"
                :props="{ casProps }"
                @change="handleChange"></el-cascader>
    </div> -->
  </div>
  <scTable
    ref="table"
    :column="column"
    :data="tablelist"
    :cell-style="cellStyle"
    stripe
    highlightCurrentRow
    class="tablestyle"
    :default-sort="{ prop: 'date', order: 'descending' }"
  />
</template>

<script>
 import { onMounted, reactive, ref, watch } from "vue";
import {
  getDepartments,
  getBases,
  getPlant,
  getTrouble
} from "@/api/model/AiControl/malfunction";
export default {
  name: "malfunction", // 故障诊断

  setup() {
    onMounted(() => {
      getDepartmentsData();
    });

    // const handleChange = (value) => {
    //     console.log(value)
    // }

    // 父级选择
    // const options = ref([]);
    // const departmentId = ref('');
    // const baseId = ref('');

    // 表格
    const tablelist = ref([]);
    const column = ref([
      { label: "设备类型", prop: "devicetype", width: 140, align: "center" },
      { label: "设备名称", prop: "devicename", width: 200, align: "center" },
      { label: "设备状况", prop: "deviceCondition", width: 140, align: "center" },
      { label: "部门", prop: "departName", width: 140, align: "center" },
      { label: "基地/场地", prop: "baseName", width: 160, align: "center" },
      { label: "车间/棚", prop: "code", width: 140, align: "center" },
      { label: "场地负责人", prop: "userName", width: 160, align: "center" },
      { label: "备注", prop: "remarks", width: 300, align: "center" },
    ]);
    const cellStyle = ({ row, columnIndex }) => {
      // 高亮关键字
      if (row.deviceCondition === "异常" && columnIndex === 2) {
        return { color: "red!important" };
      }
    };

    // 页码选择器
    const total = ref(10);
    const pageSizes = ref([5, 10, 20, 50]);
    const currentPage = ref(1);
    const pageSize = ref(10);

    //单选数据
    const departments = ref([]);
    const bases = ref([]);
    const sheds = ref([]);

    // 下拉菜单新数据、更新数据
    const selectData = reactive({
      departmentsValue: null,
      basesValue: null,
      shedsValue: null
    });

    // 获取数据
    const getDepartmentsData = async () => {
      //部门
      await getDepartments().then((res) => {
        const departmentsData = res.data.departments.map((item) => {
          return { value: item.id, label: item.name };
        });
        departments.value = departmentsData;
      });
    };
    const getBasesData = async (id) => {
      //基地
      await getBases(id).then((res) => {
        //shujuchuli
        if (res.code === 200) {
          const basesData = res.data.baseList.map((item) => {
            return { value: item.id, label: item.name };
          });
          bases.value = basesData;
        }else{
          bases.value = []
        }
      }).catch((error) => {
        bases.value = [];
      });
    };
    const getPlantData = async (id1,id2) => {
      // 车间/棚
      await getPlant(id1,id2).then((res) => {
        //shujuchuli
        if(res.code ===200) {
          const plantsData = res.data.plantList.map((item) => {
            return { value: item.id, label: item.code};
          });
          sheds.value = plantsData;
        } else {
          sheds.value = [];
        }
      }).catch((error) => {
        sheds.value = [];
      });
    };
    
    // 通过部门idcall基地api
    const departmentsOnChange = (newValue) => {
      selectData.departmentsValue = newValue;
      selectData.basesValue = null;
      selectData.shedsValue = null;
      getBasesData(newValue);
    };
    // 通过基地idcall车间/鸽棚api
    const basesOnChange = (newValue) => {
      selectData.basesValue = newValue;
      selectData.shedsValue = null;
      getPlantData(selectData.departmentsValue,newValue);
    };
    // 获取车间id
    const shedsOnChange = (newValue) => {
      selectData.shedsValue = newValue;
    };

    // 获取设备状态
    // getTrouble(selectData.departmentsValue, selectData.basesValue, selectData.shedsValue, currentPage.value, pageSize.value).then(
    //     (res) => {
    //       tablelist.value = res.data.data;
    //     },   
    // );
    watch([selectData,departments], () => {
      if(selectData.departmentsValue === null){
        getTrouble(selectData.departmentsValue, selectData.basesValue, selectData.shedsValue, currentPage.value, pageSize.value).then(         
          (res) => {
            tablelist.value = res.data.data;
            // console.log("默认",selectData.departmentsValue, selectData.basesValue, selectData.shedsValue);
            // console.log(res.data.data);
          }, 
        );
      } else {
        getTrouble(selectData.departmentsValue, selectData.basesValue, selectData.shedsValue, currentPage.value, pageSize.value).then(         
          (res) => {
            tablelist.value = res.data.data;
            // console.log(selectData.departmentsValue, selectData.basesValue, selectData.shedsValue);
            // console.log(res.data.data);
          }, 
        );
      }   
    })


    return {
      column,
      tablelist,
      total,
      pageSizes,
      currentPage,
      pageSize,
      selectData,
      bases,
      sheds,
      departments,
      getTrouble,
      cellStyle,      
      departmentsOnChange, 
      basesOnChange, 
      shedsOnChange    
    };
  },
};
</script>

<style scoped>
.top {
  margin-bottom: 15px;
}
</style>