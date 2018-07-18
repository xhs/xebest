define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'config'],
  function (oj, ko, $, app, config) {

    function StatusViewModel() {
      var self = this

      self.router = app.router

      self.back = function () {
        self.router.go('home')
      }

      self.nodesRunning = ko.observable('-')
      self.nodesStopped = ko.observable('-')
      self.healthPercent = ko.observable('-')
      self.blocks = ko.observable('-')
      self.transactions = ko.observable('-')

      self.update = function () {
        $.ajax({
          url: config.getBaseUrl() + '/coldChainLogistics/getBlockChainInfo.do'
        }).done(function (data) {
          var response = JSON.parse(data)
          console.log(response)
          var result = response.resultMsg
          self.nodesRunning(result.nodesRunning)
          self.nodesStopped(result.nodesStopped)
          self.healthPercent(result.healthStatus + '%')
          self.blocks(result.blocks)
          self.transactions(result.transactions)
        })
      }

      self.refreshTimer = null
      self.connected = function () {
        console.log('status connected')
        self.nodesRunning('-')
        self.nodesStopped('-')
        self.healthPercent('-')
        self.blocks('-')
        self.transactions('-')

        self.update()
        self.refreshTimer = setInterval(self.update, config.getRefreshInterval())
      }
      self.disconnected = function () {
        console.log('status disconnected')
        clearInterval(self.refreshTimer)
      }

      self.transitionCompleted = function () {
        // Implement if needed
      }
    }

    return new StatusViewModel()
  }
)
