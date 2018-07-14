define(['ojs/ojcore', 'knockout', 'jquery', 'appController'],
 function(oj, ko, $, app) {
  
    function PageViewModel() {
      var self = this

      self.router = app.router

      self.back = function() {
        self.router.go('home')
      }

      self.ifShowChart = ko.observable(false)

      self.temperature = ko.observable('-')
      self.name = ko.observable('')
      self.traces = ko.observableArray([])

      self.showChart = function() {
        self.ifShowChart(true)
      }

      self.hideChart = function() {
        self.ifShowChart(false)
      }

      self.connected = function() {
        self.temperature('-')
        self.name('')
        self.traces([])

        console.log(self.router.retrieve())
        var info = self.router.retrieve()
        var commodityId = info.commodityId
        
        axios.get('http://heng-ge.cn:8080/coldChainLogistics/getTemperatureById.do', {
            params: {
              goodsId: commodityId
            }
          })
          .then(function(response) {
            var commodity = response.data.resultMsg
            self.temperature(commodity.temperature)
            self.name(commodity.goodsName)
          })

        axios.get('http://heng-ge.cn:8080/coldChainLogistics/getTemperatureHistoryById.do', {
            params: {
              goodsId: commodityId
            }
          })
          .then(function(response) {
            var states = response.data.resultMsg
            var tracesValue = []
            for (var i = 0; i < states.length; i++) {
              var state = states[i]
              tracesValue.push({
                location: state.locationName,
                temperature: state.temperature,
                timestamp: state.createTime,
                status: 'warning' // TODO: calculate temperature status
              })
            }
            console.log(tracesValue)

            self.traces(tracesValue)
          })
      }

      self.disconnected = function() {
        // Implement if needed
      }

      self.transitionCompleted = function() {
        // Implement if needed
      }
    }

    return new PageViewModel()
  }
)
