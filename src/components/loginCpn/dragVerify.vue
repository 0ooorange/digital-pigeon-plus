<template>
  <div id="box" onselectstart="return false;">
    <div class="bgColor"></div>
    <div class="txt">滑动验证</div>
    <!--给i标签添加上相应字体图标的类名即可-->
    <div class="slider"><i class="iconfont icon-double-right"></i></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      box: '', // 容器
      bgColor: '', // 背景色
      txt: '', // 文本
      slider: '', // 滑块
      icon: '',
      successMoveDistance: 0, // 解锁需要滑动的距离
      downX: '', // 用于存放鼠标按下时的位置
      isSuccess: false, // 是否解锁成功的标志，默认不成功
      ismoving: false,
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 初始化数据
    initData() {
      this.box = document.getElementById('box')
      this.bgColor = this.getEle('.bgColor')
      this.txt = this.getEle('.txt')
      this.slider = document.querySelector('.slider')
      this.icon = this.getEle('.slider>i')
      this.successMoveDistance = this.box.offsetWidth - this.slider.offsetWidth
      this.slider.onmousedown = this.mousedownHandler // 给滑块添加鼠标按下事件
    },
    // 定义了一个获取元素的方法
    getEle(selector) {
      return document.querySelector(selector)
    },
    // 鼠标按下事件的方法实现
    mousedownHandler(e) {
      this.ismoving = true
      this.bgColor.style.transition = ''
      this.slider.style.transition = ''
      var e1 = e || window.event || e.which
      this.downX = e1.clientX
      //在鼠标按下时，分别给鼠标添加移动和松开事件
      // document.onmousemove = this.mousemoveHandler(e1)
      // if(this.ismoving === false) {
      //   document.onmouseup = this.mouseupHandler()
      // }
      var _this = this
      document.addEventListener('mousemove', function (e) {
        if (this.isSuccess) {
          this.success()
          return
        }
        _this.mousemoveHandler(e)
      })
      document.addEventListener('mouseup', function (e) {
        _this.mouseupHandler(e)
      })
    },
    // 定义一个获取鼠标当前需要移动多少距离的方法
    getOffsetX(offset, min, max) {
      if (offset < min) {
        offset = min
      } else if (offset > max) {
        offset = max
      }
      return offset
    },
    // 鼠标移动事件的方法实现
    mousemoveHandler(e) {
      if (this.isSuccess) {
        this.success()
        return
      }
      if (!this.ismoving) {
        return
      }
      console.log('我是鼠标移动事件，我被调用了')
      var e1 = e || window.event || e.which
      var moveX = e1.clientX
      var offsetX = this.getOffsetX(moveX - this.downX, 0, this.successMoveDistance)
      if (offsetX === this.successMoveDistance) {
        this.bgColor.style.width = this.successMoveDistance + 'px'
        this.slider.style.left = this.successMoveDistance + 'px'
        this.success()
        document.removeEventListener('mousemove', function () {
          console.log('我是鼠标移动事件，我被取消了')
        })
        return
      }
      this.bgColor.style.width = offsetX + 'px'
      this.slider.style.left = offsetX + 'px'
      console.log('offsetX: ', offsetX, '  this.successMoveDistance: ', this.successMoveDistance)

      // 如果不设置滑块滑动时会出现问题
      e1.preventDefault()
    },
    // 鼠标松开事件的方法实现
    mouseupHandler() {
      if (!this.isSuccess) {
        this.bgColor.style.width = 0 + 'px'
        this.slider.style.left = 0 + 'px'
        this.bgColor.style.transition = 'width 0.8s linear'
        this.slider.style.transition = 'left 0.8s linear'
      }
      this.ismoving = false
      document.onmousemove = null
      document.onmouseup = null
      console.log('我是鼠标松开事件，我被调用了')
      document.removeEventListener('mousemove', function () {
        console.log('我是鼠标移动事件，我被取消了')
      })
    },
    // 定义一个滑块解锁成功的方法
    success() {
      this.isSuccess = true
      this.txt.innerHTML = '验证成功'
      this.bgColor.style.backgroundColor = 'rgb(206, 254, 206)'
      this.slider.className = 'slider active'
      this.icon.className = 'iconfont icon-xuanzhong'
      //滑动成功时，移除鼠标按下事件和鼠标移动事件
      this.slider.onmousedown = null
      document.removeEventListener('mousemove', function () {
        console.log('我是鼠标移动事件，我被取消了')
      })
    },
  },
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
/* 其实这个图片显示的内容就是"<<"符号。 */
.btn {
  position: absolute;
  width: 40px;
  height: 32px;
  background: #fff
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==)
    center no-repeat;
  background-size: 13px; /* 不设置这个属性，背景图片会不成比例的显示 */
  border: 1px solid #ccc;
  cursor: move;
}
#box {
  position: relative;
  width: 300px;
  height: 40px;
  margin: 0 auto;
  margin-top: 10px;
  background-color: #e8e8e8;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
}
.bgColor {
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
  height: 40px;
  background-color: lightblue;
}
.txt {
  position: absolute;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #000;
  text-align: center;
}
.slider {
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 40px;
  border: 1px solid #ccc;
  background: #fff;
  text-align: center;
  cursor: move;
}
.slider > i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.slider.active > i {
  color: green;
}
</style>