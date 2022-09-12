<template>
    <div>
        <el-dialog
            v-model="dialogFormVisible"
            title="选择鸽笼"
            width="90%"
            top="2%"
            @close="closeDialog"
        >
            <div>
                <div class="top_button">
                    <div class="left_button">
                        <div class="left_bottom">
                            <div style="font-size: 14px; color: #6b6b6b">
                                状态说明:
                            </div>
                            <div class="left_footer_item">
                                <div
                                    class="cage_item"
                                    style="width: 14px; height: 14px"
                                ></div>
                                <div >
                                    表示该鸽笼已绑定鸽板
                                </div>
                            </div>
                            <div class="left_footer_item">
                                <div
                                    class="cage_item"
                                    style="
                                        background-color: #5cacee;
                                        width: 14px;
                                        height: 14px;
                                    "
                                ></div>
                                <div>表示该鸽笼未绑定鸽板</div>
                            </div>
                        </div>
                    </div>
                    <div class="right_buttom">
                        <div class="right_buttom_top">
                            <div class="right_buttom_top_box">
                                <div class="box_shadow"></div>
                                <div class="right_buttom_top_box_min" style="">
                                    <div
                                        @click="changeCurrentBox(index0)"
                                        class="right_buttom_top_box_first"
                                        :class="{
                                            current_box_show:
                                                index0 === currentBox,
                                        }"
                                        v-for="(item0, index0) in [0, 1, 2]"
                                        :key="index0"
                                    >
                                        <div
                                            v-for="(item, index) in [
                                                0, 1, 2, 3,4
                                            ]"
                                            :key="index"
                                            class="right_buttom_top_box_row"
                                            :style="{
                                                'margin-bottom':
                                                    index == 1 || index == 3
                                                        ? '3px'
                                                        : '2px',
                                                'margin-top':
                                                    index == 0 ? '3px' : '0px',
                                            }"
                                        >
                                            <div
                                                class="
                                                    right_buttom_top_box_item
                                                "
                                                v-for="(item1, index1) in [
                                                    0, 1, 2, 3, 4, 5
                                                ]"
                                                :key="index1"
                                            ></div>
                                        </div>
                                        <!-- <div class="shadow"></div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dialog_box" ref="dialogBox">
                <div>
                    <div class="cage_commom"></div>
                    <div
                        class="cage_commom"
                        v-for="(item, index) in clomeIndex"
                        :key="index"
                        :style="{
                            'margin-bottom':
                                index == 1 || index == 3 || index == 5
                                    ? '20px'
                                    : '10px',
                        }"
                    >
                        {{ item }}
                    </div>
                    <div class="cage_commom"></div>
                </div>

                <div>
                    <div
                        class="cage_row"
                        style="margin-top: 10px; margin-bottom: 0px"
                    >
                        <div
                            class="cage_index"
                            v-for="(item2, index2) in cageArray[0]"
                            :key="index2"
                        >
                            {{ index2 + 1 }}
                        </div>
                    </div>
                    <div>
                        <div
                            class=""
                            v-for="(item, index) in cageArray"
                            :key="index + 'a'"
                        >
                            <div
                                class="cage_row"
                                :style="{
                                    'margin-bottom':
                                        index % 2 === 0 ? '10px' : '20px',
                                }"
                            >
                                <div
                                    class="cage_item"
                                    v-for="(item1, index1) in item"
                                    :key="index1"
                                    :style="{
                                        'background-color':
                                            item1 === 1 ? '#5cacee' : '#e5e5e5',
                                    }"
                                    style="width: 34px; height: 34px"
                                    @click="clickCage"
                                ></div>
                            </div>
                            <!-- <div style="height: 20px; width: 700px" v-if="index % 2 === 0">
                                <div
                                    style="
                                        width: 60px;
                                        height: 100%;
                                        font-weight: 700;
                                        font-size: 16px;
                                        color: #a1a1a1;
                                        line-height:20px;
                                    "
                                >
                                    > >
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <div
                        class="cage_row"
                        style="margin-top: 10px; margin-bottom: 0px"
                    >
                        <div
                            class="cage_index"
                            v-for="(item2, index2) in cageArray[0]"
                            :key="index2"
                        >
                            {{ index2 + 1 }}
                        </div>
                    </div>
                </div>
            </div>
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
import { defineComponent, ref ,getCurrentInstance} from "vue";
export default defineComponent({
    name: "chooseCageDialog",
    setup(props, {emit}) {
        //弹框显示
        const dialogFormVisible = ref(false);

        const { proxy } = getCurrentInstance();

        //添加鸽板弹框显示
        const show = function () {
            // console.log("cu");
            dialogFormVisible.value = true;
        };

        // //选择鸽笼弹框
        // const showChooseCageDialog = function() {
        //     emit("showChooseCageDialog")
        // }

        const currentBox = ref(0);

        const clomeIndex = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"];

        const cageArray = [
            [
                1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1,
                1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1,
                0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,
                0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0,
                1, 1, 0, 0, 1, 1,0,0
            ],
            [
                1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1,
                1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1,
                0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,
                0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0,
                1, 1, 0, 0, 1, 1,0,0
            ],
            [
                1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1,
                1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1,
                0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,
                0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0,
                1, 1, 0, 0, 1, 1,0,0
            ],
            [
                1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1,
                1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1,
                0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,
                0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0,
                1, 1, 0, 0, 1, 1,0,0
            ],
            [
                1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1,
                1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1,
                0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,
                0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0,
                1, 1, 0, 0, 1, 1,0,0
            ],
            [
                1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1,
                1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1,
                0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,
                0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0,
                1, 1, 0, 0, 1, 1,0,0
            ],
            [
                1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1,
                1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1,
                0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,
                0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0,
                1, 1, 0, 0, 1, 1,0,0
            ],
            [
                1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1,
                1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1,
                0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,
                0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0,
                1, 1, 0, 0, 1, 1,0,0
            ],
        ];

        const clickCage = function () {
        // const clickCage = function (e) {
            // console.log("详情", e);
            // console.log("点击对象左侧", e.target.offsetLeft - 17);
            // console.log("点击对象上侧", e.target.offsetTop - 17);
            // console.log("点击对象", e.target.style.width);
        };

                //改变当前鸽笼数
        const changeCurrentBox = function(index) {
            // console.log("点击1111");
            // console.log(index, 111);
            currentBox.value = index
            proxy.$refs.dialogBox.scrollLeft = index * 1300;
            // console.log(this.$refs.dialogBox.scrollLeft);
        }

        const closeDialog = function() {
            emit("closeDialog")
            // console.log('关闭')
        }

        return {
            show,
            clomeIndex,
            cageArray,
            dialogFormVisible,
            currentBox,
            clickCage,
            changeCurrentBox,
            closeDialog
            // showChooseCageDialog
        };
    },
});
</script>
<style lang="scss">
.top_button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 120px;
    // background-color: pink;
    .left_button {
        display: flex;
        flex-direction: column;
        width: 50%;
        height: 100%;
        .left_bottom {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 30px;
            .left_footer_item {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 14px;
                letter-spacing: 1px;
                line-height: 30px;
                margin-left: 10px;
            }
        }
    }

    .right_buttom {
        width: 40%;
        height: 100%;
        text-align: right;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .right_buttom_top {
            height: 73%;
            width: 100%;
            // text-align: right;
            position: relative;
            display: flex;
            justify-content: flex-end;

            .right_buttom_top_box {
                width: 68%;
                height: 100%;
                // background-color: pink;

                position: relative;
                .right_buttom_top_box_min {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    padding: 4px;
                }
                .box_shadow {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0px;
                    // z-index:1 ;
                    background: rgba(0, 0, 0, 0.1);
                }
                .current_box_show {
                    background: rgba(0, 0, 0, 0.07);
                }
                .right_buttom_top_box_first {
                    position: relative;
                    .right_buttom_top_box_row {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-wrap: wrap;
                        .right_buttom_top_box_item {
                            width: 12px;
                            height: 12px;
                            border: 1px solid #5cacee;
                            margin-right: 4px;
                            // margin-bottom: 2px;
                        }
                    }
                }
            }
        }
    }
}
.cage_commom {
    width: 34px;
    height: 34px;
    margin-bottom: 10px;
    margin-right: 4px;
    // background-color: pink;
    line-height: 28px;
    text-align: center;
    font-size: 12px;
    color: #8b8878;
    font-weight: 700;
    // background-color: #e5e5e5;
}
.cage_item {
    flex-shrink: 0; //使它不被挤压
    width: 34px;
    height: 34px;
    margin-right: 7px;
    // margin-bottom: 10px;
    background-color: #e5e5e5;
    border-radius: 1px;
}
.dialog_box {
    height: 480px;
    width: 100%;
    border-top: 4px solid #5cacee;
    border-bottom: 4px solid #5cacee;
    border-radius: 30px;
    padding: 10px;
    padding-left: 0px;
    // margin-top: 10px;
    overflow-y: auto;
    display: flex;
    white-space: nowrap;
    scrollbar-width: none;
    .cage_row {
        display: flex;
        width: 100%;
        //  flex-wrap: wrap;
        .cage_index {
            flex-shrink: 0; //使它不被挤压
            width: 34px;
            height: 18px;
            margin-right: 7px;
            margin-bottom: 10px;
            text-align: center;
            line-height: 18px;
            font-weight: 700;
            color: #8b8878;
            // background-color: pink;
        }
    }
}
.dialog_box::-webkit-scrollbar {
    width: 100%;
    height: 10px;
    // background-color: pink;
    display: none; //隐藏滚动条
}
.dialog_box::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    // border-radius: 10px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    background-color: #5cacee;
}
.dialog_box::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    background-color: rgba(240, 240, 240, 0.5);
}
</style>