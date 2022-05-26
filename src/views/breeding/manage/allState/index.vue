<template>
    <div class="page">
        <div class="top_button">
            <div class="left_button">
                <div class="left_top">
                    <div
                        :class="{
                            top_button_item: true,
                            top_button_item_active: index === currentStatus,
                        }"
                        v-for="(item, index) in methodsArray"
                        :key="index"
                        @click="changeStatus(index)"
                    >
                        {{ item }}
                    </div>
                </div>
                <div class="left_bottom">
                    <div style="font-size: 14px; color: #6b6b6b">状态说明:</div>
                    <div class="left_footer_item">
                        <div
                            class="cage_item"
                            style="width: 14px; height: 14px"
                        ></div>
                        <div style="font-size: 12px">
                            表示该鸽笼未处于{{
                                methodsArray[currentStatus]
                            }}状态
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
                        <div>
                            表示该鸽笼处于{{ methodsArray[currentStatus] }}状态
                        </div>
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
                                    current_box_show: index0 === currentBox,
                                }"
                                v-for="(item0, index0) in [0, 1, 2]"
                                :key="index0"
                            >
                                <div
                                    v-for="(item, index) in [0, 1, 2, 3, 4]"
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
                                        class="right_buttom_top_box_item"
                                        v-for="(item1, index1) in [
                                            0, 1, 2, 3, 4, 5, 6, 7,
                                        ]"
                                        :key="index1"
                                    ></div>
                                </div>
                                <!-- <div class="shadow"></div> -->
                            </div>
                        </div>
                    </div>
                    <div class="right_buttom_bottom">
                        <div
                            :class="{
                                right_buttom_item: true,
                                right_buttom_item_active:
                                    index === currentLever,
                            }"
                            v-for="(item, index) in lever"
                            :key="index"
                            @click="changeLever(index)"
                        >
                            {{ item }}
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
                                ? '16px'
                                : '8px',
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
                                    index % 2 === 0 ? '8px' : '16px',
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
        <!-- 底部盒子 -->
        <div class="footer">
            <div style="margin-bottom: 16px; font-size: 16px">
                鸽笼A01数据如下:
            </div>
            <div class="left_footer_row">
                <div class="table_item">
                    <el-card class="item_title" style="color: #6959cd">
                        近半年操作记录
                    </el-card>
                    <!-- <div class="item_title"></div> -->
                    <scTable
                        class="table"
                        ref="table"
                        row-key="id"
                        stripe
                        highlightCurrentRow
                        hidePagination
                        :data="tableListOption"
                        @selection-change="selectionChange"
                    >
                        <el-table-column
                            align="center"
                            label="时间"
                            prop="time"
                            width="150"
                            sortable
                        ></el-table-column>
                        <!-- <el-table-column
                            align="center"
                            label="鸽笼编号"
                            prop="number"
                            width="150"
                            sortable
                        ></el-table-column> -->
                        <el-table-column
                            align="center"
                            label="操作记录"
                            prop="option"
                            width="150"
                        ></el-table-column>
                    </scTable>
                </div>
                <div class="table_item">
                    <el-card class="item_title" style="color: #cd0000">
                        异常信息
                    </el-card>
                    <!-- <div class="item_title"></div> -->
                    <scTable
                        class="table"
                        ref="table"
                        row-key="id"
                        stripe
                        highlightCurrentRow
                        hidePagination
                        :data="tableListAbnormal"
                        @selection-change="selectionChange"
                    >
                        <el-table-column
                            align="center"
                            label="时间"
                            prop="time"
                            width="150"
                            sortable
                        ></el-table-column>
                        <!-- <el-table-column
                            align="center"
                            label="鸽笼编号"
                            prop="number"
                            width="140"
                            sortable
                        ></el-table-column> -->
                        <el-table-column
                            align="center"
                            label="异常信息"
                            prop="abnormal"
                            width="150"
                        ></el-table-column>
                    </scTable>
                </div>
                <div class="table_item">
                    <el-card class="item_title" style="color: #6495ed">
                        鸽笼数据
                    </el-card>
                    <!-- <div class="item_title"></div> -->
                    <div class="dataList" style="height: 150px">
                        <div class="row">
                            <el-card class="box-card card_list_item">
                                <span style="font-size: 10px">成鸽数:</span>
                                <span
                                    :style="'font-size:12px;padding-left:5px; font-weight: 700;color:#EE4000'"
                                    >1对</span
                                >
                            </el-card>
                            <el-card class="box-card card_list_item">
                                <span style="font-size: 10px">幼鸽数:</span>
                                <span
                                    :style="'font-size:12px;padding-left:5px;  font-weight: 700;color:#EE9A49'"
                                    >1只</span
                                >
                            </el-card>
                            <el-card class="box-card card_list_item">
                                <span style="font-size: 10px">抽蛋数:</span>
                                <span
                                    :style="'font-size:12px;padding-left:5px;  font-weight: 700;color:#43CD80'"
                                    >1个</span
                                >
                            </el-card>
                        </div>
                        <div class="row">
                            <el-card class="box-card card_list_item">
                                <span style="font-size: 10px">产蛋数:</span>
                                <span
                                    :style="'font-size:12px;padding-left:5px;  font-weight: 700;color:#76EE00'"
                                    >2个</span
                                >
                            </el-card>
                            <el-card class="box-card card_list_item">
                                <span style="font-size: 10px">出仔数:</span>
                                <span
                                    :style="'font-size:12px;padding-left:5px;  font-weight: 700;color:#6495ED'"
                                    >0只</span
                                >
                            </el-card>
                            <el-card class="box-card card_list_item">
                                <span style="font-size: 10px">出栏数:</span>
                                <span
                                    :style="'font-size:12px;padding-left:5px;  font-weight: 700;color:#7D26CD'"
                                    >0只</span
                                >
                            </el-card>
                        </div>
                    </div>
                    <div
                        class="dataList"
                        style="
                            height: 260px;
                            width: 100%;
                            padding-top: 0px;
                            padding-bottom: 0px;
                        "
                    >
                        <el-carousel
                            trigger="click"
                            height="100%"
                            style="height: 100%; width: 100%; padding: 10px"
                        >
                            <el-carousel-item
                                v-for="item in 3"
                                :key="item"
                                style="height: 100%; width: 100%"
                            >
                                <img
                                    src="../../../../assets/images/pigeon2.jpg"
                                    style="height: 100%; width: 100%"
                                />
                            </el-carousel-item>
                        </el-carousel>
                        <!-- <img
                            src="@/assets/images/pigeon.png"
                            style="height: 100%"
                        /> -->
                    </div>
                </div>

                <!-- <div class="right_footer">
                <div style="font-size: 18px; color: #6b6b6b">
                    A01鸽笼具体数据:
                </div>
                <div class="dataList">
                    <div class="row">
                        <el-card class="box-card card_list_item">
                            <span style="font-size: 14px">成鸽数:</span>
                            <span
                                :style="'font-size:17px;padding-left:5px; font-weight: 700;color:#EE4000'"
                                >1对</span
                            >
                        </el-card>
                        <el-card class="box-card card_list_item">
                            <span style="font-size: 14px">幼鸽数:</span>
                            <span
                                :style="'font-size:17px;padding-left:5px;  font-weight: 700;color:#EE9A49'"
                                >1只</span
                            >
                        </el-card>
                        <el-card class="box-card card_list_item">
                            <span style="font-size: 14px">抽蛋数:</span>
                            <span
                                :style="'font-size:17px;padding-left:5px;  font-weight: 700;color:#43CD80'"
                                >1个</span
                            >
                        </el-card>
                    </div>
                    <div class="row">
                        <el-card class="box-card card_list_item">
                            <span style="font-size: 14px">产蛋数:</span>
                            <span
                                :style="'font-size:17px;padding-left:5px;  font-weight: 700;color:#76EE00'"
                                >2个</span
                            >
                        </el-card>
                        <el-card class="box-card card_list_item">
                            <span style="font-size: 14px">出仔数:</span>
                            <span
                                :style="'font-size:17px;padding-left:5px;  font-weight: 700;color:#6495ED'"
                                >0只</span
                            >
                        </el-card>
                        <el-card class="box-card card_list_item">
                            <span style="font-size: 14px">出栏数:</span>
                            <span
                                :style="'font-size:17px;padding-left:5px;  font-weight: 700;color:#7D26CD'"
                                >0只</span
                            >
                        </el-card>
                    </div>
                </div>
            </div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "allStateManage", // 鸽棚总览
    data() {
        return {
            currentBox: 0,
            currentStatus: 0,
            currentLever: 0,
            methodsArray: ["产蛋", "查蛋", "查仔", "仔异常", "出栏", "回蛋"],
            lever: ["上", "中", "下"],
            clomeIndex: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
            cageArray: [
                [
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
                ],
                [
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
                ],
                [
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
                ],
                [
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
                ],
                [
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
                ],
                [
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
                ],
                [
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
                ],
                [
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
                ],
            ],
            cageArray3: [
                [
                    {
                        codes: "A002",
                        state: 0,
                    },
                    {
                        codes: "A002",
                        state: 1,
                    },
                    {
                        codes: "A002",
                        state: 0,
                    },
                ],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
            ],
            tableListOption: [
                {
                    time: "2022-04-21",
                    number: "A01",
                    option: "查蛋(抽取)",
                },
                {
                    time: "2022-04-21",
                    number: "A01",
                    option: "查蛋(抽取)",
                },
                {
                    time: "2022-04-21",
                    number: "A01",
                    option: "查蛋(抽取)",
                },
                {
                    time: "2022-04-21",
                    number: "A01",
                    option: "查蛋(抽取)",
                },
                {
                    time: "2022-04-21",
                    number: "A01",
                    option: "查蛋(抽取)",
                },
                {
                    time: "2022-04-21",
                    number: "A01",
                    option: "查蛋(抽取)",
                },
                {
                    time: "2022-04-21",
                    number: "A01",
                    option: "查蛋(抽取)",
                },
                {
                    time: "2022-04-21",
                    number: "A01",
                    option: "查蛋(抽取)",
                },
            ],
            tableListAbnormal: [
                {
                    time: "2022-04-21",
                    number: "A01",
                    abnormal: "蛋异常(单蛋)",
                },
                {
                    time: "2022-04-21",
                    number: "A01",
                    abnormal: "仔异常(冷蛋)",
                },
                {
                    time: "2022-04-21",
                    number: "A01",
                    abnormal: "蛋异常(单蛋)",
                },
                {
                    time: "2022-04-21",
                    number: "A01",
                    abnormal: "仔异常(冷蛋)",
                },
                {
                    time: "2022-04-21",
                    number: "A01",
                    abnormal: "蛋异常(单蛋)",
                },
                {
                    time: "2022-04-21",
                    number: "A01",
                    abnormal: "蛋异常(单蛋)",
                },
                {
                    time: "2022-04-21",
                    number: "A01",
                    abnormal: "蛋异常(单蛋)",
                },
                {
                    time: "2022-04-21",
                    number: "A01",
                    abnormal: "蛋异常(单蛋)",
                },
            ],
        };
    },
    methods: {
        //改变查看状态
        changeStatus(index) {
            this.currentStatus = index;
        },

        //改变当前鸽笼数
        changeCurrentBox(index) {
            console.log("点击1111");
            console.log(index, 111);
            this.currentBox = index;
            this.$refs.dialogBox.scrollLeft = index * 1100;
            console.log(this.$refs.dialogBox.scrollLeft);
        },

        //改变查看鸽笼层级
        changeLever(index) {
            this.currentLever = index;
        },
    },
};
</script>

