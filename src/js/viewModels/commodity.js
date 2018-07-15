define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'config'],
  function (oj, ko, $, app, config) {

    function CommodityViewModel() {
      var self = this

      self.router = app.router

      self.back = function () {
        self.router.go('home')
      }

      self.name = ko.observable('')
      self.commodityId = ko.observable('')
      self.options = ko.observableArray([])
      self.newCommodityId = ko.observable('')

      self.newCommodity = ko.computed(function () {
        console.log(self.newCommodityId())
        console.log(self.options())
        var options = self.options()
        for (var i = 0; i < options.length; i++) {
          var option = options[i]
          if (option.commodityId == self.newCommodityId()) {
            return option.name
          }
        }

        return ''
      })

      self.submit = function () {
        var newCommodityId = self.newCommodityId()
        if (!newCommodityId) {
          return
        }

        $.ajax({
          url: config.getBaseUrl() + '/coldChainLogistics/setCurrentGoodsById.do',
          data: {
            goodsId: newCommodityId
          }
        }).done(function (data) {
          console.log(data)
          self.newCommodityId('')
          self.commodityId(newCommodityId)

          var options = self.options()
          for (var i = 0; i < options.length; i++) {
            var option = options[i]
            if (option.commodityId == newCommodityId) {
              self.name(option.name)
              return
            }
          }
        })
      }

      self.connected = function () {
        self.name('')
        self.commodityId('')
        self.options([])

        $.ajax({
          url: config.getBaseUrl() + '/coldChainLogistics/getCurrentGoods.do'
        }).done(function (response) {
          console.log(response)
          var commodity = response.resultMsg
          self.name(commodity.goodsName)
          self.commodityId(commodity.goodsId)
        })

        $.ajax({
          url: config.getBaseUrl() + '/coldChainLogistics/getTransportableGoodsList.do'
        }).done(function (response) {
          console.log(response)
          var candidates = response.resultMsg
          var optionsValue = []
          for (var i = 0; i < candidates.length; i++) {
            var candidate = candidates[i]
            optionsValue.push({
              name: candidate.goodsName,
              commodityId: candidate.goodsId
            })
          }

          self.options(optionsValue)
        })
      }

      self.disconnected = function () {
        // Implement if needed
      }

      self.transitionCompleted = function () {
        // Implement if needed
      }
    }

    return new CommodityViewModel()
  }
)
