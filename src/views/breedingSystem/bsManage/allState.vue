<template>
    <div class="page" style="background: url('img/bg.png')">
        <div class="mid_img">
            <img class="dove_img" src="img/dove.png" />
            <img class="base_bottom" src="img/page1_3.jpg" />
        </div>
        <div class="data_count">
            <div
                class="data_count_item"
                v-for="(item, index) in dataCount"
                :key="index"
                @click="showDetail(index)"
            >
                <div>{{ item.title }}</div>
                <div>{{ item.count }}个</div>
            </div>
        </div>
        <div class="footer">
            <div
                v-for="(item, index) in methodsArray"
                :key="index"
                @click="changeStatus(index)"
                :style="{
                    'background-color':
                        index == currentStatus ? '#068db3' : '#2d526e',
                }"
            >
                {{ item }}
            </div>
        </div>

        <!-- 鸽笼俯视图 -->
        <el-dialog
            v-model="dialogTableVisible"
            :title="dialogTitle"
            width="90%"
            top="14px"
            height="80%"
            custom-class="dialogClass"
        >
            <div class="dialog_box">
                <div class="cage_row">
                    <div
                        class="cage_index"
                        v-for="(item2, index2) in cageArray0[0]"
                        :key="index2"
                    >
                        {{ index2 + 1 }}
                    </div>
                </div>
                <div
                    class="cage_row"
                    v-for="(item, index) in cageArray0"
                    :key="index"
                    :style="{
                        'margin-bottom': index % 2 === 0 ? '0px' : '10px',
                    }"
                >
                    <div
                        class="cage_item"
                        v-for="(item1, index1) in item"
                        :key="index1"
                        :style="{
                            'background-color': item1===1 ? '#9ec9e1' : '#e5e5e5',
                        }"
                    ></div>
                </div>
                <div style="height: 40px; width: 100%">
                    <div
                        style="
                            width: 60px;
                            margin: auto;
                            height: 100%;
                            line-height: 40px;
                            font-weight: 700;
                            font-size: 26px;
                            color: #a1a1a1;
                        "
                    >
                        > >
                    </div>
                </div>
                <div
                    class="cage_row"
                    v-for="(item, index) in cageArray1"
                    :key="index"
                    :style="{
                        'margin-bottom': index % 2 === 0 ? '10px' : '0px',
                    }"
                >
                    <div
                        class="cage_item"
                        v-for="(item1, index1) in item"
                        :key="index1"
                                                :style="{
                            'background-color': item1===1 ? '#9ec9e1' : '#e5e5e5',
                        }"
                    ></div>
                </div>
                <div style="height: 40px; width: 100%">
                    <div
                        style="
                            width: 60px;
                            margin: auto;
                            height: 100%;
                            line-height: 40px;
                            font-weight: 700;
                            font-size: 26px;
                            color: #a1a1a1;
                        "
                    >
                        > >
                    </div>
                </div>
                <div
                    class="cage_row"
                    v-for="(item, index) in cageArray1"
                    :key="index"
                    :style="{
                        'margin-bottom': index % 2 === 0 ? '10px' : '0px',
                    }"
                >
                    <div
                        class="cage_item"
                        v-for="(item1, index1) in item"
                        :key="index1"
                                                :style="{
                            'background-color': item1===1 ? '#9ec9e1' : '#e5e5e5',
                        }"
                    ></div>
                </div>
                <div style="height: 40px; width: 100%">
                    <div
                        style="
                            width: 60px;
                            margin: auto;
                            height: 100%;
                            line-height: 40px;
                            font-weight: 700;
                            font-size: 26px;
                            color: #a1a1a1;
                        "
                    >
                        > >
                    </div>
                </div>
                <div
                    class="cage_row"
                    v-for="(item, index) in cageArray1"
                    :key="index"
                    :style="{
                        'margin-bottom': index % 2 === 0 ? '10px' : '0px',
                    }"
                >
                    <div
                        class="cage_item"
                        v-for="(item1, index1) in item"
                        :key="index1"
                                                :style="{
                            'background-color': item1===1 ? '#9ec9e1' : '#e5e5e5',
                        }"
                    ></div>
                </div>
                <div style="height: 40px; width: 100%">
                    <div
                        style="
                            width: 60px;
                            margin: auto;
                            height: 100%;
                            line-height: 40px;
                            font-weight: 700;
                            font-size: 26px;
                            color: #a1a1a1;
                        "
                    >
                        > >
                    </div>
                </div>
                <div
                    class="cage_row"
                    v-for="(item, index) in cageArray0"
                    :key="index"
                >
                    <div
                        class="cage_item"
                        v-for="(item1, index1) in item"
                        :key="index1"
                                                :style="{
                            'background-color': item1===1 ? '#9ec9e1' : '#e5e5e5',
                        }"
                    ></div>
                </div>

                <div
                    class="cage_row"
                    style="margin-top: 10px; margin-bottom: 0px"
                >
                    <div
                        class="cage_index"
                        v-for="(item2, index2) in cageArray0[0]"
                        :key="index2"
                    >
                        {{ index2 + 1 }}
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "allStateManage",
    data() {
        return {
            dialogTableVisible: true,
            dialogTitle: "",
            currentStatus: 0,
            methodsArray: ["产蛋", "查蛋", "查仔", "仔异常", "出栏", "回蛋"],
            dataCount: [
                {
                    title: "第一层数量",
                    count: 122,
                },
                {
                    title: "第二层数量",
                    count: 340,
                },
                {
                    title: "第三层数量",
                    count: 560,
                },
            ],
            cageArray0: [
                [
                    0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
                    0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
                    0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
                    0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
                    0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1,
                ],
            ],
            cageArray1: [
                [
                    0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
                    0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
                    0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
                    0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
                    0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1,
                ],
                [
                    0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
                    0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
                    0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
                    0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
                    0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1,
                ],
            ],
        };
    },
    methods: {
        showDetail(index) {
            if (index === 0) {
                this.dialogTitle = "第一层俯视图";
            } else if (index === 1) {
                this.dialogTitle = "第二层俯视图";
            } else {
                this.dialogTitle = "第三层俯视图";
            }
            this.dialogTableVisible = true;
        },
        changeStatus(index) {
            this.currentStatus = index;
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
    height: 100%;
    background-color: #191c2d;
    // background: url("@/img/bg.png");

    .dialogClass {
        background-color: pink;
    }
    .dialog_box {
        // background-color: pink;
        height: 600px;
        border-top: 4px solid #9ec9e1;
        border-radius: 30px;
        // border-bottom: 12px solid #9ec9e1;
        padding: 10px;
        overflow-y: auto;
        white-space: nowrap;

        .cage_row {
            display: flex;
            //  flex-wrap: wrap;
            .cage_index {
                flex-shrink: 0; //使它不被挤压
                width: 30px;
                height: 30px;
                margin-right: 8px;
                margin-bottom: 10px;
                text-align: center;
                font-weight: 700;
                // background-color: pink;
            }
            .cage_item {
                flex-shrink: 0; //使它不被挤压
                width: 36px;
                height: 36px;
                margin-right: 8px;
                // margin-bottom: 10px;
                background-color: #e5e5e5;
                border-radius: 4px;
            }
        }
    }
    .dialog_box::-webkit-scrollbar {
        width: 100%;
        height: 15px;
        // background-color: pink;
    }
    .dialog_box::-webkit-scrollbar-track {
        box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
        // border-radius: 10px;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        background-color: #9ec9e1;
    }
    .dialog_box::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
        background-color: rgba(240, 240, 240, 0.5);
    }

    .mid_img {
        // display: flex;
        // flex-direction: column;
        width: 700px;
        position: relative;
        margin: 0 auto;
        .dove_img {
            position: absolute;
            top: 0px;
            transform: rotateX(50deg);
            width: 600px;
            height: 220px;
        }
        .base_bottom {
            // margin-top: 20px;
            margin-left: 70px;
            width: 500px;
            height: 280px;
        }
    }
    .data_count {
        width: 100%;
        height: 200px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 100px;
        padding-right: 100px;
        // background-color: pink;

        .data_count_item {
            position: relative;
            width: 200px;
            height: 200px;
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            cursor: pointer;
            // animation: animation-rotate 4s linear infinite;
        }
        .data_count_item:hover {
            -webkit-animation: wobble-ver-left 1s both;
            animation: wobble-ver-left 1s both;
        }
        .data_count_item:nth-of-type(1):before {
            width: 200px;
            height: 200px;
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            background: url("../../../../public/img/bqzlbg001.png") no-repeat;
            background-size: 100% 100%;
            animation: animation-rotate 4s linear infinite;
        }
        .data_count_item:nth-of-type(2):before {
            width: 200px;
            height: 200px;
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            background: url("../../../../public/img/bqzlbg002.png") no-repeat;
            background-size: 100% 100%;
            animation: animation-rotate1 4s linear infinite;
        }
        .data_count_item:nth-of-type(3):before {
            width: 200px;
            height: 200px;
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            background: url("../../../../public/img/bqzlbg001.png") no-repeat;
            background-size: 100% 100%;
            animation: animation-rotate 4s linear infinite;
        }
    }

    .footer {
        width: 100%;
        height: 80px;
        // background-color: pink;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 70px;
        padding-right: 70px;
        div {
            width: 100px;
            height: 40px;
            background-color: #0c2f5a;
            box-shadow: 1px 4px 10px #068db3;
            margin-right: 10px;
            color: #fff;
            font-size: 20px;
            text-align: center;
            line-height: 40px;
            border-radius: 10px;
            cursor: pointer;
        }
    }
}
/* #rotate-90-vertical-fwd {



	-webkit-animation: rotate-90-vertical-fwd 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: rotate-90-vertical-fwd 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
} */
/* #rotate-90-vertical-fwd {
    width: 100px;
    height: 100px;
    border-radius: 20rpx;
    border: 10px solid blue;
    -webkit-animation: rotate-90-vertical-fwd 10s
        cubic-bezier(0.55, 0.055, 0.675, 0.19) infinite forwards;
    animation: rotate-90-vertical-fwd 10s cubic-bezier(0.55, 0.055, 0.675, 0.19)
        infinite forwards;
} */

