<template>
  <div class="overall">
    <!-- <div class="description">
      <h1 class="desc-title">{{ descTitle }}</h1>
      <div class="desc-content">
        <span>{{ descContent }}</span>
      </div>
    </div> -->
    <div class="circle-box">
      <div class="circle" :style="`width:${circle_w}px;height:${circle_h}px`">
        <div class="origin" :style="`width:${box_w}px;height:${box_h}px;transform: rotate(${stard}deg);`">
          <img src="../../../public/img/logo.png" alt="error" class="originImg">
          <div :style="`width:${box_w}px;height:${box_h}px;transform: rotate(${-stard}deg);`" class="img-box" v-for="(item, index) in menus" :key="index" @click="Turn(index)">
            <div class="box">
              <router-link :to="item.path" :class="`content iconfont ${item.iconName}`" style="color:white;font-size: 200px;"></router-link>
              <router-view></router-view>
              <div class="content">{{item.title}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['menus'], //菜单数据
  data() {
    return {
      circle_w: window.innerHeight, //圆盘的宽
      circle_h: window.innerHeight, //圆盘的高
      box_w: 350, //圆盘上覆盖的小圆点宽
      box_h: 350, //圆盘上覆盖的小圆点高
      PI: 360, //分布角度，默认为360deg
      stard: 90, //起始角度
      activeIndex: 0, //默认下标
    }
  },
  created() {
    // this.turnToModule('/testhome')
  },
  //路由跳转进来 判断from是否有特殊标识做特殊处理
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.is) {
        //删除特殊标识，防止标签刷新重复执行
        delete from.is
        //执行特殊方法
        vm.$alert('路由跳转过来后含有特殊标识，做特殊处理', '提示', {
          type: 'success',
          center: true,
        })
          .then(() => {})
          .catch(() => {})
      }
    })
  },
  mounted() {
    this.init()
    this.Turn(this.activeIndex)
  },
  methods: {
    //初始化小圆点，根据计算使其分布到对应位置
    init() {
      let box = document.querySelectorAll('.img-box')
      let avd = this.PI / box.length //每一个 img-box 对应的角度
      let ahd = (avd * Math.PI) / 180 //每一个 img-box 对应的弧度
      let radius = this.circle_w / 2 //圆的半径
      for (let i = 0; i < box.length; i++) {
        box[i].style.left = Math.sin(ahd * i) * radius + 'px'
        box[i].style.top = Math.cos(ahd * i) * radius + 'px'
      }
    },
    //点击相对应小圆点，圆盘进行相对应角度的转动
    Turn(index) {
      let bx = document.querySelectorAll('.box')
      for (let i = 0; i < bx.length; i++) {
        if (i === index) {
          bx[i].classList.add('box-active')
        } else {
          bx[i].classList.remove('box-active')
        }
      }
      // this.setDescription(index);
    },

    // setDescription(index) {
    //   this.descTitle = this.menus[index].name;
    //   this.descContent = this.menus[index].desc;
    // },

    turnToModule(name) {
      this.$router.push(name)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'iconfont.css';
* {
  margin: 0;
  padding: 0;
}
.overall {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #5c6070;
}
.circle-box {
  .circle {
    transform: scale(0.85);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-sizing: border-box;
    // border: 1px solid #4d4c4c;
    // box-shadow: 0 0 8px #DDD;
    // -moz-box-shadow: 0 0 8px #DDD;
    // -webkit-box-shadow: 0 0 8px #DDD;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .origin {
      position: relative;
      width: 100px;
      height: 100px;
      .originImg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
      }
      .img-box {
        user-select: none; // 不能选取元素的文本
        position: absolute;
        top: 0;
        left: 0;
        transition: none !important;
        pointer-events: none;
        .box {
          box-sizing: border-box;
          pointer-events: all !important;
          width: 100%;
          height: 100%;
          transition: 0.4s; // 过渡，搭配hover设置经过放大
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          border-radius: 50%;
          transform: scale(0.25);
          cursor: pointer;
          color: white;
          background: transparent;
          // overflow: hidden;
          .content {
            font-size: 50px;
          }
          &:hover {
            transform: scale(0.35);
          }
        }
        .box-active {
          transition-delay: 0.5s;
          border: 5px solid white;
        }
      }
    }
  }
}
</style>