<style scoped lang="scss">
* {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}
.page {
    position: relative;
    height: 100%;

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
            .left_top {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 70%;
                .top_button_item {
                    height: 50%;
                    width: 12%;
                    background-color: #fff;
                    box-shadow: 1px 4px 10px #dbdbdb;
                    margin-right: 4%;
                    font-size: 16px;
                    font-weight: 700;
                    text-align: center;
                    line-height: 40px;
                    border-radius: 8px;
                    color: #5cacee;
                    cursor: pointer;
                }
                .top_button_item_active {
                    box-shadow: 1px 4px 10px #dbdbdb;
                    background-color: #5cacee;
                    color: #fff;
                }
            }
            .left_bottom {
                height: 30%;
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
            width: 50%;
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
                        background: rgba(0, 0, 0, 0.06);
                    }
                    .right_buttom_top_box_first {
                        position: relative;
                        .right_buttom_top_box_row {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-wrap: wrap;
                            .right_buttom_top_box_item {
                                width: 14px;
                                height: 14px;
                                border: 1px solid #5cacee;
                                margin-right: 2px;
                                // margin-bottom: 2px;
                            }
                        }
                    }
                }

                .right_buttom_bottom {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-left: 10px;
                    .right_buttom_item {
                        width: 38px;
                        height: 20px;
                        margin-right: 10px;
                        // background-color: pink;
                        font-weight: 500;
                        color: #5cacee;
                        box-shadow: 1px 4px 10px #dbdbdb;
                        text-align: center;
                        font-size: 13px;
                        cursor: pointer;
                    }
                    .right_buttom_item_active {
                        background-color: #5cacee;
                        color: #fff;
                    }
                }
            }

            // position: absolute;
            // display: flex;
            // align-items: center;
            // justify-content: center;
            // right: 40px;
            // top: 55px;
            // // width: 200px;
            // height: 30px;
            // line-height: 30px;

            // .right_buttom_item {
            //     width: 50px;
            //     height: 100%;
            //     margin-right: 10px;
            //     // background-color: pink;
            //     font-weight: 500;
            //     color: #5cacee;
            //     box-shadow: 1px 4px 10px #dbdbdb;
            //     text-align: center;
            //     font-size: 16px;
            //     cursor: pointer;
            // }
            // .right_buttom_item_active {
            //     background-color: #5cacee;
            //     color: #fff;
            // }
        }
    }

    .cage_commom {
        width: 28px;
        height: 28px;
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
        width: 28px;
        height: 28px;
        margin-right: 7px;
        // margin-bottom: 10px;
        background-color: #e5e5e5;
        border-radius: 1px;
    }

    .dialog_box {
        height: 410px;
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
            height: 28px;
            //  flex-wrap: wrap;
            .cage_index {
                flex-shrink: 0; //使它不被挤压
                width: 28px;
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

    .footer {
        margin-top: 20px;
        // margin-left: 20px;
        padding-bottom: 20px;
        .left_footer_row {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            margin-bottom: 40px;
            .table_item {
                width: 30%;
                // margin-right: 4%;
                .item_title {
                    width: 45%;
                    margin: auto;
                    margin-bottom: 10px;
                    text-align: center;
                    font-size: 14px;
                }
                .table {
                    width: 100%;
                    // height: 700px;
                }
                .dataList {
                    margin-top: 10px;
                    background-color: #fff;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding-top: 20px;
                    padding-bottom: 20px;
                    height: 700px;
                    width: 100%;
                    .row {
                        display: flex;
                        justify-content: space-around;
                        margin-top: 10px;
                        width: 100%;
                        .card_list_item {
                            // margin-left: 20px;
                            width: 28%;

                            :deep(.el-card__body) {
                                height: 100%;
                                padding: 10px !important;
                                // background-color: #d9f0f7;
                            }
                        }
                    }
                }
            }
        }

        .left_footer {
            flex: 3;
            .left_footer_item {
                display: flex;
                font-size: 14px;
                letter-spacing: 1px;
                margin-top: 10px;
            }
        }
        .right_footer {
            flex: 5;
            margin-left: 250px;
            padding-bottom: 20px;
            .dataList {
                height: 400px;
                margin-top: 10px;
                .row {
                    display: flex;
                    margin-top: 10px;
                    margin-bottom: 20px;
                    .card_list_item {
                        margin-left: 50px;
                    }
                }
            }
        }
    }
}
</style>