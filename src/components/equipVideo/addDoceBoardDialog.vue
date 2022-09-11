<template>
    <div>
        <el-dialog
            v-model="dialogFormVisible"
            title="添加出栏"
            width="40%"
            @close="closeDialog"
        >
            <el-form :model="form">
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            label="基地"
                            :label-width="formLabelWidth"
                        >
                            <el-select
                                v-model="currBase.name"
                                class="m-2"
                                placeholder="Select"
                                size="large"
                            >
                                <el-option
                                    v-for="item in bases"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name"
                                />
                            </el-select> </el-form-item
                    ></el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="鸽棚"
                            :label-width="formLabelWidth"
                        >
                            <el-select
                                v-model="currShed.code"
                                class="m-2"
                                placeholder="Select"
                                size="large"
                            >
                                <el-option
                                    v-for="item in dovecotes"
                                    :key="item.id"
                                    :label="item.code"
                                    :value="item.code"
                                />
                            </el-select> </el-form-item
                    ></el-col>
                </el-row>
                <el-row justify="flex-start">
                    <el-col :span="24">
                        <el-button
                            color="#409eff"
                            style="color: #fff"
                            class="reflashSearch"
                            @click="showChooseCageDialog()"
                        >
                            {{ titleButton }}
                        </el-button>
                        <el-tag
                            style="margin-left: 20px; width: 50px; height: 30px"
                            class="ml-2"
                            type="success"
                            v-show="showTag"
                            >A01</el-tag
                        >
                        <el-tag
                            style="margin-left: 20px; width: 50px; height: 30px"
                            class="ml-2"
                            v-show="showTag"
                            type="success"
                            >A02</el-tag
                        >
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false"
                        >取消</el-button
                    >
                    <el-button type="primary" @click="dialogFormVisible = false"
                        >确定</el-button
                    >
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script >
import { defineComponent, ref, getCurrentInstance, reactive } from "vue";
export default defineComponent({
    name: "addDoceBoardDialog",
    setup(props, { emit }) {
        const { proxy } = getCurrentInstance();

        //弹框显示
        const dialogFormVisible = ref(false);

        //添加鸽板弹框显示
        const show = function () {
            // console.log("cu");
            dialogFormVisible.value = true;
        };

        const titleButton = ref("选择鸽笼");

        const showTag = ref(false);

        //当前基地/鸽棚信息
        const baseInfo = proxy.$TOOL.data.get("USER_INFO");
        const bases = reactive(baseInfo.base);
        const currInfo = proxy.$TOOL.data.get("CURR_INFO");
        const dovecotes = reactive(baseInfo.shed);
        let currBase = ref("");
        let currShed = ref("");

        if (currInfo) {
            currBase.value = currInfo.CURR_BASE;
            currShed.value = currInfo.CURR_SHED;
        } else {
            currBase.value = bases[0];
            currShed.value = dovecotes[0];
        }

        //选择鸽笼弹框
        const showChooseCageDialog = function () {
            // console.log("执行");
            emit("showChooseCageDialog");
        };

        const changeShowTag = function () {
            showTag.value = true;
            titleButton.value = '重新选择鸽笼'
        };

        const closeDialog = function () {
            // emit("closeDialog");
            // console.log("关闭");
            showTag.value = false;
            titleButton.value = '选择鸽笼'

        };

        return {
            dialogFormVisible,
            currBase,
            currShed,
            bases,
            dovecotes,
            titleButton,
            showTag,
            show,
            closeDialog,
            changeShowTag,
            showChooseCageDialog,
        };
    },
});
</script>
<style>
</style>