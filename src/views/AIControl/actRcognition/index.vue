<template>
    <div class="main">
        <el-steps :active="activeIndex" align-center style="margin-top: 20px">
            <el-step title="上传图片" description="Some description" />
            <el-step title="点击识别" description="Some description" />
            <el-step title="完成预测" description="Some description" />
        </el-steps>
        <div class="actRcognition">
            <el-card shadow="never" class="main common">
                <div class="header">
                    <div>原图片</div>
                    <div>
                        <el-button
                            color="#409eff"
                            style="color: #fff"
                            class="reflashSearch"
                            @click="actRecond()"
                        >
                            识别
                        </el-button>
                    </div>
                </div>
                <div class="left--main">
                    <el-upload
                        class="upload"
                        style="width: 100%"
                        name="images"
                        action="http://106.12.160.172:8013/images"
                        list-type="picture"
                        responseType="blob"
                        :show-file-list="false"
                        :http-request="httpRequest"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :on-error="handleAvatarError"
                        :on-change="handleAvatarProgress"
                        :on-remove="handleRemove"
                    >
                        <img v-if="url" :src="url" class="avatarImage" />
                        <div v-else class="add">+</div>
                    </el-upload>
                </div>
            </el-card>
            <el-card shadow="never" class="mid common">
                <div class="header">预测结果</div>
                <div class="right--main">
                    <img v-if="actUrl" :src="actUrl" class="avatarImage" />
                    <el-icon v-else class="right--main--icon"
                        ><el-icon-picture
                    /></el-icon>
                </div>
            </el-card>
            <el-card shadow="never" class="right common">
                <div class="header">行为类型</div>
                <div class="right--main">
                    <div class="action-item">preening 整理羽毛</div>
                    <div class="action-item">grooming 修饰</div>
                    <div class="action-item">wing 展翅</div>
                    <div class="action-item">play 玩耍</div>
                    <div class="action-item">kiss 亲吻</div>
                </div>
            </el-card>
        </div>
    </div>
</template> 
<script>
import { defineComponent, ref } from "vue";
import ScEcharts from "@/components/scEcharts";
import { getActRcognition } from "@api/AiControl/actRcognition";
import { ElMessage } from "element-plus";
export default defineComponent({
    name: "actRcognition", // 行为识别
    components: {
        ScEcharts,
    },
    setup() {
        //活跃的步骤
        const activeIndex = ref(0);

        const url = ref("");
        const actUrl = ref("");

        //请求头
        const headers = {
            responseType: "blob",
        };

        //拿到的图片地址
        const blobImage = ref("");

        const beforeAvatarUpload = function (rawFile) {
            activeIndex.value = 1;
            let fr = new FileReader();
            fr.readAsDataURL(rawFile);
            fr.onload = function () {
                console.log("图片地址", fr.result);
                url.value = fr.result;
                activeIndex.value = 1;
            };
        };

        const httpRequest = async (id) => {
            let params = new FormData();
            params.append("images", id.file);
            const data = await getActRcognition(params, {
                responseType: "blob",
            });
            let reader = new window.FileReader();
            reader.readAsDataURL(data);
            reader.onloadend = function () {
                blobImage.value = reader.result;
            };
        };

        //进行识别
        const actRecond = async function () {
            activeIndex.value = 2;

            setTimeout(() => {
                ElMessage({
                    message: `识别成功`,
                    type: "success",
                    duration: 2000,
                });
                actUrl.value = blobImage.value;
                activeIndex.value = 3;
            }, 1000);
        };
        const handleAvatarError = function (Error, UploadFile, UploadFiles) {
            console.log("上传错误", Error, UploadFile, UploadFiles);
        };
        const handleAvatarProgress = async function (UploadFile, UploadFiles) {
            console.log("上传图片事件", UploadFile, UploadFiles);
        };

        return {
            // showPicked,
            url,
            actUrl,
            headers,
            activeIndex,
            actRecond,
            handleAvatarError,
            beforeAvatarUpload,
            handleAvatarProgress,
            httpRequest,
        };
    },
});
</script>
<style scoped lang="scss">
.main {
    // margin-top: 10px;
    .actRcognition {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 40px;
        .header {
            width: 100%;
            height: 60px;
            line-height: 60px;
            padding-left: 20px;
            font-size: 16px;
            border-bottom: 1px solid #c2c0c0;
            display: flex;
            justify-content: space-between;
        }
        .common {
            height: 450px;
            :deep(.el-card__body) {
                height: 100%;
                padding: 10px !important;
            }
        }
        .main {
            width: 35%;

            .left--main {
                height: 100%;
                width: 100%;
                .upload {
                    // height: 100%;
                    // padding-bottom: 10px;
                    padding-top: 10px;
                    :deep(.el-upload) {
                        width: 100% !important;
                        height: 100% !important;
                    }
                    .avatarImage {
                        width: 100%;
                        height: 400px;
                    }
                }

                .avatar-uploader {
                    width: 100%;
                    margin-top: 10px;
                }
                .add {
                    width: 100%;
                    height: 360px;
                    text-align: center;
                    font-size: 500px;
                    color: #e9ebec;
                    line-height: 300px;
                    background-color: #f6f8f9;
                }
                .add:hover {
                    cursor: pointer;
                }
            }
        }
        .mid {
            width: 35%;
            :deep(.el-card__body) {
                height: 100%;
                padding: 10px !important;
            }
            .right--main {
                // text-align: center;
                padding-top: 10px;
                .avatarImage {
                    width: 100%;
                    height: 400px;
                }
                .right--label {
                    margin-top: 20px;

                    font-size: 16px;
                    letter-spacing: 1px;
                }
                .right--option {
                    margin-top: 15px;
                }
                .right--main--icon {
                    height: 360px;
                    width: 100%;
                    font-size: 320px;
                    color: #e9ebec;
                    background-color: #f6f8f9;
                }
            }
        }

        .right {
            width: 28%;
            .right--main {
                .action-item {
                    width: 70%;
                    height: 40px;
                    margin: 0 auto;
                    margin-top: 25px;
                    background-color: #f6f8f9;
                    border-radius: 10px;
                    text-align: center;
                    line-height: 40px;
                    font-size: 15px;
                    color: #409eff;
                    font-weight: 700;
                }
            }
        }
    }
}
</style>