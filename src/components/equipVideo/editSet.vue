<template>
    <div>
        <el-dialog :title="dialogTitle" v-model="dialogFormVisible" width="40%">
            <el-form :model="form" :rules="rules">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="时间" :label-width="70">
                            <el-select
                                v-model="form.day"
                                class="m-2"
                                placeholder="白昼"
                                style="width: 95%"
                            >
                                <el-option
                                    v-for="(item, index) in dayOption"
                                    :key="index"
                                    :label="item"
                                    :value="item"
                                />
                            </el-select> </el-form-item
                    ></el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="最小值" :label-width="70">
                            <el-input v-model="form.min" /></el-form-item
                    ></el-col>
                    <el-col :span="16">
                        <el-form-item label="预警信息" :label-width="70">
                            <el-input
                                v-model="form.mininfo"
                                type="textarea" /></el-form-item
                    ></el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="最大值" :label-width="70">
                            <el-input v-model="form.max" /></el-form-item
                    ></el-col>
                    <el-col :span="16">
                        <el-form-item label="预警信息" :label-width="70">
                            <el-input
                                v-model="form.maxinfo"
                                type="textarea" /></el-form-item
                    ></el-col>
                </el-row>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false"
                        >取消</el-button
                    >
                    <el-button
                        
                        @click="editData()"
                        color="#409eff"
                        style="color: #fff"
                        >确定</el-button
                    >
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script >
import { defineComponent, ref, reactive } from "vue";
import { setThreshold } from "@/api/model/equipVideo/set";
import { ElMessage } from "element-plus";
export default defineComponent({
    name: "addDoceBoardDialog",
    props: {
        dialogForm: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    setup(props, { emit }) {
        // const { proxy } = getCurrentInstance();

        //弹框显示
        const dialogFormVisible = ref(false);
        const show = function (title) {
             console.log("cu", props.dialogForm);
            console.log("cu", props.dialogForm.name);
            form.name = props.dialogForm.name;
            form.min = props.dialogForm.min;
            form.mininfo = props.dialogForm.mininfo;
            form.max = props.dialogForm.max;
            form.maxinfo = props.dialogForm.maxinfo;
            form.day = props.dialogForm.day;
            form.gmtCreate = props.dialogForm.gmtCreate;
            form.gmtModified = props.dialogForm.gmtModified;
            form.id = props.dialogForm.id;
            form.isDeleted = props.dialogForm.isDeleted;
            form.version = props.dialogForm.version;
            console.log(form,'表单111')
            dialogFormVisible.value = true;
            dialogTitle.value = title + "的阀值所属";
        };

        //弹框标题
        const dialogTitle = ref("");

        //选择弹框
        const showEitSetDialog = function () {
            console.log("执行");
            emit("showEitSetDialog");
        };

        const dayOption = reactive(["白昼", "夜晚"]);

        //表单相关
        const form = reactive({
            name: "",
            min: "",
            mininfo: "",
            max: "",
            maxinfo: "",
            day: "",
            gmtCreate: "",
            gmtModified: "",
            id: "",
            isDeleted: "",
            version: "",
        });

        //编辑表单
        const editData = async function () {
                        switch (form.day) {
                case "白昼":
                    form.day = 0;
                    break;
                case "夜晚":
                    form.day = 1;
                    break;
            }
            let res = await setThreshold(form);
            console.log("请求参数", form);
            console.log("请求参数", res);
            dialogFormVisible.value = false;

            if (res.code == 200) {
                ElMessage({
                    message: "设置成功.",
                    type: "success",
                });
            } else {
                                ElMessage({
                    message: "设置失败.",
                    type: "warning",
                });
            }
        };

        return {
            dayOption,
            dialogTitle,
            dialogFormVisible,
            form,
            show,
            showEitSetDialog,
            editData,
        };
    },
});
</script>
<style>
</style>