/* #rotate-90-vertical-fwd {
      width: 100px;
    height: 100px;
    border-radius: 20rpx;
    border: 10px solid blue;
	-webkit-animation: rotate-90-vertical-fwd 10s cubic-bezier(0.250, 0.460, 0.450, 0.940) infinite both;
	        animation: rotate-90-vertical-fwd 10s cubic-bezier(0.250, 0.460, 0.450, 0.940) infinite both;
} */
#rotate-90-vertical-fwd {
    /* width: 100px; */
    /* height: 40px; */
    /* border-radius: 120px; */
    border: 10px solid blue;
    -webkit-animation: rotate-90-vertical-fwd 10s linear infinite both;
    animation: rotate-90-vertical-fwd 10s linear infinite both;
}

/* ----------------------------------------------
 * Generated by Animista on 2022-4-13 14:4:33
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation rotate-90-vertical-fwd
 * ----------------------------------------
 */
@-webkit-keyframes rotate-90-vertical-fwd {
    0% {
        -webkit-transform: rotateY(0);
        transform: rotateY(0);
    }
    100% {
        -webkit-transform: rotateY(180deg);
        transform: rotateY(180deg);
    }
}
@keyframes rotate-90-vertical-fwd {
    0% {
        -webkit-transform: rotateY(0);
        transform: rotateY(0);
    }
    100% {
        -webkit-transform: rotateY(180deg);
        transform: rotateY(180deg);
    }
}

