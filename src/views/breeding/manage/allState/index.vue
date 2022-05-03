<template>
  <div class="page">
    <div class="top_button">
      <div :class="{
                    top_button_item: true,
                    top_button_item_active: index === currentStatus,
                }" v-for="(item, index) in methodsArray" :key="index" @click="changeStatus(index)">
        {{ item }}
      </div>
    </div>
    <div class="right_buttom">
      <div :class="{
                    right_buttom_item: true,
                    right_buttom_item_active: index === currentLever,
                }" v-for="(item, index) in lever" :key="index" @click="changeLever(index)">
        {{ item }}
      </div>
    </div>
    <div class="dialog_box">
      <div>
        <div class="cage_commom"></div>
        <div class="cage_commom" v-for="(item,index) in clomeIndex" :key="index" :style="{'margin-bottom': (index == 1 || index == 3 || index == 5) ? '20px': '10px'}">{{item}}</div>
        <div class="cage_commom"></div>
      </div>
      <div>
        <div class="cage_row">
          <div class="cage_index" v-for="(item2, index2) in cageArray0[0]" :key="index2">
            {{ index2 + 1 }}
          </div>
        </div>
        <div class="cage_row" v-for="(item, index) in cageArray1" :key="index" :style="{
                        'margin-bottom': index % 2 === 0 ? '10px' : '0px',
                    }">
          <div class="cage_item" v-for="(item1, index1) in item" :key="index1" :style="{
                            'background-color':
                                item1 === 1 ? '#5cacee' : '#e5e5e5',
                        }"></div>
        </div>
        <div style="height: 20px; width: 100%">
          <div style="
                            width: 60px;
                            margin: auto;
                            height: 100%;
                            font-weight: 700;
                            font-size: 16px;
                            color: #a1a1a1;
                        ">
            > >
          </div>
        </div>
        <div class="cage_row" v-for="(item, index) in cageArray1" :key="index" :style="{
                        'margin-bottom': index % 2 === 0 ? '10px' : '0px',
                    }">
          <div class="cage_item" v-for="(item1, index1) in item" :key="index1" :style="{
                            'background-color':
                                item1 === 1 ? '#5cacee' : '#e5e5e5',
                        }"></div>
        </div>
        <div style="height: 20px; width: 100%">
          <div style="
                            width: 60px;
                            margin: auto;
                            height: 100%;
                            font-weight: 700;
                            font-size: 16px;
                            color: #a1a1a1;
                        ">
            > >
          </div>
        </div>
        <div class="cage_row" v-for="(item, index) in cageArray1" :key="index" :style="{
                        'margin-bottom': index % 2 === 0 ? '10px' : '0px',
                    }">
          <div class="cage_item" v-for="(item1, index1) in item" :key="index1" :style="{
                            'background-color':
                                item1 === 1 ? '#5cacee' : '#e5e5e5',
                        }"></div>
        </div>
        <div style="height: 20px; width: 100%">
          <div style="
                            width: 60px;
                            margin: auto;
                            height: 100%;
                            font-weight: 700;
                            font-size: 16px;
                            color: #a1a1a1;
                        ">
            > >
          </div>
        </div>
        <div class="cage_row" v-for="(item, index) in cageArray1" :key="index" :style="{
                        'margin-bottom': index % 2 === 0 ? '10px' : '0px',
                    }">
          <div class="cage_item" v-for="(item1, index1) in item" :key="index1" :style="{
                            'background-color':
                                item1 === 1 ? '#5cacee' : '#e5e5e5',
                        }"></div>
        </div>
        <!-- <div
                class="cage_row"
                v-for="(item, index) in cageArray0"
                :key="index"
            >
                <div
                    class="cage_item"
                    v-for="(item1, index1) in item"
                    :key="index1"
                    :style="{
                        'background-color': item1 === 1 ? '#5cacee' : '#e5e5e5',
                    }"
                ></div>
            </div> -->

        <div class="cage_row" style="margin-top: 10px; margin-bottom: 0px">
          <div class="cage_index" v-for="(item2, index2) in cageArray0[0]" :key="index2">
            {{ index2 + 1 }}
          </div>
        </div>
      </div>
    </div>
    <!-- 底部盒子 -->
    <div class="footer">
      <div class="left_footer">
        <div style="font-size: 18px; color: #6b6b6b">状态说明:</div>
        <div class="left_footer_item">
          <div class="cage_item"></div>
          <div>
            表示该鸽笼未处于{{ methodsArray[currentStatus] }}状态
          </div>
        </div>
        <div class="left_footer_item">
          <div class="cage_item" style="background-color: #5cacee"></div>
          <div>
            表示该鸽笼处于{{ methodsArray[currentStatus] }}状态
          </div>
        </div>
      </div>
      <div class="right_footer">
        <div style="font-size: 18px; color: #6b6b6b">
          A01鸽笼具体数据:
        </div>
        <div class="dataList">
          <div class="row">
            <el-card class="box-card card_list_item">
              <span style="font-size: 14px">成鸽数:</span>
              <span :style="'font-size:17px;padding-left:5px; font-weight: 700;color:#EE4000'">1对</span>
            </el-card>
            <el-card class="box-card card_list_item">
              <span style="font-size: 14px">幼鸽数:</span>
              <span :style="'font-size:17px;padding-left:5px;  font-weight: 700;color:#EE9A49'">1只</span>
            </el-card>
            <el-card class="box-card card_list_item">
              <span style="font-size: 14px">抽蛋数:</span>
              <span :style="'font-size:17px;padding-left:5px;  font-weight: 700;color:#43CD80'">1个</span>
            </el-card>
          </div>
          <div class="row">
            <el-card class="box-card card_list_item">
              <span style="font-size: 14px">产蛋数:</span>
              <span :style="'font-size:17px;padding-left:5px;  font-weight: 700;color:#76EE00'">2个</span>
            </el-card>
            <el-card class="box-card card_list_item">
              <span style="font-size: 14px">出仔数:</span>
              <span :style="'font-size:17px;padding-left:5px;  font-weight: 700;color:#6495ED'">0只</span>
            </el-card>
            <el-card class="box-card card_list_item">
              <span style="font-size: 14px">出栏数:</span>
              <span :style="'font-size:17px;padding-left:5px;  font-weight: 700;color:#7D26CD'">0只</span>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'allStateManage', // 鸽棚总览
  data() {
    return {
      currentStatus: 0,
      currentLever: 0,
      methodsArray: ['产蛋', '查蛋', '查仔', '仔异常', '出栏', '回蛋'],
      lever: ['上', '中', '下'],
      clomeIndex: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'],
      cageArray0: [
        [
          0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
          0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
          0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
          0, 1,
        ],
      ],
      cageArray1: [
        [
          0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
          0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
          0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
          0, 1,
        ],
        [
          0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
          0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
          0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
          0, 1,
        ],
      ],
    }
  },
  methods: {
    //改变查看状态
    changeStatus(index) {
      this.currentStatus = index
    },

    //改变查看鸽笼层级
    changeLever(index) {
      this.currentLever = index
    },
  },
}
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
    width: 80%;
    height: 80px;
    // background-color: pink;

    .top_button_item {
      height: 60%;
      width: 8%;
      background-color: #fff;
      box-shadow: 1px 4px 10px #dbdbdb;
      margin-right: 6.67%;
      font-size: 20px;
      font-weight: 700;
      text-align: center;
      line-height: 48px;
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
  .right_buttom {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 40px;
    top: 55px;
    // width: 200px;
    height: 30px;
    line-height: 30px;

    .right_buttom_item {
      width: 50px;
      height: 100%;
      margin-right: 10px;
      // background-color: pink;
      font-weight: 500;
      color: #5cacee;
      box-shadow: 1px 4px 10px #dbdbdb;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
    }
    .right_buttom_item_active {
      background-color: #5cacee;
      color: #fff;
    }
  }
  .cage_commom {
    width: 20px;
    height: 20px;
    margin-bottom: 10px;
    margin-right: 4px;
    // background-color: #e5e5e5;
  }
  .cage_item {
    flex-shrink: 0; //使它不被挤压
    width: 20px;
    height: 20px;
    margin-right: 4px;
    // margin-bottom: 10px;
    background-color: #e5e5e5;
    border-radius: 1px;
  }

  .dialog_box {
    height: 360px;
    border-top: 4px solid #5cacee;
    border-radius: 30px;
    padding: 10px;
    margin-top: 10px;
    overflow-y: auto;
    display: flex;
    white-space: nowrap;

    .cage_row {
      display: flex;
      //  flex-wrap: wrap;
      .cage_index {
        flex-shrink: 0; //使它不被挤压
        width: 20px;
        height: 20px;
        margin-right: 4px;
        margin-bottom: 10px;
        text-align: center;
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
    margin-left: 20px;
    display: flex;
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
        margin-top: 10px;
        .row {
          display: flex;
          margin-top: 10px;
          .card_list_item {
            margin-left: 50px;
          }
        }
      }
    }
  }
}
</style>