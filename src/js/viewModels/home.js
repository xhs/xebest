define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'config'],
  function (oj, ko, $, app, config) {

    function HomeViewModel() {
      var self = this

      self.toggleDrawer = app.toggleDrawer
      self.router = app.router

      self.commodityGroups = ko.observableArray([])

      self.loadPage = function (data, event) {
        var target = event.currentTarget ? event.currentTarget : event.srcElement
        self.router.store({
          commodityId: target.getAttribute('data-commodity-id')
        })
        self.router.go('page')
      }

      self.connected = function () {
        $.ajax({
          url: config.getBaseUrl() + '/coldChainLogistics/getGoodsList.do'
        }).done(function (data) {
          var response = JSON.parse(data)
          console.log(response)
          var commodities = response.resultMsg
          var commodityGroupsValue = []
          commodities.sort(function (l, r) { return r.status - l.status })
          for (var i = 0; i < commodities.length; i++) {
            var commodity = commodities[i]

            var status = commodity.status === 0 ? 'normal' : (commodity.status === 1 ? 'warning' : 'critical')
            var item = {
              temperature: commodity.temperature,
              name: commodity.goodsName,
              commodityId: commodity.goodsId,
              status: status,
              statusContent: status === 'normal' ? '低于安全温度' : '高于安全温度'
            }

            if (i % 3 == 0) {
              commodityGroupsValue.push({
                commodities: [item]
              })
            } else {
              commodityGroupsValue[commodityGroupsValue.length - 1].commodities.push(item)
            }
          }

          console.log(commodityGroupsValue)
          self.commodityGroups(commodityGroupsValue)
        })
      }

      self.disconnected = function () {
        // Implement if needed
      }

      self.transitionCompleted = function () {
        // Implement if needed
      }
    }

    return new HomeViewModel()
  }
)
