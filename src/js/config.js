define(['jquery'],
  function ($) {

    function Config() {
      var self = this

      self.defaultBaseUrl = 'http://heng-ge.cn:8080'
      self.getBaseUrl = function () {
        var url = localStorage.getItem('XEBEST_BASE_URL')
        if (url) {
          return url
        }
        return self.defaultBaseUrl
      }
      self.setBaseUrl = function (value) {
        localStorage.setItem('XEBEST_BASE_URL', value)
      }
      self.resetBaseUrl = function () {
        localStorage.removeItem('XEBEST_BASE_URL')
      }

      self.defaultRefreshInterval = 5000
      self.getRefreshInterval = function () {
        var interval = localStorage.getItem('XEBEST_REFRESH_INTERVAL')
        if (interval) {
          return parseInt(interval)
        }
        return self.defaultRefreshInterval
      }
      self.setRefreshInterval = function (value) {
        localStorage.setItem('XEBEST_REFRESH_INTERVAL', value.toString())
      }
      self.resetRefreshInterval = function () {
        localStorage.removeItem('XEBEST_REFRESH_INTERVAL')
      }

      self.getExternalMapUrl = function () {
        var url = localStorage.getItem('XEBEST_EXTERNAL_MAP_URL')
        if (url) {
          return url
        }
        return ''
      }
      self.setExternalMapUrl = function (value) {
        localStorage.setItem('XEBEST_EXTERNAL_MAP_URL', value)
      }
      self.resetExternalMapUrl = function () {
        localStorage.removeItem('XEBEST_EXTERNAL_MAP_URL')
      }

      self.defaultMapWidth = 1127
      self.getMapWidth = function () {
        var width = localStorage.getItem('XEBEST_MAP_WIDTH')
        if (width) {
          return parseInt(width)
        }
        return self.defaultMapWidth
      }
      self.setMapWidth = function (value) {
        localStorage.setItem('XEBEST_MAP_WIDTH', value.toString())
      }
      self.resetMapWidth = function () {
        localStorage.removeItem('XEBEST_MAP_WIDTH')
      }

      self.defaultMapHeight = 889
      self.getMapHeight = function () {
        var height = localStorage.getItem('XEBEST_MAP_HEIGHT')
        if (height) {
          return parseInt(height)
        }
        return self.defaultMapHeight
      }
      self.setMapHeight = function (value) {
        localStorage.setItem('XEBEST_MAP_HEIGHT', value.toString())
      }
      self.resetMapHeight = function () {
        localStorage.removeItem('XEBEST_MAP_HEIGHT')
      }

      self.defaultRoute = ['北京', '高碑店', '邢台', '安阳', '郑州']
      self.getRoute = function () {
        var route = localStorage.getItem('XEBEST_ROUTE')
        if (route) {
          return JSON.parse(route)
        }
        return self.defaultRoute
      }
      self.setRoute = function (route) {
        localStorage.setItem('XEBEST_ROUTE', JSON.stringify(route))
      }
      self.resetRoute = function () {
        localStorage.removeItem('XEBEST_ROUTE')
      }

      self.defaultPositionRatios = {
        '北京': { "x": 664.1786666666667, "y": 113.3475, "w": 1127, "h": 889 },
        '高碑店': { "x": 619.0986666666666, "y": 180.0225, "w": 1127, "h": 889 },
        '邢台': { "x": 453.80533333333335, "y": 506.73, "w": 1127, "h": 889 },
        '安阳': { "x": 444.78933333333333, "y": 637.8575, "w": 1127, "h": 889 },
        '郑州': { "x": 360.64, "y": 815.6575, "w": 1127, "h": 889 }
      }
      self.getPositionRatios = function () {
        var ratios = localStorage.getItem('XEBEST_POSITION_RATIOS')
        if (ratios) {
          return JSON.parse(ratios)
        }
        return self.defaultPositionRatios
      }
      self.setPositionRatios = function (ratios) {
        localStorage.setItem('XEBEST_POSITION_RATIOS', JSON.stringify(ratios))
      }
      self.resetPositionRatios = function () {
        localStorage.removeItem('XEBEST_POSITION_RATIOS')
      }
    }

    return new Config()
  }
)
