define(['ojs/ojcore', 'knockout', 'jquery', 'appController'],
  function (oj, ko, $, app) {

    function ThresholdViewModel() {
      var self = this

      self.router = app.router

      self.back = function () {
        self.router.go('home')
      }

      self.threshold = ko.observable('-')
      self.newThreshold = ko.observable('')

      self.submit = function() {
        var t = self.newThreshold()
        console.log('newThreshold: ' + t)
        axios.get('http://heng-ge.cn:8080/coldChainLogistics/setTemperatureThreshold.do', {
            params: {
              temperature: t
            }
          })
          .then(function(response) {
            console.log(response)
            self.threshold(t)
            self.newThreshold('')
          })
      }

      self.connected = function () {
        self.threshold('-')

        axios.get('http://heng-ge.cn:8080/coldChainLogistics/getTemperatureThreshold.do')
          .then(function(response) {
            var currentThreshold = response.data.TemperatureThreshold
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
