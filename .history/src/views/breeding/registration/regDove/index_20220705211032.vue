<template>
  <div class="container">
    <div v-show="isSearch" class="top">
      <div class="form">
      <el-form label-width="60px" :model="searchInfo" ref="searchRef">
        <el-row :gutter="10">
          <el-date-picker
            v-model="searchInfo.date"
            type="daterange"
            format="YYYY-MM-DD"
            unlink-panels
            range-separator="-"
            start-placeholder="起始时间"
            end-placeholder="结束时间"
            :shortcuts="shortcuts"
          />
          <el-form-item label="鸽棚:" prop="dovecoteNumber">
            <el-select v-model="searchInfo.dovecoteNumber" placeholder="请选择">
              <el-option
                v-for="(item, index) in doptions"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="鸽笼号" prop="DoveNum">
            <el-input v-model="searchInfo.DoveNum" placeholder="请输入鸽笼号"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      </div>
      <span class="submit">
        <el-button type="primary" plain @click="searchDove()">搜索</el-button>
        <el-button @click="reset()">重置</el-button>
      </span>
    </div>
    <div class="tag">
      <el-button type="primary" plain @click="addDovedialog = true"
        >添加鸽子</el-button
      >
      <div>
        <el-button type="warning" :icon="Search" circle @click="isShowSearch()" />
      <el-button type="primary"  @Click="outTable()">导出</el-button>
      <el-button @Click="printTable()">打印</el-button>
      </div>
    </div>
    <el-main class="main">
      <scTable :data="tableData" stripe>
        <el-table-column
          prop="date"
          label="时间"
          width="120"
          sortable
          align="center"
        />
        <el-table-column
          prop="dovecoteNumber"
          label="鸽棚"
          width="120"
          align="center"
        />
        <el-table-column prop="doveNum" label="鸽笼号" width="120" align="center" />
        <el-table-column label="操作" width="220" align="center">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              icon="el-icon-edit"
              @click="showDovedialog(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeDove(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </scTable>
    </el-main>
    <el-dialog
      title="添加鸽子"
      v-model="addDovedialog"
      width="30%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addInfo"
        ref="addRef"
        :rules="doveRules"
        label-width="120px"
      >
        <el-form-item label="时间:" prop="date">
          <el-input v-model="addInfo.date"  placeholder="请输入时间"></el-input>
        </el-form-item>
        <el-form-item label="鸽棚:" prop="dovecoteNumber">
          <el-select v-model="addInfo.dovecoteNumber" placeholder="请选择">
            <el-option
              v-for="(item, index) in doptions"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="鸽笼号:" prop="doveNum">
          <el-input v-model="addInfo.doveNum" placeholder="请输入鸽笼号"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="addDovedialog = false">取 消</el-button>
        <el-button type="primary" plain @click="addDove()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑鸽子"
      v-model="dovedialog"
      width="30%"
      @close="editDoveClosed"
    >
      <el-form
        :model="doveInfo"
        ref="editRef"
        :rules="doveRules"
        label-width="120px"
      >
        <el-form-item label="时间:" prop="date">
          <el-input v-model="doveInfo.date" placeholder="请输入时间"></el-input>
        </el-form-item>
        <el-form-item label="鸽棚:" prop="dovecoteNumber">
          <el-select v-model="doveInfo.dovecoteNumber" placeholder="请选择">
            <el-option
              v-for="(item, index) in doptions"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="鸽笼号:" prop="doveNum">
          <el-input v-model="doveInfo.doveNum" placeholder="请输入鸽笼号"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="dovedialog = false">取 消</el-button>
        <el-button type="primary" plain @click="updateDove()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance } from "vue";
import scTable from "@/components/scTable/index.vue";
import { Search } from "@element-plus/icons-vue";
export default defineComponent({
  name: "doveRegistration", // 鸽子登记
  components: {
    scTable,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    let isSearch = ref(false);
    // 时间选择器
    const shortcuts = [
      {
        text: "近一周",
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          return [start, end];
        },
      },
      {
        text: "近一个月",
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          return [start, end];
        },
      },
      {
        text: "近3个月",
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          return [start, end];
        },
      },
    ];
    let addDovedialog = ref(false);
    let dovedialog = ref(false);
    let doptions = ref(["A1", "A2", "A3"]);
    const tableData = ref([
      {
        date: "2022-07-05",
        dovecoteNumber: "A1",
        doveNum:"A001"
      },
      {
        date: "2022-07-05",
        dovecoteNumber: "A1",
        doveNum:"A001"
      },
      {
        date: "2022-07-05",
        dovecoteNumber: "A1",
        doveNum:"A001"
      },
      {
        date: "2022-07-05",
        dovecoteNumber: "A1",
        doveNum:"A001"
      },
    ]);
    const searchInfo = ref({
        date: "",
        dovecoteNumber: "",
        doveNum:""
      },);
    const addInfo = ref({
        date: "",
        dovecoteNumber: "",
        doveNum:""
      },);
    const doveInfo = ref({
        date: "",
        dovecoteNumber: "",
        doveNum:""
      },);
    const outTable=()=>{
      console.log("导出")
    };
    const printTable=()=>{
      console.log("打印")
    }
    const reset=()=>{
      proxy.$refs.searchRef.resetFields();
    }
    const isShowSearch = () => {
      console.log("123");
      isSearch.value = !isSearch.value;
    };
    //把这一行的信息传入对话框
    const showDovedialog = (item) => {
      dovedialog.value = true;
      doveInfo.value = item;
    };
    const searchDove=()=>{
      console.log("搜索");
      isSearch.value=false;
    };
    const updateDove=()=>{
      console.log("更改");
      dovedialog.value=false;
    }
    const addDove = () => {
      /*  tableData.value.push(addInfo.value); */
      addDovedialog.value = false;
    };
    const removeDove = ()=>{
      console.log("删除");
    }
    const addDialogClosed = () => {
      proxy.$refs.addRef.resetFields();
    };
    const editDialogClosed = () => {
      proxy.$refs.editRef.resetFields();
    };
    
    const api = () => {};
    return {
      Search,
      isSearch,
      tableData,
      searchInfo,
      addInfo,
      addDovedialog,
      dovedialog,
      doveInfo,
      doptions,
      shortcuts,
      isShowSearch,
      outTable,
      printTable,
      reset,
      api,
      searchDove,
      updateDove,
      addDove,
      removeDove,
      addDialogClosed,
      editDialogClosed,
      showDovedialog,
    };
  },
});
</script>

<style scoped>
.container {
  margin: 0 auto;
}
.top{
  display: flex;
}
.tag {
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
}
.form{
  width: 80%;
}
.submit{
  margin-left: 20px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>