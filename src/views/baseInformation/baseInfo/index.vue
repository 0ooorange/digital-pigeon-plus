
<template>
  <el-card class="box-card">
    <!-- 表单 -->
    <!-- element如果需要传布尔类型的值或者绑定数据，需要在前面加: -->
    <!-- :rules="rules"
        ref="baseInfoForm" -->
    <el-form
      :hide-required-asterisk="true"
      :model="baseInfoForm"
      label-width="70px"
      label-position="left"
    >
      <!-- 第一行信息 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="基地名称 :" label-width="120px" prop="baseName">
			  <el-input
                placeholder="请输入基地名称"
                style="width: 100%"
                v-model="baseInfoForm.name"
                clearable
              ></el-input>
            <!-- <span>{{ baseInfoForm.name }}</span> -->
            <!-- <el-button
              type="warning"
              style="margin-left: 75%"
              @click="dialogVisible = true"
              >编辑信息</el-button
            > -->
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 第二行信息 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="省份 :" label-width="120px" >
            <!-- <span>{{ baseInfoForm.province }}</span> -->
            <el-input
                placeholder="请输入省份"
                style="width: 100%"
                v-model="baseInfoForm.province"
                clearable
              ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="城市 :" label-width="120px">
			 <el-input
                placeholder="请输入城市"
                style="width: 100%"
                v-model="baseInfoForm.city"
                clearable
              ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 第三行信息 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="详细地址 :" label-width="120px">
			<el-input
                placeholder="请输入详细地址"
                style="width: 100%"
                v-model="baseInfoForm.detailedAddress"
                clearable
              ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="经度 :">
			<el-input
				disabled
                style="width: 100%"
                v-model="baseInfoForm.longitude"
                clearable
              ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="纬度 :">
			<el-input
				disabled
                style="width: 100%"
                v-model="baseInfoForm.latitude"
                clearable
              ></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-button type="primary" icon="el-icon-location" @click="openMap"
            >定位</el-button
          > -->
      </el-row>
      <!-- 第四行信息 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item
            label="基地编码:"
            label-width="120px"
          >
            <el-input
                placeholder="邮政编码"
                v-model="baseInfoForm.code"
                clearable
              ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="基地面积(㎡) :" label-width="120px" prop="funds">
            <el-input
                placeholder="基地面积(万元)"
                v-model=" baseInfoForm.area"
                clearable
              ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 第五行信息 -->
      <!-- <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="营业范围" label-width="120px" prop="scope">
              <el-input
                placeholder="请输入营业范围"
                v-model="baseInfoForm.name"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
      <!-- 第六行信息 -->
      <!-- <el-row class="baseUpLoad">
          <el-col :span="2" class="imgSets">基地图片</el-col>
          <el-col :span="20" class="imgFrame">
            <div v-for="(url, index) in picSets" :key="index" class="test">
              <div class="mask">
                <i class="el-icon-delete" @click="deleteClick(url)"></i>
              </div>
              <img :src="url" />
            </div>
            <el-upload
              action="http://106.75.154.40:9011/base/addPic"
              list-type="picture-card"
              :on-success="onSuccess"
              :auto-upload="true"
              ref="upload"
              class="addBox"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-col>
        </el-row> -->
      <!-- 第七行信息 -->
      <el-row :gutter="20">
        <el-col>
          <el-form-item
            label="基地简介 :"
            label-width="120px"
            prop="baseIntroduction"
          >
            <!-- <span>{{ baseInfoForm.introduction }}</span> -->
            <el-input
                type="textarea"
                :rows="7"
                v-model="baseInfoForm.introduction"
                maxlength="500"
                show-word-limit
              ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
          <el-button type="warning" @click="editInfoFun"
            >保存</el-button
          >
        </el-row>
    </el-form>
  </el-card>
</template>

<script>
import scTable from "@/components/scTable/index.vue";
import { onMounted, reactive, toRefs } from "vue";
import { getBaseInfoApi,editBaseInfoApi } from "@/api/model/baseInformation/baseInfo";
import { ElMessage } from "element-plus";
export default {
  name: "baseInfo",
  components: {
    scTable,
  },
  setup() {
    onMounted(() => {
		// console.log("我被触发了");
      showPage_methods.getgetBaseInfo();
    });
    const showPage_state = reactive({
      baseInfoForm: {},
    });
    const showPage_methods = {
      async getgetBaseInfo() {
        const res = await getBaseInfoApi.get();
		console.log('啊实打实大',res);
        // 页面展示
        showPage_state.baseInfoForm = res.data.baseInfo;
      },
	//   点击保存，修改信息
     async editInfoFun() {
		// console.log(showPage_state.baseInfoForm);
		const res = await editBaseInfoApi.post(showPage_state.baseInfoForm)
		 if (res.code === 200) {
          ElMessage.success("保存成功！");
          showPage_methods.getgetBaseInfo();
        } else {
          ElMessage.error("报错失败，请稍后重试");
        }
	  },
      // 确定关闭弹窗
    };

    return {
      ...toRefs(showPage_state),
      ...showPage_methods,
    };
  },
};
</script>

<style scoped>


</style>
