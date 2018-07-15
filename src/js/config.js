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

      self.defaultRoute = ['北京', '高碑店', '邢台', '安阳', '武汉', '广州', '海口']
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
        '北京': { xRatio: 0.5222024725254398, yRatio: 0.16236469196088496 },
        '高碑店': { xRatio: 0.5168738758670169, yRatio: 0.18734387533948263 },
        '邢台': { xRatio: 0.4849022959164798, yRatio: 0.26727726215099523 },
        '安阳': { xRatio: 0.47690940092884554, yRatio: 0.31223979223247106 },
        '郑州': { xRatio: 0.4582593126243656, yRatio: 0.36719399566538596 },
        '武汉': { xRatio: 0.5035523842209598, yRatio: 0.5195670142748319 },
        '广州': { xRatio: 0.4902308925749027, yRatio: 0.7868442764258271 },
        '海口': { xRatio: 0.36234457277275417, yRatio: 0.9242297850081144 }
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
