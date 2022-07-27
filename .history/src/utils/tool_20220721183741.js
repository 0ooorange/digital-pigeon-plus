/*
 * @Descripttion: 工具集
 * @version: 1.1
 * @LastEditors: sakuya
 * @LastEditTime: 2021年7月20日10:58:41
 */

import CryptoJS from 'crypto-js'
module "C:/Users/86156/AppData/Local/Microsoft/TypeScript/4.7/node_modules/@types/crypto-js/index"

const tool = {}

/* cookie */
tool.cookie = {
  set(name, value, expires, domain, path, secure) {
    var cookieText = ''
    cookieText += encodeURIComponent(name) + '=' + encodeURIComponent(value)
    if (expires instanceof Date) {
      cookieText += '; expires=' + expires.toGMTString()
    }
    if (path) {
      cookieText += '; path=' + path
    }
    if (domain) {
      cookieText += '; domain=' + domain
    }
    if (secure) {
      cookieText += '; secure'
    }
    document.cookie = cookieText
  },

  // 获取cookie
  get(name) {
    var cookieName = encodeURIComponent(name) + '=',
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = ''
    if (cookieStart > -1) {
      var cookieEnd = document.cookie.indexOf(';', cookieStart)
      if (cookieEnd == -1) {
        cookieEnd = document.cookie.length
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
    }
    return cookieValue
  },

  // 删除cookie
  remove(name, domain, path, secure) {
    this.set(name, '', Date(0), domain, path, secure)
  }
}

/* localStorage */
tool.data = {
  set(table, settings) {
    var _set = JSON.stringify(settings)
    return localStorage.setItem(table, _set)
  },
  get(table) {
    var data = localStorage.getItem(table)
    try {
      data = JSON.parse(data)
    } catch (err) {
      return null
    }
    return data
  },
  remove(table) {
    return localStorage.removeItem(table)
  },
  clear() {
    return localStorage.clear()
  }
}

/*sessionStorage*/
tool.session = {
  set(table, settings) {
    var _set = JSON.stringify(settings)
    return sessionStorage.setItem(table, _set)
  },
  get(table) {
    var data = sessionStorage.getItem(table)
    try {
      data = JSON.parse(data)
    } catch (err) {
      return null
    }
    return data
  },
  remove(table) {
    return sessionStorage.removeItem(table)
  },
  clear() {
    return sessionStorage.clear()
  }
}

/* Fullscreen */
tool.screen = function (element) {
  var isFull = !!(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement)
  if (isFull) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    }
  }
}

/* 复制对象 */
tool.objCopy = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

/* 日期格式化 */
tool.dateFormat = function (date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  date = new Date(date)
  var o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}

/* 千分符 */
tool.groupSeparator = function (num) {
  num = num + ''
  if (!num.includes('.')) {
    num += '.'
  }
  return num
    .replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
      return $1 + ','
    })
    .replace(/\.$/, '')
}

/* 常用加解密 */
tool.crypto = {
  //MD5加密
  MD5(data) {
    return CryptoJS.MD5(data).toString()
  },
  //BASE64加解密
  BASE64: {
    encrypt(data) {
      return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data))
    },
    decrypt(cipher) {
      return CryptoJS.enc.Base64.parse(cipher).toString(CryptoJS.enc.Utf8)
    }
  },
  //AES加解密
  AES: {
    encrypt(data, secretKey) {
      const result = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(secretKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      return result.toString()
    },
    decrypt(cipher, secretKey) {
      const result = CryptoJS.AES.decrypt(cipher, CryptoJS.enc.Utf8.parse(secretKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      return CryptoJS.enc.Utf8.stringify(result)
    }
  }
}

/* JSON序列化 */
tool.http = {
  stringify: (data) => {
    let result = ''
    for (let key in data) {
      result += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
    }
    return result.slice(0, result.length - 1)
  }
}

export default tool
