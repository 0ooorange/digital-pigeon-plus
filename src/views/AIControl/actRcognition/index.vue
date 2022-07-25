<template>
    <div class="actRcognition">
        <el-card shadow="never" class="main common">
            <div class="header">原图片</div>
            <div class="left--main">
                <el-image
                    v-show="url"
                    style="width: 100px; height: 100px"
                    :src="url"
                ></el-image>
                <el-upload
                    style="
                        width: 100%;
                        height: 450px;
                        text-align: center;
                        font-size: 500px;
                        color: #e9ebec;
                        line-height: 450px;
                        background-color: #f6f8f9;
                        margin-top: 10px;
                    "
                    action="http://106.12.160.172:8013/images"
                    :http-request="uploadPic"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-error="handleAvatarError"
                    :on-change="handleAvatarProgress"
                >
                    <div
                        style="
                            width: 100%;
                            height: 450px;
                            text-align: center;
                            font-size: 500px;
                            color: #e9ebec;
                            line-height: 450px;
                            background-color: #f6f8f9;
                            margin-top: 10px;
                        "
                        class="add"
                    >
                        +
                    </div>
                    <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"
                        ><Plus
                    /></el-icon> -->
                </el-upload>
            </div>
        </el-card>
        <el-card shadow="never" class="right common">
            <div class="header">预测结果</div>
            <div class="right--main">123</div>
        </el-card>
    </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import ScEcharts from "@/components/scEcharts";
// import http from "@/utils/request";
export default defineComponent({
    name: "actRcognition", // 行为识别
    components: {
        ScEcharts,
    },
    setup() {
        // const showPicked = function (e) {
        //     console.log("上传图片", e);
        // };

        const handleAvatarSuccess = function (response, uploadFile) {
            console.log("上传成功", response, uploadFile);
        };

        const beforeAvatarUpload = function (rawFile) {
            console.log("上传的图片", rawFile);
            console.log("图片列表", rawFile);
            var fr = new FileReader();
            fr.readAsDataURL(rawFile);
            fr.onload = function () {
                console.log("图片地址", fr.result);
                url.value = fr.result;
            };
            // console.log(e.target.files); //这个就是选中文件信息
        };
        const handleAvatarError = function (Error, UploadFile, UploadFiles) {
            console.log("上传错误", Error, UploadFile, UploadFiles);
        };
        const handleAvatarProgress = async function (UploadFile, UploadFiles) {
            console.log("上传图片事件", UploadFile, UploadFiles);
            // let formdata = new FormData();
            // UploadFiles.map((item) => {
            //     //fileList本来就是数组，就不用转为真数组了
            //     formdata.append("file", item.raw); //将每一个文件图片都加进formdata
            // });
            // console.log(UploadFile.raw);
            // const { data: res } = await http.post("/images", {
            //     images: UploadFile.raw,
            // });
            // console.log(res, "结果");
        };
        const url = ref("");
        const uploadPic = async function ({ raw }) {
            console.log(raw, "图片id");
            // const { data: res } = await http.post("/images", raw, {
            //     headers: {
            //         "Content-Type": "multipart/form-data",
            //     },
            // });
            // console.log(res, "结果");
        };

        const showimg = async function (e) {
            // const that = this;
            console.log("图片列表", this.$refs.file.files[0]);
            var fr = new FileReader();
            fr.readAsDataURL(this.$refs.file.files[0]);
            fr.onload = function () {
                console.log("图片地址", fr.result);
                url.value = fr.result;
            };
            console.log(e.target.files); //这个就是选中文件信息
            // let formdata = new FormData();
            // Array.from(e.target.files).map(async (item) => {
            //     console.log(item, 111);
            //     formdata.append("file", item); //将每一个文件图片都加进formdata
            //     const { data: res } = await http.post("/images", item);
            //     console.log(res, 555);
            // });
            // const { data: res } = await http.post("/images", {
            //     images: e.target.files,
            // });
            // console.log(res, "表单数据");
        };
        return {
            // showPicked,
            url,
            showimg,
            handleAvatarError,
            handleAvatarSuccess,
            beforeAvatarUpload,
            handleAvatarProgress,
            uploadPic,
        };
    },
});
</script>
<style scoped lang="scss">
.actRcognition {
    width: 100%;
    display: flex;
    justify-content: space-around;
    min-height: 100%;
    .header {
        width: 100%;
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        font-size: 16px;
        border-bottom: 1px solid #c2c0c0;
    }
    .common {
        :deep(.el-card__body) {
            height: 100%;
            padding: 10px !important;
        }
    }
    .main {
        width: 49%;
        .left--main {
            // height: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .avatar-uploader {
                width: 100%;
                height: 500px;
                margin-top: 10px;
                background-color: pink;
            }
            .add:hover {
                cursor: pointer;
            }
        }
    }
    .right {
        width: 49%;
        :deep(.el-card__body) {
            height: 100%;
            padding: 10px !important;
        }
        .right--main {
            // text-align: center;
            padding-left: 10px;
            .right--label {
                margin-top: 20px;

                font-size: 16px;
                letter-spacing: 1px;
            }
            .right--option {
                margin-top: 15px;
            }
        }
    }
}
</style>