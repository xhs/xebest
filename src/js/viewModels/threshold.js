define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'config'],
  function (oj, ko, $, app, config) {

    function ThresholdViewModel() {
      var self = this

      self.router = app.router

      self.back = function () {
        self.router.go('home')
      }

      self.threshold = ko.observable('-')
      self.newThreshold = ko.observable('')

      self.submit = function () {
        var t = self.newThreshold()
        if (!t) {
          return
        }
        console.log('newThreshold: ' + t)

        $.ajax({
          url: config.getBaseUrl() + '/coldChainLogistics/setTemperatureThreshold.do',
          data: {
            temperature: t
          }
        }).done(function (data) {
          console.log(data)
          self.threshold(t)
          self.newThreshold('')
        })
      }

      self.connected = function () {
        self.threshold('-')

        $.ajax({
          url: config.getBaseUrl() + '/coldChainLogistics/getTemperatureThreshold.do'
        }).done(function (response) {
          console.log(response)
          var currentThreshold = response.TemperatureThreshold
          self.threshold(currentThreshold)
        })
      }

      self.disconnected = function () {
        // Implement if needed
      }

      self.transitionCompleted = function () {
        // Implement if needed
      }
    }

    return new ThresholdViewModel()
  }
)