//光圈
@keyframes animation-rotate {
    0% {
        transform: rotatez(360deg);
    }
    100% {
        transform: rotatez(0deg);
    }
}

@keyframes animation-rotate1 {
    0% {
        transform: rotatez(0deg);
    }
    100% {
        transform: rotatez(360deg);
    }
}

//震动
/* ----------------------------------------------
 * Generated by Animista on 2022-4-13 16:52:59
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation wobble-ver-left
 * ----------------------------------------
 */
@-webkit-keyframes wobble-ver-left {
    0%,
    100% {
        -webkit-transform: translateY(0) rotate(0);
        transform: translateY(0) rotate(0);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
    }
    15% {
        -webkit-transform: translateY(-30px) rotate(-6deg);
        transform: translateY(-30px) rotate(-6deg);
    }
    30% {
        -webkit-transform: translateY(15px) rotate(6deg);
        transform: translateY(15px) rotate(6deg);
    }
    45% {
        -webkit-transform: translateY(-15px) rotate(-3.6deg);
        transform: translateY(-15px) rotate(-3.6deg);
    }
    60% {
        -webkit-transform: translateY(9px) rotate(2.4deg);
        transform: translateY(9px) rotate(2.4deg);
    }
    75% {
        -webkit-transform: translateY(-6px) rotate(-1.2deg);
        transform: translateY(-6px) rotate(-1.2deg);
    }
}
@keyframes wobble-ver-left {
    0%,
    100% {
        -webkit-transform: translateY(0) rotate(0);
        transform: translateY(0) rotate(0);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
    }
    15% {
        -webkit-transform: translateY(-30px) rotate(-6deg);
        transform: translateY(-30px) rotate(-6deg);
    }
    30% {
        -webkit-transform: translateY(15px) rotate(6deg);
        transform: translateY(15px) rotate(6deg);
    }
    45% {
        -webkit-transform: translateY(-15px) rotate(-3.6deg);
        transform: translateY(-15px) rotate(-3.6deg);
    }
    60% {
        -webkit-transform: translateY(9px) rotate(2.4deg);
        transform: translateY(9px) rotate(2.4deg);
    }
    75% {
        -webkit-transform: translateY(-6px) rotate(-1.2deg);
        transform: translateY(-6px) rotate(-1.2deg);
    }
}
</style>